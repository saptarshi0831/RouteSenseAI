import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";

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

  const routingRef = useRef(null);

  // Stable callback ref to prevent infinite re-renders
  const onRouteFoundRef = useRef(onRouteFound);
  onRouteFoundRef.current = onRouteFound;

  const fetchRoute = useCallback(async () => {
    if (!start || !destination) return;

    if (routingRef.current) {
      map.removeControl(routingRef.current);
    }

    routingRef.current =
      L.Routing.control({
        waypoints: [
          L.latLng(
            start.lat,
            start.lng
          ),

          L.latLng(
            destination.latitude,
            destination.longitude
          ),
        ],

        addWaypoints: false,

        draggableWaypoints: false,

        fitSelectedRoutes: true,

        routeWhileDragging: false,

        show: false,

        createMarker: () => null,

        lineOptions: {
          styles: [
            {
              color: "#2563EB",
              weight: 6,
              opacity: 0.9,
            },
          ],
        },
      }).addTo(map);

    routingRef.current.on(
      "routesfound",
      (event) => {
        const route =
          event.routes[0];

        const coordinates =
          route.coordinates.map(
            (point) => ({
              latitude:
                point.lat,
              longitude:
                point.lng,
            })
          );

        onRouteFound?.({
          coordinates,

          distance:
            route.summary
              .totalDistance,

          duration:
            route.summary
              .totalTime,
        });
      }
    );

    return () => {
      if (
        routingRef.current
      ) {
        map.removeControl(
          routingRef.current
        );

        routingRef.current =
          null;
      }
    };
  }, [
    map,
    start,
    destination,
    onRouteFound,
  ]);

  return null;
}

export default RouteMachine;