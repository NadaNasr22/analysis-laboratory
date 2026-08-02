import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { analysisData } from "../data/chartData";
import { translations } from "../constants/translations";
import { useLanguage } from "../constants/useLanguage";

const COLORS = [
  "#2563eb",
  "#10b981",
  "#f59e0b",
  "#ef4444",
];

function AnalysisPieChart() {
  const { language } = useLanguage();

  return (
    <div className="bg-white dark:bg-gray-800 dark:text-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold mb-5">
        {translations[language].topAnalysisTypes}
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={analysisData}
            dataKey="value"
            nameKey="name"
            outerRadius={110}
            label
          >
            {analysisData.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AnalysisPieChart;