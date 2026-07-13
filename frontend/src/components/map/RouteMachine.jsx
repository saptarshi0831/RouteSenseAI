import { useEffect, useState } from "react";
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

function RouteMachine({
  start,
  destination,
  onRouteFound,
}) {
  const map = useMap();
  const [routePolyline, setRoutePolyline] = useState([]);

  useEffect(() => {
    if (!start || !destination) return;

    const fetchSafeRoute = async () => {
      try {
        // 1. Construct MultiPolygon to avoid based on live disasters
        const avoidPolygons = disasters.map((d) => [
          createCirclePolygon(d.latitude, d.longitude, d.radius)
        ]);

        const body = {
          coordinates: [
            [start.lng, start.lat],
            [destination.longitude, destination.latitude],
          ]
        };

        // If there are disasters, instruct OpenRouteService to avoid them
        if (avoidPolygons.length > 0) {
          body.options = {
            avoid_polygons: {
              type: "MultiPolygon",
              coordinates: avoidPolygons,
            },
          };
        }

        // 2. Fetch the route from OpenRouteService
        const response = await fetch(
          "https://api.openrouteservice.org/v2/directions/driving-car/geojson",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: import.meta.env.VITE_ORS_API_KEY,
            },
            body: JSON.stringify(body),
          }
        );

        const data = await response.json();
        
        if (data.features && data.features.length > 0) {
          const feature = data.features[0];
          const geometry = feature.geometry.coordinates; // Array of [lng, lat]
          const summary = feature.properties.summary;

          // 3. Convert [lng, lat] to [lat, lng] for Leaflet to draw
          const leafletCoords = geometry.map(coord => [coord[1], coord[0]]);
          setRoutePolyline(leafletCoords);
          
          // 4. Fit map smoothly to the new safe route
          const bounds = L.latLngBounds(leafletCoords);
          map.fitBounds(bounds, { padding: [50, 50] });

          // 5. Send route info back to Dashboard for UI updates
          const routeCoordsForSafety = leafletCoords.map(coord => ({
            latitude: coord[0],
            longitude: coord[1],
          }));

          onRouteFound?.({
            coordinates: routeCoordsForSafety,
            distance: summary.distance,
            duration: summary.duration,
          });
        } else {
          console.warn("Could not find a route avoiding the disasters:", data);
          // Optional: Add logic here to retry without avoidance if they are trapped
        }
      } catch (error) {
        console.error("Error fetching safe ORS route:", error);
      }
    };

    fetchSafeRoute();
  }, [map, start, destination, onRouteFound]);

  // Don't render anything if no route is found yet
  if (routePolyline.length === 0) return null;

  // Draw the route on the map
  return (
    <Polyline 
      positions={routePolyline} 
      pathOptions={{ color: "#2563EB", weight: 6, opacity: 0.9 }} 
    />
  );
}

export default RouteMachine;