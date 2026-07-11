import DashboardLayout from "../components/layout/DashboardLayout";
import ComingSoon from "../components/common/ComingSoon";

function History() {
  return (
    <DashboardLayout>
      <ComingSoon
        title="Emergency History"
        description="View your previous emergency alerts, responses and incident history."
      />
    </DashboardLayout>
  );
}

export default History;