import Card from "../ui/Card";

import {
  Siren,
  MapPin,
  Clock3,
  ShieldCheck,
} from "lucide-react";

import "../../styles/admin-sos-feed.css";

function SOSFeedCard({
  emergencies = [],
  onAcknowledge,
  onResolve,
}) {
  return (
    <Card
      title={
        <div className="flex items-center gap-2">
          <Siren
            size={22}
            color="#EF4444"
          />
          <span>Live SOS Feed</span>
        </div>
      }
      subtitle="Real-time emergency requests"
    >
      <div className="sos-feed">

        {emergencies.length === 0 && (
          <div className="sos-empty">

            <ShieldCheck
              size={56}
              strokeWidth={1.8}
            />

            <h3>All Clear</h3>

            <p>
              No active emergency requests.
            </p>

            <p>
              RouteSense AI is continuously
              monitoring users in real time.
            </p>

          </div>
        )}

        {emergencies.map((em, index) => (
          <div
            key={em.id}
            className="sos-card"
          >

            {/* Header */}

            <div className="sos-header">

              <div className="sos-user">

                <h3>
                  SOS #
                  {String(index + 1).padStart(
                    3,
                    "0"
                  )}
                </h3>

                <span>
                  Emergency Request
                </span>

              </div>

              <span
                className={`sos-status ${
                  em.status === "ACTIVE"
                    ? "active"
                    : em.status ===
                      "RESPONDING"
                    ? "responding"
                    : "resolved"
                }`}
              >
                {em.status}
              </span>

            </div>

            {/* Information */}

            <div className="sos-info">

              <div className="sos-row">

                <MapPin size={16} />

                <span>
                  {em.latitude?.toFixed(5)}
                  {" , "}
                  {em.longitude?.toFixed(
                    5
                  )}
                </span>

              </div>

              <div className="sos-row">

                <Clock3 size={16} />

                <span>
                  {new Date(
                    em.createdAt
                  ).toLocaleTimeString()}
                </span>

              </div>

            </div>

            {/* Action */}

            {em.status ===
            "ACTIVE" ? (
              <button
                className="sos-action acknowledge"
                onClick={() =>
                  onAcknowledge(em.id)
                }
              >
                Acknowledge SOS
              </button>
            ) : (
              <button
                className="sos-action resolve"
                onClick={() =>
                  onResolve(em.id)
                }
              >
                Mark as Resolved
              </button>
            )}

          </div>
        ))}

      </div>
    </Card>
  );
}

export default SOSFeedCard;