import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

import "../../styles/dashboard.css";

function DashboardLayout({
  children,
  className = "",
}) {
  return (
    <div
      className={`dashboard-layout ${className}`}
    >
      <Navbar />
      <div className="dashboard-body">
        <Sidebar />
        <main className="dashboard-content">{children}</main>
      </div>
    </div>
  );
}

export default DashboardLayout;