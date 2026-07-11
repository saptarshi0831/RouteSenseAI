import DashboardLayout from "../components/layout/DashboardLayout";
import ComingSoon from "../components/common/ComingSoon";

function Notifications() {
  return (
    <DashboardLayout>
      <ComingSoon
        title="Notifications"
        description="Manage and review all emergency notifications."
      />
    </DashboardLayout>
  );
}

export default Notifications;