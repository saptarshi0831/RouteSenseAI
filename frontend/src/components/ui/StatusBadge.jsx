import "../../styles/badge.css";

function StatusBadge({
  children,
  color = "blue",
}) {
  return (
    <span className={`status-badge ${color}`}>
      <span className="badge-dot" />
      {children}
    </span>
  );
}

export default StatusBadge;