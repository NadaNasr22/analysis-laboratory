import StatCard from "../../components/StatCard";
import RevenueChart from "../../components/RevenueChart";
import AnalysisPieChart from "../../components/AnalysisPieChart";
import PatientsBarChart from "../../components/PatientsBarChart";
import RecentActivity from "../../components/RecentActivity";

import { getPatients } from "../../data/patientStorage";
import { getInvoices } from "../../data/invoiceStorage";
import { analysisTypesData } from "../../data/analysisTypes";

import { useLanguage } from "../../constants/useLanguage";
import { translations } from "../../constants/translations";

function Reports() {
  const { language } = useLanguage();
  const t = translations[language];

  const patients = getPatients();
  const invoices = getInvoices();

  const totalRevenue = invoices
    .filter((invoice) => invoice.status === "Paid")
    .reduce((sum, invoice) => sum + invoice.total, 0);

  return (
<div 
className="
 min-h-screen bg-gray-100 dark:bg-gray-900 
text-gray-800 dark:text-white px-4 sm:px-6 
lg:px-8 pt-20 pb-8 overflow-x-hidden " >
      {/* Header */}

      <h1 className="text-2xl sm:text-3xl font-bold">
        {t.reports}
      </h1>

      <p className="text-gray-500 mt-2 text-sm sm:text-base">
        {t.laboratoryStatistics}
      </p>

      {/* Stats */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-4 sm:gap-6
          mt-8
        "
      >

        <StatCard
          title={t.patients}
          value={patients.length}
          icon="👨‍⚕️"
        />

        <StatCard
          title={t.revenue}
          value={`${totalRevenue} EGP`}
          icon="💰"
        />

        <StatCard
          title={t.analyses}
          value={analysisTypesData.length}
          icon="🧪"
        />

        <StatCard
          title={t.employees}
          value="18"
          icon="👥"
        />

      </div>

      {/* Revenue Chart */}

      <div className="mt-8 w-full overflow-hidden">
        <RevenueChart />
      </div>

      {/* Charts */}

      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-2
          gap-6
          mt-8
        "
      >

        <AnalysisPieChart />

        <PatientsBarChart />

      </div>

      {/* Recent Activity */}

      <div className="mt-8">
        <RecentActivity />
      </div>

    </div>
  );
}

export default Reports;