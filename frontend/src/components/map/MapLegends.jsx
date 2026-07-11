import "../../styles/map-legend.css";

function MapLegend() {
  const items = [
    {
      icon: "📍",
      label: "Your Location",
    },
    {
      icon: "🏥",
      label: "Hospital",
    },
    {
      icon: "👤",
      label: "Shared User",
    },
    {
      icon: "🌊",
      label: "Flood Zone",
    },
    {
      icon: "🔥",
      label: "Fire Zone",
    },
  ];

  return (
    <div className="map-legend">

      <h4>
        🗺 Map Legend
      </h4>

      {items.map((item) => (
        <div
          key={item.label}
          className="legend-item"
        >
          <span className="legend-icon">
            {item.icon}
          </span>

          <span>
            {item.label}
          </span>
        </div>
      ))}

    </div>
  );
}

export default MapLegend;