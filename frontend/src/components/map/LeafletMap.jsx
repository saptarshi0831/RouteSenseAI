import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap,
} from "react-leaflet";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import "../../styles/map-icons.css";
import disasters from "../../data/disasters";
import RouteMachine from "./RouteMachine";

import {
  userMarker,
  hospitalMarker,
  sharedMarker,
  floodMarker,
  fireMarker,
} from "./mapIcons";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

/* Fly to selected hospital */

function FlyToHospital({ selectedHospital, markerRefs }) {
  const map = useMap();

  useEffect(() => {
    if (!selectedHospital) return;

    map.flyTo(
      [selectedHospital.latitude, selectedHospital.longitude],
      16,
      {
        animate: true,
        duration: 1.2,
      }
    );

    const marker = markerRefs.current[selectedHospital.id];

    if (marker) {
      marker.openPopup();
    }
  }, [selectedHospital, map, markerRefs]);

  return null;
}

function LeafletMap({
  center,
  myLocation,
  liveUsers = {},
  hospitals = [],
  selectedHospital,
  destination,
  onRouteFound,
}) {
  const markerRefs = useRef({});

  return (
    <MapContainer
      center={center}
      zoom={15}
      className="h-full w-full rounded-2xl"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <FlyToHospital
        selectedHospital={selectedHospital}
        markerRefs={markerRefs}
      />

      <RouteMachine
        start={myLocation}
        destination={destination}
        onRouteFound={onRouteFound}
      />

      {myLocation && (
        <>
          <Marker
            icon={userMarker}
            position={[myLocation.lat, myLocation.lng]}
          >
            <Popup>
              <strong>Your Location</strong>
            </Popup>
          </Marker>

          <Circle
            center={[myLocation.lat, myLocation.lng]}
            radius={20}
            pathOptions={{
              color: "#2563EB",
              fillColor: "#3B82F6",
              fillOpacity: 0.15,
              weight: 2,
            }}
          />
        </>
      )}

      {hospitals.map((hospital) => (
        <Marker
          key={hospital.id}
          icon={hospitalMarker}
          position={[
            hospital.latitude,
            hospital.longitude,
          ]}
          ref={(ref) => {
            if (ref) {
              markerRefs.current[hospital.id] = ref;
            }
          }}
        >
          <Popup>
            <strong>{hospital.name}</strong>
            <br />
            {hospital.address}
            <br />
            {(hospital.distance / 1000).toFixed(1)} km away
            <br />
            <br />
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${hospital.latitude},${hospital.longitude}`}
              target="_blank"
              rel="noreferrer"
            >
              🧭 Directions
            </a>
          </Popup>
        </Marker>
      ))}

      {disasters.map((item) => {
        const icon =
          item.type === "flood"
            ? floodMarker
            : fireMarker;

        return (
          <Marker
            key={item.id}
            icon={icon}
            position={[
              item.latitude,
              item.longitude,
            ]}
          >
            <Popup>
              <strong>{item.title}</strong>
              <br />
              {item.description}
              <br />
              <br />
              Severity: <strong>{item.severity}</strong>
              <br />
              Reported: {item.reportedAt}
            </Popup>
          </Marker>
        );
      })}

      {disasters.map((item) => (
        <Circle
          key={`circle-${item.id}`}
          center={[
            item.latitude,
            item.longitude,
          ]}
          radius={item.radius}
          pathOptions={{
            color:
              item.type === "flood"
                ? "#2563EB"
                : "#EA580C",
            fillColor:
              item.type === "flood"
                ? "#3B82F6"
                : "#FB923C",
            fillOpacity: 0.20,
            weight: 2,
          }}
        />
      ))}

      {Object.values(liveUsers).map((user) => (
        <Marker
          key={user.userId}
          icon={sharedMarker}
          position={[
            user.latitude,
            user.longitude,
          ]}
        >
          <Popup>
            Shared User
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default LeafletMap;