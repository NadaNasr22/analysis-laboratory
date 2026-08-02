import { useLanguage } from "../constants/useLanguage";
import { translations } from "../constants/translations";
import { recentActivity } from "../data/recentActivity";

function RecentActivity() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="bg-white dark:bg-gray-800 dark:text-white rounded-xl shadow p-6 mt-8">

      <h2 className="text-xl font-bold mb-5">
        {t.recentActivity}
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full">

          <thead>
            <tr className="border-b">

              <th className="text-left p-3">
                {t.patient}
              </th>

              <th className="text-left p-3">
                {t.activity}
              </th>

              <th className="text-left p-3">
                {t.date}
              </th>

            </tr>
          </thead>

          <tbody>
            {recentActivity.map((item) => (
              <tr
                key={item.id}
                className="border-b hover:bg-gray-50 dark:hover:bg-gray-700"
              >

                <td className="p-3">
                  {item.patient}
                </td>

                <td className="p-3">
                  {item.action}
                </td>

                <td className="p-3 text-gray-500">
                  {item.date}
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}

export default RecentActivity;