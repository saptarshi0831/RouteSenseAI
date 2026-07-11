import {
  CheckCircle2,
  MapPinned,
  ShieldCheck,
  BellRing,
} from "lucide-react";

import "../../styles/sos.css";

function SOSSuccess({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="sos-overlay">
      <div className="success-modal">
        <div className="success-icon">
          <CheckCircle2 size={70} color="#22C55E" />
        </div>

        <h2>Emergency Alert Sent</h2>

        <p>Your emergency request has been sent successfully.</p>

        <div className="success-list">
          <div>
            <MapPinned size={18} />
            Live location is now shared
          </div>

          <div>
            <ShieldCheck size={18} />
            Emergency tracking is active
          </div>

          <div>
            <BellRing size={18} />
            Responders have been notified
          </div>
        </div>

        <button className="continue-btn" onClick={onClose}>
          Continue Tracking
        </button>
      </div>
    </div>
  );
}

export default SOSSuccess;