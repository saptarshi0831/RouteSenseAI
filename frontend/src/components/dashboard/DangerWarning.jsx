import {
  AlertTriangle,
  Waves,
  Flame,
} from "lucide-react";

import "../../styles/danger-warning.css";

function DangerWarning({ warning }) {
  if (!warning) return null;

  const Icon =
    warning.type === "flood"
      ? Waves
      : Flame;

  return (
    <div className="danger-warning">
      <div className="danger-header">
        <AlertTriangle size={22} />

        <h3>
          {warning.type.toUpperCase()} WARNING
        </h3>
      </div>

      <div className="danger-body">
        <Icon size={20} />

        <div>
          <h4>{warning.title}</h4>

          <p>{warning.description}</p>

          <span>
            Severity:
            <strong> {warning.severity}</strong>
          </span>

          <br />

          <span>
            Distance:
            <strong>
              {" "}
              {warning.distance} m
            </strong>
          </span>
        </div>
      </div>
    </div>
  );
}

export default DangerWarning;