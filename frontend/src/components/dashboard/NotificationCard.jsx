import { useEffect, useState } from "react";

import Card from "../ui/Card";

import socket from "../../services/socket";

import {
  MapPinned,
  Hospital,
  Bot,
  ShieldAlert,
  Bell,
  ArrowRight,
} from "lucide-react";

import "../../styles/notification.css";

function NotificationCard() {
  const [notifications, setNotifications] = useState([]);

  const getTimeAgo = (date) => {
    const seconds = Math.floor(
      (Date.now() - new Date(date).getTime()) / 1000
    );

    if (seconds < 60) return "Just now";

    const minutes = Math.floor(seconds / 60);

    if (minutes < 60) return `${minutes} min ago`;

    const hours = Math.floor(minutes / 60);

    return `${hours} hr ago`;
  };

  useEffect(() => {
    const handleNotification = (notification) => {
      setNotifications((prev) => [
        {
          ...notification,
          time: getTimeAgo(notification.createdAt),
        },
        ...prev,
      ].slice(0, 10));
    };

    socket.on(
      "notification:new",
      handleNotification
    );

    return () => {
      socket.off(
        "notification:new",
        handleNotification
      );
    };
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case "share":
        return {
          Icon: MapPinned,
          color: "#3B82F6",
        };

      case "hospital":
        return {
          Icon: Hospital,
          color: "#22C55E",
        };

      case "ai":
        return {
          Icon: Bot,
          color: "#8B5CF6",
        };

      case "sos":
        return {
          Icon: ShieldAlert,
          color: "#EF4444",
        };

      default:
        return {
          Icon: Bell,
          color: "#64748B",
        };
    }
  };

  return (
    <Card
      title="🔔 Notifications"
      subtitle="Live Activity"
    >
      <div className="notification-list">
        {notifications.length === 0 && (
          <div className="notification-empty">
            No notifications yet.
          </div>
        )}

        {notifications.map((item) => {
          const {
            Icon,
            color,
          } = getIcon(item.type);

          return (
            <div
              key={item.id}
              className="notification-item"
            >
              <div
                className="notification-icon"
                style={{
                  background: color,
                }}
              >
                <Icon
                  size={18}
                  color="white"
                />
              </div>

              <div className="notification-content">
                <h4>{item.title}</h4>

                <p>{item.message}</p>

                <span>{item.time}</span>
              </div>
            </div>
          );
        })}
      </div>

      <button
        className="notification-view"
        onClick={() =>
          alert(
            "Notification history coming soon."
          )
        }
      >
        View All

        <ArrowRight size={18} />
      </button>
    </Card>
  );
}

export default NotificationCard;