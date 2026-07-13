import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import AdminHeader from "../components/admin/AdminHeader";
import StatCard from "../components/admin/StatCard";
import AdminMapCard from "../components/admin/AdminMapCard";
import SOSFeedCard from "../components/admin/SOSFeedCard";

import socket from "../services/socket";
import { getAdminStats, acknowledgeSOS, resolveSOS } from "../api/admin.api";
import apiClient from "../api/apiClient";

function AdminDashboard() {
  const [stats, setStats] = useState({ total: 0, pending: 0, resolved: 0, users: 0 });
  const [emergencies, setEmergencies] = useState([]);
  const [focusedLocation, setFocusedLocation] = useState(null);

  // Fetch initial stats and active emergencies
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsRes, activeSOSRes] = await Promise.all([
          getAdminStats(),
          apiClient.get("/sos/active")
        ]);
        setStats(statsRes.data.data);
        setEmergencies(activeSOSRes.data.data);
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      }
    };
    fetchDashboardData();
  }, []);

  // Listen for Live SOS
  useEffect(() => {
    socket.on("sos:new", (emergency) => {
      setEmergencies((prev) => [emergency, ...prev]);
      setStats((prev) => ({ ...prev, total: prev.total + 1, pending: prev.pending + 1 }));
    });

    return () => {
      socket.off("sos:new");
    };
  }, []);

  const handleAcknowledge = async (id) => {
    try {
      await acknowledgeSOS(id);
      
      const em = emergencies.find((e) => e.id === id);
      if (em) {
        setFocusedLocation([em.latitude, em.longitude]);
      }

      setEmergencies((prev) => 
        prev.map(em => em.id === id ? { ...em, status: "RESPONDING" } : em)
      );
    } catch (error) {
      alert("Failed to acknowledge");
    }
  };

  const handleResolve = async (id) => {
    try {
      await resolveSOS(id);
      setEmergencies((prev) => prev.filter(em => em.id !== id));
      setStats((prev) => ({ ...prev, pending: prev.pending - 1, resolved: prev.resolved + 1 }));
    } catch (error) {
      alert("Failed to resolve");
    }
  };

  return (
    <DashboardLayout>
      <AdminHeader />

      <div className="grid grid-cols-12 gap-6 mb-6">
        <div className="col-span-12 md:col-span-3">
          <StatCard title="SOS Today" value={stats.total} icon="🚨" color="red" />
        </div>
        <div className="col-span-12 md:col-span-3">
          <StatCard title="Pending" value={stats.pending} icon="⏳" color="orange" />
        </div>
        <div className="col-span-12 md:col-span-3">
          <StatCard title="Resolved" value={stats.resolved} icon="✅" color="green" />
        </div>
        <div className="col-span-12 md:col-span-3">
          <StatCard title="Online Users" value={stats.users} icon="👥" color="blue" />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8">
          <AdminMapCard emergencies={emergencies} focusedLocation={focusedLocation} />
        </div>

        <div className="col-span-12 lg:col-span-4">
          <SOSFeedCard 
            emergencies={emergencies} 
            onAcknowledge={handleAcknowledge}
            onResolve={handleResolve}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AdminDashboard;
