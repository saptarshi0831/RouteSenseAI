import { useEffect } from "react";
import { useMap } from "react-leaflet";

function RecenterMap({ location }) {
  const map = useMap();

  useEffect(() => {
    if (!location) return;

    map.setView(
      [location.lat, location.lng],
      map.getZoom(),
      {
        animate: true,
      }
    );
  }, [location, map]);

  return null;
}

export default RecenterMap;