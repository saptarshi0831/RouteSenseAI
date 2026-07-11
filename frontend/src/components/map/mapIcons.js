import L from "leaflet";

const createIcon = (
  emoji,
  background,
  extraClass = ""
) =>
  L.divIcon({
    className: "",
    html: `
      <div
        class="custom-marker ${extraClass}"
        style="background:${background}"
      >
        ${emoji}
      </div>
    `,
    iconSize: [34, 34],
    iconAnchor: [17, 34],
    popupAnchor: [0, -30],
  });

export const userMarker =
  createIcon(
    "📍",
    "#2563EB",
    "user-marker"
  );

export const hospitalMarker =
  createIcon("🏥", "#DC2626");

export const sharedMarker =
  createIcon("👤", "#16A34A");

// Future
export const fireMarker =
  createIcon("🔥", "#EA580C");

export const floodMarker =
  createIcon("🌊", "#0284C7");

export const landslideMarker =
  createIcon("⛰️", "#6B7280");