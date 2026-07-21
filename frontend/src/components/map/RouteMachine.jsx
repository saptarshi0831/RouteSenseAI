import { useEffect, useState, useRef, useCallback } from "react";
import { Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import disasters from "../../data/disasters";

/**
 * Generates a GeoJSON Polygon (array of coordinates) approximating a circle.
 * @param {number} lat - Center latitude
 * @param {number} lng - Center longitude
 * @param {number} radius - Radius in meters
 * @returns {Array} - Array of [longitude, latitude] points forming a closed polygon
 */
function createCirclePolygon(lat, lng, radius) {
  const points = 16;
  const coords = [];
  const earthRadius = 6371000; // Earth's radius in meters

  for (let i = 0; i < points; i++) {
    const angle = (i * 360) / points;
    const bearing = (angle * Math.PI) / 180;

    const latRad = (lat * Math.PI) / 180;
    const lngRad = (lng * Math.PI) / 180;

    const newLatRad = Math.asin(
      Math.sin(latRad) * Math.cos(radius / earthRadius) +
        Math.cos(latRad) * Math.sin(radius / earthRadius) * Math.cos(bearing)
    );

    const newLngRad =
      lngRad +
      Math.atan2(
        Math.sin(bearing) * Math.sin(radius / earthRadius) * Math.cos(latRad),
        Math.cos(radius / earthRadius) - Math.sin(latRad) * Math.sin(newLatRad)
      );

    // GeoJSON expects [longitude, latitude]
    coords.push([
      (newLngRad * 180) / Math.PI,
      (newLatRad * 180) / Math.PI,
    ]);
  }
  
  // Close the polygon by repeating the first point
  coords.push(coords[0]);
  return coords;
}

/* ============================================================
   ORS_TIMEOUT_MS — how long to wait for ORS before falling back
   ============================================================ */
const ORS_TIMEOUT_MS = 5000;

/* ============================================================
   fetchWithTimeout — wraps fetch with an AbortController timer
   ============================================================ */
async function fetchWithTimeout(url, options, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timer);
    return response;
  } catch (error) {
    clearTimeout(timer);
    throw error;
  }
}

/* ============================================================
   tryORS — attempt OpenRouteService with disaster avoidance
   ============================================================ */
async function tryORS(start, destination) {
  const avoidPolygons = disasters.map((d) => [
    createCirclePolygon(d.latitude, d.longitude, d.radius),
  ]);

  const body = {
    coordinates: [
      [start.lng, start.lat],
      [destination.longitude, destination.latitude],
    ],
  };

  // If there are disasters, instruct ORS to avoid them
  if (avoidPolygons.length > 0) {
    body.options = {
      avoid_polygons: {
        type: "MultiPolygon",
        coordinates: avoidPolygons,
      },
    };
  }

  const response = await fetchWithTimeout(
    "https://api.heigit.org/openrouteservice/v2/directions/driving-car/geojson",
    {
      method: "POST",
      headers: {
        "authorization": import.meta.env.VITE_ORS_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    },
    ORS_TIMEOUT_MS
  );

  if (!response.ok) {
    throw new Error(`ORS responded with status ${response.status}`);
  }

  const data = await response.json();

  if (!data.features || data.features.length === 0) {
    throw new Error("ORS returned no route features");
  }

  const feature = data.features[0];
  const geometry = feature.geometry.coordinates; // Array of [lng, lat]
  const summary = feature.properties.summary;

  // Convert [lng, lat] to [lat, lng] for Leaflet
  const leafletCoords = geometry.map((coord) => [coord[1], coord[0]]);

  return {
    leafletCoords,
    distance: summary.distance,
    duration: summary.duration,
    source: "ors",
  };
}

/* ============================================================
   tryOSRM — fallback to free OSRM public API (no key needed)
   ============================================================ */
async function tryOSRM(start, destination) {
  const url =
    `https://router.project-osrm.org/route/v1/driving/` +
    `${start.lng},${start.lat};` +
    `${destination.longitude},${destination.latitude}` +
    `?overview=full&geometries=geojson`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`OSRM responded with status ${response.status}`);
  }

  const data = await response.json();

  if (!data.routes || data.routes.length === 0) {
    throw new Error("OSRM returned no routes");
  }

  const route = data.routes[0];
  const geometry = route.geometry.coordinates; // Array of [lng, lat]

  // Convert [lng, lat] to [lat, lng] for Leaflet
  const leafletCoords = geometry.map((coord) => [coord[1], coord[0]]);

  return {
    leafletCoords,
    distance: route.distance,
    duration: route.duration,
    source: "osrm",
  };
}

/* ============================================================
   RouteMachine Component
   ============================================================ */
function RouteMachine({ start, destination, onRouteFound }) {
  const map = useMap();
  const [routePolyline, setRoutePolyline] = useState([]);
  const [routeSource, setRouteSource] = useState(null);

  // Stable callback ref to prevent infinite re-renders
  const onRouteFoundRef = useRef(onRouteFound);
  onRouteFoundRef.current = onRouteFound;

  const fetchRoute = useCallback(async () => {
    if (!start || !destination) return;

    let result = null;

    // ── Step 1: Try ORS (with disaster avoidance) ──
    try {
      console.log("🛡️ Attempting ORS route with disaster avoidance...");
      result = await tryORS(start, destination);
      console.log("✅ ORS route found successfully");
    } catch (orsError) {
      console.warn("⚠️ ORS failed, falling back to OSRM:", orsError.message);

      // ── Step 2: Fallback to OSRM ──
      try {
        result = await tryOSRM(start, destination);
        console.log("🔀 OSRM fallback route found successfully");
      } catch (osrmError) {
        console.error("❌ Both routing services failed:", osrmError.message);
        return; // Both failed — nothing to draw
      }
    }

    if (!result) return;

    // Update state
    setRoutePolyline(result.leafletCoords);
    setRouteSource(result.source);

    // Fit map to route bounds
    const bounds = L.latLngBounds(result.leafletCoords);
    map.fitBounds(bounds, { padding: [50, 50] });

    // Send route info back to Dashboard
    const routeCoordsForSafety = result.leafletCoords.map((coord) => ({
      latitude: coord[0],
      longitude: coord[1],
    }));

    onRouteFoundRef.current?.({
      coordinates: routeCoordsForSafety,
      distance: result.distance,
      duration: result.duration,
      source: result.source,
    });
  }, [map, start, destination]);

  useEffect(() => {
    fetchRoute();
  }, [fetchRoute]);

  // Don't render anything if no route is found yet
  if (routePolyline.length === 0) return null;

  // Draw the route — blue for ORS, amber for OSRM fallback
  const isORS = routeSource === "ors";

  return (
    <Polyline
      positions={routePolyline}
      pathOptions={{
        color: isORS ? "#2563EB" : "#D97706",
        weight: 6,
        opacity: 0.9,
        dashArray: isORS ? null : "12 6",
      }}
    />
  );
}

export default RouteMachine;