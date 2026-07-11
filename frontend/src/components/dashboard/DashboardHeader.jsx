import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

import "../../styles/dashboard-header.css";

function DashboardHeader() {
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
    <div className="dashboard-header">
      <div>
        <h1>
          {greeting}, <span>{user?.name}</span> 👋
        </h1>

        <p>
          Stay connected, share your live location and get emergency assistance instantly.
        </p>
      </div>

      <div className="dashboard-date">
        <span>Today</span>
        <h3>{today}</h3>
      </div>
    </div>
  );
}

export default DashboardHeader;