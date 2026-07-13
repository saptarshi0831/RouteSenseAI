import { useEffect, useState } from "react";

import DashboardLayout from "../components/layout/DashboardLayout";
import AdminHeader from "../components/admin/AdminHeader";
import StatCard from "../components/admin/StatCard";
import AdminMapCard from "../components/admin/AdminMapCard";
import SOSFeedCard from "../components/admin/SOSFeedCard";

import {
  Siren,
  Clock3,
  CircleCheckBig,
  Users,
} from "lucide-react";

import socket from "../services/socket";

import {
  getAdminStats,
  acknowledgeSOS,
  resolveSOS,
} from "../api/admin.api";

import apiClient from "../api/apiClient";

function AdminDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    resolved: 0,
    users: 0,
  });

  const [emergencies, setEmergencies] =
    useState([]);

  const [focusedLocation, setFocusedLocation] =
    useState(null);

  useEffect(() => {
    const fetchDashboardData =
      async () => {
        try {
          const [
            statsRes,
            activeSOSRes,
          ] = await Promise.all([
            getAdminStats(),
            apiClient.get("/sos/active"),
          ]);

          setStats(statsRes.data.data);

          setEmergencies(
            activeSOSRes.data.data
          );
        } catch (error) {
          console.error(
            "Failed to load dashboard",
            error
          );
        }
      };

    fetchDashboardData();
  }, []);

  useEffect(() => {
    socket.on("sos:new", (emergency) => {
      setEmergencies((prev) => [
        emergency,
        ...prev,
      ]);

      setStats((prev) => ({
        ...prev,
        total: prev.total + 1,
        pending: prev.pending + 1,
      }));
    });

    return () => {
      socket.off("sos:new");
    };
  }, []);

  const handleAcknowledge = async (
    id
  ) => {
    try {
      await acknowledgeSOS(id);

      const emergency =
        emergencies.find(
          (e) => e.id === id
        );

      if (emergency) {
        setFocusedLocation([
          emergency.latitude,
          emergency.longitude,
        ]);
      }

      setEmergencies((prev) =>
        prev.map((em) =>
          em.id === id
            ? {
                ...em,
                status:
                  "RESPONDING",
              }
            : em
        )
      );
    } catch (error) {
      console.error(error);

      alert(
        "Failed to acknowledge SOS."
      );
    }
  };

  const handleResolve = async (
    id
  ) => {
    try {
      await resolveSOS(id);

      setEmergencies((prev) =>
        prev.filter(
          (em) => em.id !== id
        )
      );

      setStats((prev) => ({
        ...prev,
        pending:
          prev.pending - 1,
        resolved:
          prev.resolved + 1,
      }));
    } catch (error) {
      console.error(error);

      alert(
        "Failed to resolve SOS."
      );
    }
  };

  return (
    <DashboardLayout className="admin-theme">

      <AdminHeader />

      <div className="grid grid-cols-12 gap-6 mb-6">

        <div className="col-span-12 md:col-span-3">
          <StatCard
            title="Today's SOS"
            value={stats.total}
            icon={
              <Siren size={30} />
            }
            color="red"
          />
        </div>

        <div className="col-span-12 md:col-span-3">
          <StatCard
            title="Awaiting Response"
            value={stats.pending}
            icon={
              <Clock3 size={30} />
            }
            color="orange"
          />
        </div>

        <div className="col-span-12 md:col-span-3">
          <StatCard
            title="Resolved Today"
            value={stats.resolved}
            icon={
              <CircleCheckBig
                size={30}
              />
            }
            color="green"
          />
        </div>

        <div className="col-span-12 md:col-span-3">
          <StatCard
            title="Active Users"
            value={stats.users}
            icon={
              <Users size={30} />
            }
            color="blue"
          />
        </div>

      </div>

      <div className="grid grid-cols-12 gap-6">

        <div className="col-span-12 lg:col-span-8">
          <AdminMapCard
            emergencies={emergencies}
            focusedLocation={
              focusedLocation
            }
          />
        </div>

        <div className="col-span-12 lg:col-span-4">
          <SOSFeedCard
            emergencies={emergencies}
            onAcknowledge={
              handleAcknowledge
            }
            onResolve={
              handleResolve
            }
          />
        </div>

      </div>

    </DashboardLayout>
  );
}

export default AdminDashboard;