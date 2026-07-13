import Card from "../ui/Card";

function StatCard({
  title,
  value,
  icon,
  color,
}) {
  const colorClasses = {
    red: "bg-red-500/15 text-red-500",

    orange:
      "bg-orange-500/15 text-orange-400",

    green:
      "bg-green-500/15 text-green-400",

    blue:
      "bg-blue-500/15 text-blue-400",
  };

  return (
    <Card>

      <div className="flex items-center gap-5">

        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center ${colorClasses[color]}`}
        >
          {icon}
        </div>

        <div>

          <p className="text-slate-400 text-sm font-medium">
            {title}
          </p>

          <h3 className="text-3xl font-bold text-white">
            {value}
          </h3>

        </div>

      </div>

    </Card>
  );
}

export default StatCard;