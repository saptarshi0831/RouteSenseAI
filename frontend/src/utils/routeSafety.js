// Returns distance in meters using Haversine formula
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000;

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) *
      Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c =
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );

  return R * c;
}

export function checkRouteSafety(
  routeCoordinates,
  disasters
) {
  if (
    !routeCoordinates.length ||
    !disasters.length
  ) {
    return {
      safe: true,
      danger: null,
    };
  }
// Ignore the first 15 route points (near the user's location)
const pointsToCheck = routeCoordinates.slice(15);

for (const point of pointsToCheck) {
    for (const disaster of disasters) {
      const distance = getDistance(
        point.latitude,
        point.longitude,
        disaster.latitude,
        disaster.longitude
      );

      if (distance <= disaster.radius) {
        return {
          safe: false,
          danger: disaster,
        };
      }
    }
  }

  return {
    safe: true,
    danger: null,
  };
}