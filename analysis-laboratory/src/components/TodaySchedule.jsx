import { useLanguage } from "../constants/useLanguage";
import { translations } from "../constants/translations";

function TodaySchedule() {
  const { language } = useLanguage();
  const t = translations[language];

  const schedule = [
    {
      id: 1,
      time: "09:00 AM",
      patient: "Ahmed Ali",
      test: t.bloodTest,
    },
    {
      id: 2,
      time: "11:30 AM",
      patient: "Sara Mohamed",
      test: t.urineTest,
    },
    {
      id: 3,
      time: "02:00 PM",
      patient: "Omar Khaled",
      test: t.xRay,
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 dark:text-white rounded-xl shadow p-6">

      <h2 className="text-xl font-bold mb-4">
        📅 {t.todaysSchedule}
      </h2>

      {schedule.map((item) => (
        <div
          key={item.id}
          className="flex justify-between border-b py-3 last:border-none"
        >
          <div>
            <p className="font-semibold">
              {item.patient}
            </p>

            <p className="text-sm text-gray-500">
              {item.test}
            </p>
          </div>

          <span className="font-bold text-blue-600">
            {item.time}
          </span>
        </div>
      ))}

    </div>
  );
}

export default TodaySchedule;