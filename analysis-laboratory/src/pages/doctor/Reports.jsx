import StatCard from "../../components/StatCard";
import RevenueChart from "../../components/RevenueChart";
import AnalysisPieChart from "../../components/AnalysisPieChart";
import PatientsBarChart from "../../components/PatientsBarChart";
import RecentActivity from "../../components/RecentActivity";

function Reports() {
    
  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold">
        Reports
      </h1>

      <p className="text-gray-500 mt-2">
        Laboratory Statistics & Reports
      </p>

      <div className="grid grid-cols-4 gap-6 mt-8">

        <StatCard
          title="Patients"
          value="245"
          icon="👨‍⚕️"
        />

        <StatCard
          title="Revenue"
          value="85,000 EGP"
          icon="💰"
        />

        <StatCard
          title="Analyses"
          value="1240"
          icon="🧪"
        />

        <StatCard
          title="Employees"
          value="18"
          icon="👥"
        />

      </div>
<RevenueChart />
<div className="grid grid-cols-2 gap-6 mt-8">
  <AnalysisPieChart />

  <PatientsBarChart />
  <RecentActivity />
</div>
    </div>
  );
}

export default Reports;