import { useLanguage } from "../constants/useLanguage";
import { translations } from "../constants/translations";

function RecentActivities() {
  const { language } = useLanguage();
  const t = translations[language];

  const activities = [
    {
      id: 1,
      text: t.ahmedRequestedBloodTest,
      time: t.fiveMinAgo,
    },
    {
      id: 2,
      text: t.saraCompletedUrineTest,
      time: t.twentyMinAgo,
    },
    {
      id: 3,
      text: t.newPatientAdded,
      time: t.oneHourAgo,
    },
    {
      id: 4,
      text: t.invoicePaid,
      time: t.twoHoursAgo,
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 dark:text-white rounded-xl shadow p-6 h-full">

      <h2 className="text-xl font-bold mb-4">
        🔔 {t.recentActivities}
      </h2>

      {activities.map((item) => (
        <div
          key={item.id}
          className="border-b py-3 last:border-none"
        >
          <p className="font-medium">
            {item.text}
          </p>

          <span className="text-sm text-gray-500">
            {item.time}
          </span>
        </div>
      ))}

    </div>
  );
}

export default RecentActivities;