import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import socket from "../services/socket";
import { getShareSession } from "../api/share.api";
import LeafletMap from "../components/map/LeafletMap";

function ShareSession() {
  const { shareCode } = useParams();

  const [session, setSession] = useState(null);
  const [friendLocation, setFriendLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const response = await getShareSession(shareCode);

        setSession(response.data);

        socket.emit("share:join", {
          shareCode,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadSession();

    // Live updates
    socket.on("location:updated", (location) => {
      setFriendLocation({
        lat: location.latitude,
        lng: location.longitude,
      });
    });

    // STEP 4 — initial location when joining session
    socket.on("location:current", (location) => {
      setFriendLocation({
        lat: location.latitude,
        lng: location.longitude,
      });
    });

    return () => {
      socket.emit("share:leave");

      socket.off("location:updated");
      socket.off("location:current");
    };
  }, [shareCode]);

  // STEP 5 — no fake coordinates, wait for real location
  if (loading) return <h2>Loading...</h2>;

  if (!friendLocation) return <h2>Waiting for user location...</h2>;

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-7xl p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Live Location</h1>

          <p>
            {session?.creator?.name} is sharing their location.
          </p>
        </div>

        <div className="h-150 rounded-2xl overflow-hidden bg-white shadow">
          <LeafletMap
            center={friendLocation}
            myLocation={null}
            liveUsers={{
              friend: {
                userId: "friend",
                latitude: friendLocation.lat,
                longitude: friendLocation.lng,
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ShareSession;