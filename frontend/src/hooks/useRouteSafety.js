import { useMemo } from "react";
import disasters from "../data/disasters";

function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000;

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  return (
    2 *
    R *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    )
  );
}

function useRouteSafety(routeCoordinates = []) {
  return useMemo(() => {
    if (!routeCoordinates.length) {
      return {
        safe: true,
        danger: null,
        distanceAhead: null,
      };
    }

    let closestDanger = null;
    let closestDistance = Infinity;

    // Check every 5th point for better accuracy
    const points = routeCoordinates.filter(
      (_, index) => index % 5 === 0
    );

    for (const point of points) {
      for (const disaster of disasters) {
        const distance = getDistance(
          point.latitude,
          point.longitude,
          disaster.latitude,
          disaster.longitude
        );

        if (
          distance <= disaster.radius &&
          distance < closestDistance
        ) {
          closestDistance = distance;
          closestDanger = disaster;
        }
      }
    }

    if (closestDanger) {
      return {
        safe: false,
        danger: closestDanger,
        distanceAhead: Math.round(
          closestDistance
        ),
      };
    }

    return {
      safe: true,
      danger: null,
      distanceAhead: null,
    };
  }, [routeCoordinates]);
}

export default useRouteSafety;