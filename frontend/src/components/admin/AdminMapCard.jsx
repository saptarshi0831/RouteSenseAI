import Card from "../ui/Card";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  MapPinned,
} from "lucide-react";

const getIcon = (status) => {
  const color =
    status === "ACTIVE"
      ? "#ef4444"
      : status === "RESPONDING"
      ? "#f97316"
      : "#22c55e";

  return L.divIcon({
    className: "custom-div-icon",
    html: `<div style='background-color:${color};width:20px;height:20px;border-radius:50%;border:3px solid white;box-shadow:0 0 4px rgba(0,0,0,0.5)'></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

// Component to handle smooth map panning
function MapFlyTo({ center }) {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.flyTo(center, 16, { duration: 1.5 });
    }
  }, [center, map]);

  return null;
}

function AdminMapCard({ emergencies = [], focusedLocation = null }) {
  const defaultCenter =
    emergencies.length > 0
      ? [emergencies[0].latitude, emergencies[0].longitude]
      : [22.456, 87.339];

  return (
    <Card
  title={
    <div className="flex items-center gap-2">
      <MapPinned
        size={22}
      />
      Live Emergency Map
    </div>
  }
      subtitle="Real-time SOS Locations"
    >
      <div
        style={{
          height: "600px",
          borderRadius: "1rem",
          overflow: "hidden",
        }}
      >
        <div className="admin-map-legend">
          <span className="legend-item">
            <span className="legend-dot active"></span>
            Active
          </span>

          <span className="legend-item">
            <span className="legend-dot responding"></span>
            Responding
          </span>

          <span className="legend-item">
            <span className="legend-dot resolved"></span>
            Resolved
          </span>
        </div>

        <MapContainer
          center={defaultCenter}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {focusedLocation && <MapFlyTo center={focusedLocation} />}

          {emergencies.map((em) => (
            <Marker
              key={em.id}
              position={[em.latitude, em.longitude]}
              icon={getIcon(em.status)}
            >
              <Popup>
                <strong>User:</strong> {em.userId}
                <br />
                <strong>Status:</strong> {em.status}
                <br />
                <strong>Time:</strong>{" "}
                {new Date(em.createdAt).toLocaleTimeString()}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </Card>
  );
}

export default AdminMapCard;