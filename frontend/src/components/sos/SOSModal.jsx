import "../../styles/sos.css";

function SOSModal({
  open,
  onClose,
  onContinue,
}) {
  if (!open) return null;

  return (
    <div className="sos-overlay">
      <div className="sos-modal">
        <div className="sos-icon">🚨</div>

        <h2>Emergency SOS</h2>

        <p>This will immediately:</p>

        <ul>
          <li>Share your live location</li>
          <li>Notify administrators</li>
          <li>Start emergency tracking</li>
        </ul>

        <div className="sos-buttons">
          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="continue-btn"
            onClick={onContinue}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default SOSModal;