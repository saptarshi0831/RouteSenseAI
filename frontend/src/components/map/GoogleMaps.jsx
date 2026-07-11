import {
  APIProvider,
  Map,
  AdvancedMarker,
} from "@vis.gl/react-google-maps";

function GoogleMap({ location }) {
  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <Map
        center={location}
        zoom={16}
        gestureHandling="greedy"
        disableDefaultUI={false}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {location && (
          <AdvancedMarker position={location} />
        )}
      </Map>
    </APIProvider>
  );
}

export default GoogleMap;