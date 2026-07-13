import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

import "../../styles/dashboard-header.css";

function AdminHeader() {
  const { user } = useContext(AuthContext);

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 18) greeting = "Good Afternoon";

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="dashboard-header" style={{ borderLeft: '4px solid #ef4444' }}>
      <div>
        <h1>
          {greeting}, <span>Admin {user?.name}</span> 👋
        </h1>
        
        <p>
          Real-time monitoring of SOS requests and emergency response.
        </p>
      </div>

      <div className="dashboard-date">
        <span>Today</span>
        <h3>{today}</h3>
      </div>
    </div>
  );
}

export default AdminHeader;
