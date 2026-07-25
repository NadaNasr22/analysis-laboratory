import {
  FaFlask,
  FaCheckCircle,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";

function AnalysisResultStats({
  total,
  normal,
  high,
  low,
}) {
  const cards = [
    {
      title: "Total Tests",
      value: total,
      color: "bg-blue-100",
      icon: <FaFlask className="text-blue-600 text-2xl" />,
    },
    {
      title: "Normal",
      value: normal,
      color: "bg-green-100",
      icon: <FaCheckCircle className="text-green-600 text-2xl" />,
    },
    {
      title: "High",
      value: high,
      color: "bg-red-100",
      icon: <FaArrowUp className="text-red-600 text-2xl" />,
    },
    {
      title: "Low",
      value: low,
      color: "bg-yellow-100",
      icon: <FaArrowDown className="text-yellow-600 text-2xl" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

      {cards.map((card) => (
        <div
          key={card.title}
className="bg-white dark:bg-gray-800 dark:text-white rounded-2xl shadow p-5 flex justify-between items-center transition-all"        >
          <div>
<p className="text-gray-500 dark:text-gray-400">
                {card.title}
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {card.value}
            </h2>
          </div>

          <div className={`${card.color} p-4 rounded-full`}>
            {card.icon}
          </div>
        </div>
      ))}

    </div>
  );
}

export default AnalysisResultStats;