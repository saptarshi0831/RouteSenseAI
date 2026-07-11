import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  MapPinned,
  Hospital,
  Bot,
  ShieldAlert,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";

import "../../styles/sidebar.css";

function Sidebar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const menuItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
      type: "route",
    },
    {
      label: "Live Tracking",
      icon: MapPinned,
      type: "scroll",
      target: "map",
    },
    {
      label: "Nearby Hospitals",
      icon: Hospital,
      type: "scroll",
      target: "hospital",
    },
    {
      label: "AI Assistant",
      icon: Bot,
      type: "scroll",
      target: "ai",
    },
    {
      label: "Emergency History",
      path: "/history",
      icon: ShieldAlert,
      type: "route",
    },
    {
      label: "Notifications",
      path: "/notifications",
      icon: Bell,
      type: "route",
    },
  ];

  return (
    <aside className="sidebar">
      <div>
        <div className="sidebar-brand">
          <div className="brand-logo">RS</div>

          <div>
            <h2>RouteSense AI</h2>
            <span>Smart Navigation</span>
          </div>
        </div>

        <div className="sidebar-section">
          <span className="sidebar-title">MAIN</span>

          {menuItems.map((item) => {
            const Icon = item.icon;

            if (item.type === "scroll") {
              return (
                <button
                  key={item.label}
                  type="button"
                  className="sidebar-item"
                  onClick={() =>
                    navigate("/dashboard", {
                      state: { scrollTo: item.target },
                    })
                  }
                >
                  <Icon size={19} />
                  <span>{item.label}</span>
                </button>
              );
            }

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  isActive ? "sidebar-item active" : "sidebar-item"
                }
              >
                <Icon size={19} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>

        <div className="sidebar-section">
          <span className="sidebar-title">ACCOUNT</span>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive ? "sidebar-item active" : "sidebar-item"
            }
          >
            <Settings size={19} />
            <span>Settings</span>
          </NavLink>
        </div>
      </div>

      <div className="sidebar-profile">
        <div>
          <h4>{user?.name || "User"}</h4>
          <p>{user?.email || "No email"}</p>
        </div>

        <button onClick={logout} className="logout-button">
          <LogOut size={18} />
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;