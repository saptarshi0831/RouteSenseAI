import Card from "../ui/Card";
import LeafletMap from "../map/LeafletMap";
import StatusBadge from "../ui/StatusBadge";
import MapLegend from "../map/MapLegends";
import DestinationSearch from "../map/DestinationSearch";
import RouteStatus from "../map/RouteStatus";

import "../../styles/map-card.css";

function MapCard({
  location,
  loading,
  error,
  liveUsers = {},
  hospitals = [],
  selectedHospital,
  destination,
  setDestination,
  onRouteFound,
  routeSafety,
  routeInfo,
}) {
  if (loading) {
    return (
      <Card
        title="Live Tracking"
        subtitle="Real-time GPS Monitoring"
      >
        <div className="map-loading">
          Getting your location...
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card
        title="Live Tracking"
        subtitle="Real-time GPS Monitoring"
      >
        <div className="map-error">
          {error}
        </div>
      </Card>
    );
  }

  if (!location) {
    return (
      <Card
        title="Live Tracking"
        subtitle="Real-time GPS Monitoring"
      >
        <div className="map-loading">
          Waiting for GPS...
        </div>
      </Card>
    );
  }

  return (
    <Card
      title="📍 Live Tracking"
      subtitle="Real-time GPS Monitoring"
      actions={
        <StatusBadge color="green">
          GPS Connected
        </StatusBadge>
      }
    >
      <div className="map-stats">
        <div className="map-stat">
          <span>Latitude</span>
          <h3>{location.lat.toFixed(6)}</h3>
        </div>

        <div className="map-stat">
          <span>Longitude</span>
          <h3>{location.lng.toFixed(6)}</h3>
        </div>

        <div className="map-stat">
          <span>Updated</span>
          <h3>Just now</h3>
        </div>
      </div>

      <DestinationSearch
        onSelect={setDestination}
      />

      <RouteStatus
        safety={routeSafety}
        routeInfo={routeInfo}
      />

      <div className="map-wrapper">
        <MapLegend />

        <LeafletMap
          center={location}
          myLocation={location}
          liveUsers={liveUsers}
          hospitals={hospitals}
          selectedHospital={selectedHospital}
          destination={destination}
          onRouteFound={onRouteFound}
        />
      </div>

      <div className="map-footer">
        <div>
          <span>Share Status</span>
          <strong>Active</strong>
        </div>

        <div>
          <span>Accuracy</span>
          <strong>±10 m</strong>
        </div>

        <div>
          <span>Tracking</span>
          <strong>Live</strong>
        </div>
      </div>
    </Card>
  );
}

export default MapCard;