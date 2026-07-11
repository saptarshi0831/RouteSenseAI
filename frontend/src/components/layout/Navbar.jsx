import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../../context/AuthContext";

import {
  Search,
  Bell,
  ChevronDown,
  Wifi,
  User,
  Settings,
  ShieldAlert,
  LogOut,
} from "lucide-react";

import "../../styles/navbar.css";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const initials = user?.name
    ?.split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <header className="navbar">
      {/* Search */}

      <div className="navbar-search">
        <Search
          size={18}
          className="search-icon"
        />

        <input
          type="text"
          placeholder="Search..."
        />
      </div>

      {/* Right */}

      <div className="navbar-right">

        <div className="live-status">
          <Wifi size={16} />

          <span>Live</span>
        </div>

        <button className="notification-button">
          <Bell size={20} />

          <span className="notification-dot" />
        </button>

        <div
          className="profile-wrapper"
          ref={dropdownRef}
        >
          <button
            className="profile-button"
            onClick={() =>
              setOpen(!open)
            }
          >
            <div className="profile-avatar">
              {initials}
            </div>

            <div className="profile-info">
              <h4>{user?.name}</h4>

              <span>
                {user?.email}
              </span>
            </div>

            <ChevronDown
              size={18}
              className={
                open
                  ? "rotate"
                  : ""
              }
            />
          </button>

          {open && (
            <div className="profile-dropdown">

              <button>

                <User size={18} />

                My Profile

              </button>

              <button
                onClick={() =>
                  navigate("/settings")
                }
              >

                <Settings size={18} />

                Settings

              </button>

              <button
                onClick={() =>
                  navigate("/history")
                }
              >

                <ShieldAlert
                  size={18}
                />

                Emergency History

              </button>

              <hr />

              <button
                className="logout-menu"
                onClick={logout}
              >

                <LogOut size={18} />

                Logout

              </button>

            </div>
          )}
        </div>

      </div>
    </header>
  );
}

export default Navbar;