import { useEffect, useState } from "react";

function useCurrentLocation() {
  const geolocationSupported = !!navigator.geolocation;

  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(geolocationSupported);
  const [error, setError] = useState(
    geolocationSupported
      ? ""
      : "Geolocation is not supported by this browser."
  );

  useEffect(() => {
    if (!geolocationSupported) {
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });

        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 5000,
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [geolocationSupported]);

  return {
    location,
    loading,
    error,
  };
}

export default useCurrentLocation;