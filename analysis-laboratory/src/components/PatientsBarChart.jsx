import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { patientsData } from "../data/chartData";
import { useLanguage } from "../constants/useLanguage";
import { translations } from "../constants/translations";

function PatientsBarChart() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="bg-white dark:bg-gray-800 dark:text-white rounded-xl shadow p-6">

      <h2 className="text-xl font-bold mb-5">
        {t.patientsPerMonth}
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={patientsData}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="patients"
            fill="#2563eb"
            radius={[8, 8, 0, 0]}
          />

        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}

export default PatientsBarChart;