import {
  ShieldCheck,
  TriangleAlert,
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
        <p>
          <strong>
            No Safe Route Available
          </strong>
        </p>

        <p>
          Please choose another destination.
        </p>
      </div>
      </div>
    </div>
  );
}
export default RouteStatus;