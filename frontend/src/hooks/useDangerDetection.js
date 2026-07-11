// This hook will:

// Read the user's GPS
// Read disasters
// Calculate distance
// Return the current warning

import { useMemo } from "react";

import disasters from "../data/disasters";
import { calculateDistance } from "../utils/distance";

function useDangerDetection(location) {
  const warning = useMemo(() => {
    if (!location) return null;

    let nearestDanger = null;

    disasters.forEach((disaster) => {
      const distance = calculateDistance(
        location.lat,
        location.lng,
        disaster.latitude,
        disaster.longitude
      );

      if (distance <= disaster.radius) {
        if (
          !nearestDanger ||
          distance < nearestDanger.distance
        ) {
          nearestDanger = {
            ...disaster,
            distance: Math.round(distance),
          };
        }
      }
    });

    return nearestDanger;
  }, [location]);

  return warning;
}

export default useDangerDetection;