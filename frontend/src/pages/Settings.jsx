import DashboardLayout from "../components/layout/DashboardLayout";
import ComingSoon from "../components/common/ComingSoon";

function Settings() {
  return (
    <DashboardLayout>
      <ComingSoon
        title="Settings"
        description="Customize your RouteSense AI experience."
      />
    </DashboardLayout>
  );
}

export default Settings;