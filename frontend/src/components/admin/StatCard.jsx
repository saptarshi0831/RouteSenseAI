import Card from "../ui/Card";

function StatCard({ title, value, icon, color }) {
    const colorClasses = {
        red: "text-red-600 bg-red-100",
        orange: "text-orange-600 bg-orange-100",
        green: "text-green-600 bg-green-100",
        blue: "text-blue-600 bg-blue-100",
    };

    return (
        <Card>
            <div className="flex items-center gap-4">
                <div className={`p-4 rounded-xl text-2xl ${colorClasses[color] || colorClasses.blue}`}>
                    {icon}
                </div>
                <div>
                    <p className="text-gray-500 text-sm font-medium">{title}</p>
                    <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
                </div>
            </div>
        </Card>
    );
}

export default StatCard;
