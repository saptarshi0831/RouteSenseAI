import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

import "../../styles/dashboard.css";

function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout">
      <Navbar />
      <div className="dashboard-body">
        <Sidebar />
        <main className="dashboard-content">{children}</main>
      </div>
    </div>
  );
}

export default DashboardLayout;