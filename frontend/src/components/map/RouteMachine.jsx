import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";

function RouteMachine({
  start,
  destination,
  onRouteFound,
}) {
  const map = useMap();

  const routingRef = useRef(null);

  useEffect(() => {
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