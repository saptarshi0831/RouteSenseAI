import { useEffect, useState } from "react";

function SOSCountdown({ open, onFinish, onCancel }) {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (!open) return;

    if (count === 0) {
      onFinish();
      return;
    }

    const timer = setTimeout(() => {
      setCount((c) => c - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [open, count, onFinish]);

  if (!open) return null;

  return (
    <div className="sos-overlay">
      <div className="countdown-modal">
        <h2>Sending SOS</h2>

        <div className="count-number">{count}</div>

        <button onClick={onCancel} className="cancel-btn">
          Cancel
        </button>
      </div>
    </div>
  );
}

export default SOSCountdown;