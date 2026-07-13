import Card from "../ui/Card";

function SOSFeedCard({ emergencies = [], onAcknowledge, onResolve }) {
  return (
    <Card title="🔴 Live SOS Feed" subtitle="Real-time emergency requests">
      <div className="flex flex-col gap-4 overflow-y-auto" style={{ maxHeight: "500px" }}>
        
        {emergencies.length === 0 && (
          <div className="text-gray-500 text-center py-8">No active emergencies.</div>
        )}

        {emergencies.map((em) => (
          <div key={em.id} className="p-4 border border-red-200 bg-red-50 rounded-xl">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-bold text-red-700 text-sm">User: {em.userId?.substring(0,8)}...</h4>
              <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                  em.status === 'ACTIVE' ? 'bg-red-200 text-red-800' : 'bg-orange-200 text-orange-800'
              }`}>
                {em.status}
              </span>
            </div>
            
            <p className="text-xs text-gray-700 mb-4">
              📍 {em.latitude?.toFixed(4)}, {em.longitude?.toFixed(4)}<br/>
              🕒 {new Date(em.createdAt).toLocaleTimeString()}
            </p>

            <div className="flex gap-2">
              {em.status === "ACTIVE" ? (
                <button 
                  onClick={() => onAcknowledge(em.id)}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg font-medium text-xs transition cursor-pointer"
                >
                  Acknowledge
                </button>
              ) : (
                <button 
                  onClick={() => onResolve(em.id)}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-medium text-xs transition cursor-pointer"
                >
                  Resolve
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default SOSFeedCard;
