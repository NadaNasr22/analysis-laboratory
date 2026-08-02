import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { revenueData } from "../data/chartData";
import { useLanguage } from "../constants/useLanguage";
import { translations } from "../constants/translations";

function RevenueChart() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="bg-white dark:bg-gray-800 dark:text-white rounded-xl shadow p-6 mt-8">

      <h2 className="text-xl font-bold mb-5">
        {t.revenueOverview}
      </h2>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={revenueData}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#2563eb"
            strokeWidth={3}
          />

        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}

export default RevenueChart;