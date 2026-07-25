import { useNavigate } from "react-router-dom";

function PatientDashboard() {
  const navigate = useNavigate();

  const tests = [
    {
      id: 1,
      name: "Blood Test",
      status: "Pending",
      date: "2026-06-20",
    },
    {
      id: 2,
      name: "Urine Test",
      status: "Completed",
      date: "2026-06-18",
    },
  ];

  return (
    <div className="min-h-screen bg-green-50 p-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-green-700">
          🧑‍🔬 Patient Dashboard
        </h1>

        <button
          onClick={() => navigate("/")}
          className="bg-red-500 text-white px-5 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Tests Section */}
      <div className="bg-white p-6 rounded-xl shadow">

        <h2 className="text-xl font-bold mb-4">
          📄 My Tests
        </h2>

        {tests.map((test) => (
          <div
            key={test.id}
            className="flex justify-between items-center p-4 border-b"
          >
            <div>
              <p className="font-bold">{test.name}</p>
              <p className="text-gray-500 text-sm">{test.date}</p>
            </div>

            <span
              className={
                test.status === "Completed"
                  ? "text-green-600 font-bold"
                  : "text-yellow-500 font-bold"
              }
            >
              {test.status}
            </span>
          </div>
        ))}

      </div>
    </div>
  );
}

export default PatientDashboard;