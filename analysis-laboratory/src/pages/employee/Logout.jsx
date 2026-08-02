import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">

      <div className="bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-xl w-[450px] text-center">

        <div className="text-6xl mb-4">
          🚪
        </div>

        <h2 className="text-3xl font-bold dark:text-white">
          Logout
        </h2>

        <p className="text-gray-500 mt-4 mb-8">
          Are you sure you want to logout?
        </p>

        <div className="flex justify-center gap-4">

          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 rounded-lg border hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleLogout}
            className="px-6 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
          >
            Logout
          </button>

        </div>

      </div>

    </div>
  );
}

export default Logout;