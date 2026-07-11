import {
  Share2,
  ShieldAlert,
  Hospital,
  Bot,
} from "lucide-react";

import "../../styles/quick-actions.css";

function QuickActions({
  onShare,
  onSOS,
  onHospitals,
  onAI,
}) {
  const actions = [
    {
      title: "Share",
      subtitle: "Live Location",
      icon: Share2,
      color: "#4F8EF7",
      onClick: onShare,
    },
    {
      title: "Emergency",
      subtitle: "SOS",
      icon: ShieldAlert,
      color: "#EF4444",
      onClick: onSOS,
    },
    {
      title: "Nearby",
      subtitle: "Hospitals",
      icon: Hospital,
      color: "#22C55E",
      onClick: onHospitals,
    },
    {
      title: "AI",
      subtitle: "Assistant",
      icon: Bot,
      color: "#8B5CF6",
      onClick: onAI,
    },
  ];

  return (
    <div className="quick-actions">
      {actions.map((action) => {
        const Icon = action.icon;

        return (
          <button
            key={action.title}
            className="action-card"
            onClick={action.onClick}
          >
            <div
              className="action-icon"
              style={{ background: action.color }}
            >
              <Icon size={22} color="white" />
            </div>

            <div>
              <h3>{action.title}</h3>
              <span>{action.subtitle}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default QuickActions;