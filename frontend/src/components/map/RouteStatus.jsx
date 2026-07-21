import {
  ShieldCheck,
  TriangleAlert,
  RefreshCw,
} from "lucide-react";

import "../../styles/route-status.css";

function RouteStatus({
  safety,
  routeInfo,
}) {
  if (!safety || !routeInfo) return null;

  const distanceKm =
    (routeInfo.distance / 1000).toFixed(1);

  const eta =
    Math.ceil(routeInfo.duration / 60);

  const isORS = routeInfo.source === "ors";
  const isOSRM = routeInfo.source === "osrm";

  if (safety.safe) {
    return (
      <div className="route-status safe">
        <ShieldCheck size={18} />
        <div>
          <strong>
            🟢 Safe Route
          </strong>

          <p>
            Distance{" "}
            <strong>
              {distanceKm} km
            </strong>
          </p>

          <p>
            ETA{" "}
            <strong>
              {eta} min
            </strong>
          </p>

          {isOSRM && (
            <div className="route-source-badge fallback">
              <RefreshCw size={12} />
              <span>OSRM Fallback — disaster avoidance temporarily unavailable</span>
            </div>
          )}

          {isORS && (
            <div className="route-source-badge ors">
              <ShieldCheck size={12} />
              <span>ORS — actively avoiding disaster zones</span>
            </div>
          )}

        </div>
      </div>
    );
  }

  return (
    <div className="route-status danger">
      <TriangleAlert size={18} />
      <div>
        <strong>
          ⚠️ Affected Route
        </strong>

        <p>
          Reason:{" "}
          <strong>
            {safety.danger.title}
          </strong>
        </p>

        <p>
          Distance:{" "}
          <strong>
            {distanceKm} km
          </strong>
        </p>

        <p>
          ETA:{" "}
          <strong>
            {eta} min
          </strong>
        </p>

        <div className="route-warning">
          {isOSRM ? (
            <>
              <p>
                <strong>
                  ⚠️ Disaster Avoidance Unavailable
                </strong>
              </p>
              <p>
                ORS is currently down. This standard route passes through a danger zone. Choose another destination or use Google Maps for navigation.
              </p>
            </>
          ) : (
            <>
              <p>
                <strong>
                  No Safe Route Available
                </strong>
              </p>
              <p>
                Please choose another destination.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default RouteStatus;