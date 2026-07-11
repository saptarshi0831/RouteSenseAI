import Card from "../ui/Card";
import StatusBadge from "../ui/StatusBadge";

import {
  Hospital,
  Navigation,
  ArrowRight,
} from "lucide-react";

import "../../styles/hospital-panel.css";

function HospitalPanel({
  hospitals = [],
  selectedHospital,
  onSelectHospital,
  onNavigate,
  location,
}) {
  const openDirections = (hospital) => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${hospital.latitude},${hospital.longitude}`,
      "_blank"
    );
  };

  return (
    <Card
      title="🏥 Nearby Hospitals"
      subtitle={`Showing ${Math.min(5, hospitals.length)} of ${hospitals.length} hospitals`}
    >
      <div className="hospital-list">
        {hospitals.slice(0, 5).map((hospital) => (
          <div
            key={hospital.id}
            className={`hospital-item ${
              selectedHospital?.id === hospital.id
                ? "active"
                : ""
            }`}
            onClick={() =>
              onSelectHospital &&
              onSelectHospital(hospital)
            }
          >
            <div className="hospital-icon">
              <Hospital size={20} />
            </div>

            <div className="hospital-info">
              <h4>
                {hospital.name}
              </h4>

              <p>
                {(hospital.distance / 1000).toFixed(1)}
                {" "}km away
              </p>
            </div>

            <div className="hospital-right">

              <StatusBadge color="green">
                Nearby
              </StatusBadge>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openDirections(hospital);
                }}
              >
                <Navigation size={16} />
                Directions
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();

                  onNavigate?.({
                    latitude: hospital.latitude,
                    longitude: hospital.longitude,
                    name: hospital.name,
                  });
                }}
                className="safe-route-btn"
              >
                Navigate Safely
              </button>

            </div>
          </div>
        ))}
      </div>

      <button
        className="view-all"
        onClick={() =>
          location &&
          window.open(
            `https://www.google.com/maps/search/hospitals/@${location.lat},${location.lng},14z`,
            "_blank"
          )
        }
      >
        View All
        <ArrowRight size={18} />
      </button>
    </Card>
  );
}

export default HospitalPanel;