import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", tests: 20 },
  { day: "Tue", tests: 35 },
  { day: "Wed", tests: 18 },
  { day: "Thu", tests: 42 },
  { day: "Fri", tests: 30 },
  { day: "Sat", tests: 25 },
  { day: "Sun", tests: 38 },
];

function AnalysisChart() {
  return (
    <div className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">
        📈 Weekly Analysis
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="tests" fill="#2563eb" radius={[5, 5, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AnalysisChart;