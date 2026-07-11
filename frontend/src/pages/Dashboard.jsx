import {
  useEffect,
  useRef,
  useState,
} from "react";

import { useLocation } from "react-router-dom";

import DashboardLayout from "../components/layout/DashboardLayout";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import QuickActions from "../components/dashboard/QuickActions";
import MapCard from "../components/dashboard/MapCard";
import HospitalPanel from "../components/dashboard/HospitalPanel";
import AIChatCard from "../components/dashboard/AIChatCard";
import NotificationCard from "../components/dashboard/NotificationCard";
import DangerWarning from "../components/dashboard/DangerWarning";

import SOSModal from "../components/sos/SOSModal";
import SOSCountdown from "../components/sos/SOSCountdown";
import SOSSuccess from "../components/sos/SOSSuccess";

import useCurrentLocation from "../hooks/useCurrentLocation";
import useDangerDetection from "../hooks/useDangerDetection";
import useRouteSafety from "../hooks/useRouteSafety";

import { getNearbyHospitals } from "../api/hospital.api";
import { createSOS } from "../api/sos.api";
import { createShareSession } from "../api/share.api";

import socket from "../services/socket";

function Dashboard() {
  const { location, loading, error } =
    useCurrentLocation();

  const warning =
    useDangerDetection(location);

  const routerLocation =
    useLocation();

  /* ------------------------------------
      SOS
  ------------------------------------- */

  const [showSOS, setShowSOS] =
    useState(false);

  const [showCountdown, setShowCountdown] =
    useState(false);

  const [showSuccess, setShowSuccess] =
    useState(false);

  /* ------------------------------------
      Hospitals
  ------------------------------------- */

  const [hospitals, setHospitals] =
    useState([]);

  const [
    selectedHospital,
    setSelectedHospital,
  ] = useState(null);

  /* ------------------------------------
      Navigation
  ------------------------------------- */

  const [destination, setDestination] =
    useState(null);

  const [routeInfo, setRouteInfo] =
    useState({
      coordinates: [],
      distance: 0,
      duration: 0,
    });

  const routeSafety =
    useRouteSafety(
      routeInfo.coordinates
    );

  /* ------------------------------------
      Refs
  ------------------------------------- */

  const hospitalRef = useRef(null);
  const mapRef = useRef(null);
  const aiRef = useRef(null);

  /* ------------------------------------
      Quick Actions
  ------------------------------------- */

  const handleHospitalClick = () => {
    hospitalRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleAIClick = () => {
    aiRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleShare = async () => {
    try {
      const response =
        await createShareSession();

      const {
        shareUrl,
        shareCode,
      } = response.data;

      await navigator.clipboard.writeText(
        shareUrl
      );

      alert(
        "✅ Share link copied to clipboard!"
      );

      console.log(
        "Share Code:",
        shareCode
      );

      console.log(
        "Share URL:",
        shareUrl
      );
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Unable to create share session."
      );
    }
  };

  /* ------------------------------------
      SOS
  ------------------------------------- */

  const handleSOS = () => {
    setShowSOS(true);
  };

  const handleSOSContinue = () => {
    setShowSOS(false);
    setShowCountdown(true);
  };

  const handleSOSFinish = async () => {
    try {
      if (!location) {
        throw new Error(
          "Location unavailable."
        );
      }

      await createSOS({
        latitude: location.lat,
        longitude: location.lng,
        message: "Emergency SOS",
      });

      setShowCountdown(false);
      setShowSuccess(true);

      console.log(
        "🚨 SOS sent successfully"
      );
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          error.message ||
          "Unable to send SOS."
      );

      setShowCountdown(false);
    }
  };

  const handleSOSClose = () => {
    setShowSOS(false);
    setShowCountdown(false);
    setShowSuccess(false);
  };

  /* ------------------------------------
      Socket Location
  ------------------------------------- */

  useEffect(() => {
    if (!location) return;

    socket.emit("location:update", {
      latitude: location.lat,
      longitude: location.lng,
    });
  }, [location]);

  /* ------------------------------------
      Load Hospitals
  ------------------------------------- */

  useEffect(() => {
    if (!location) return;

    const loadHospitals =
      async () => {
        try {
          const response =
            await getNearbyHospitals(
              location.lat,
              location.lng
            );

          setHospitals(
            response.data
          );
        } catch (error) {
          console.error(
            "Hospital Error:",
            error
          );
        }
      };

    loadHospitals();
  }, [location]);

  /* ------------------------------------
      Sidebar Navigation
  ------------------------------------- */

  useEffect(() => {
    const target =
      routerLocation.state?.scrollTo;

    if (!target) return;

    requestAnimationFrame(() => {
      if (target === "map") {
        mapRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      if (
        target === "hospital"
      ) {
        hospitalRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      if (target === "ai") {
        aiRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  }, [routerLocation.state]);

  return (
    <DashboardLayout>
      <DashboardHeader />

      <QuickActions
        onShare={handleShare}
        onSOS={handleSOS}
        onHospitals={
          handleHospitalClick
        }
        onAI={handleAIClick}
      />

      <DangerWarning
        warning={warning}
      />

      <div className="grid grid-cols-12 gap-6">

        {/* MAP */}

        <div
          ref={mapRef}
          className="col-span-12 lg:col-span-8"
        >
          <MapCard
            location={location}
            loading={loading}
            error={error}
            hospitals={hospitals}
            selectedHospital={selectedHospital}
            destination={destination}
            setDestination={setDestination}
            onRouteFound={setRouteInfo}
            routeSafety={routeSafety}
            routeInfo={routeInfo}
          />
        </div>

        {/* HOSPITALS */}

        <div
          ref={hospitalRef}
          className="col-span-12 lg:col-span-4"
        >
          <HospitalPanel
            hospitals={hospitals}
            location={location}
            selectedHospital={
              selectedHospital
            }
            onSelectHospital={
              setSelectedHospital
            }
            onNavigate={
              setDestination
            }
          />
        </div>

        {/* AI */}

        <div
          ref={aiRef}
          className="col-span-12 lg:col-span-8"
        >
          <AIChatCard />
        </div>

        {/* NOTIFICATIONS */}

        <div className="col-span-12 lg:col-span-4">
          <NotificationCard />
        </div>

      </div>

      <SOSModal
        open={showSOS}
        onClose={handleSOSClose}
        onContinue={
          handleSOSContinue
        }
      />

      <SOSCountdown
        open={showCountdown}
        onFinish={
          handleSOSFinish
        }
        onCancel={
          handleSOSClose
        }
      />

      <SOSSuccess
        open={showSuccess}
        onClose={handleSOSClose}
      />
    </DashboardLayout>
  );
}

export default Dashboard;