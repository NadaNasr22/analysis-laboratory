import { recentActivity } from "../data/recentActivity";

function RecentActivity() {
  return (
    <div className="bg-white dark:bg-gray-800 dark:text-white rounded-xl shadow p-6 mt-8">

      <h2 className="text-xl font-bold mb-5">
        Recent Activity
      </h2>

      <table className="w-full">

        <thead>

          <tr className="border-b">

            <th className="text-left p-3">Patient</th>

            <th className="text-left p-3">Activity</th>

            <th className="text-left p-3">Date</th>

          </tr>

        </thead>

        <tbody>

          {recentActivity.map((item) => (

            <tr
              key={item.id}
              className="border-b hover:bg-gray-50"
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
  );
}

export default RecentActivity;