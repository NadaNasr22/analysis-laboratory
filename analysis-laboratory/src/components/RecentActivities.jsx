function RecentActivities() {
  const activities = [
    {
      id: 1,
      text: "Ahmed Ali requested Blood Test",
      time: "5 min ago",
    },
    {
      id: 2,
      text: "Sara Mohamed completed Urine Test",
      time: "20 min ago",
    },
    {
      id: 3,
      text: "New patient added",
      time: "1 hour ago",
    },
    {
      id: 4,
      text: "Invoice #205 paid",
      time: "2 hours ago",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 dark:text-white rounded-xl shadow p-6 h-full">
      <h2 className="text-xl font-bold mb-4">
        🔔 Recent Activities
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