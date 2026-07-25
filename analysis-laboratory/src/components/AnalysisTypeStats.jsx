import {
  FaFlask,
  FaTags,
  FaDollarSign,
  FaClock,
} from "react-icons/fa";

function AnalysisTypeStats({ total }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">

      <div className="bg-white dark:bg-gray-800 dark:text-white rounded-xl shadow p-5 flex items-center justify-between transition">
        <div>
          <p className="text-gray-500 dark:text-gray-400">Total Analysis</p>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{total}</h2>
        </div>

        <div className="bg-blue-100 p-3 rounded-full">
          <FaFlask className="text-blue-600 text-xl" />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 dark:text-white rounded-xl shadow p-5 flex items-center justify-between transition">
        <div>
          <p className="text-gray-500 dark:text-gray-400">Categories</p>
       <h2 className="text-2xl font-bold text-gray-900 dark:text-white">3</h2>
        </div>

        <div className="bg-green-100 p-3 rounded-full">
          <FaTags className="text-green-600 text-xl" />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 dark:text-white rounded-xl shadow p-5 flex items-center justify-between transition">
        <div>
          <p className="text-gray-500 dark:text-gray-400">Average Price</p>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">$100</h2>
        </div>

        <div className="bg-yellow-100 p-3 rounded-full">
          <FaDollarSign className="text-yellow-600 text-xl" />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 dark:text-white rounded-xl shadow p-5 flex items-center justify-between transition">
        <div>
          <p className="text-gray-500 dark:text-gray-400">Duration</p>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">20 min</h2>
        </div>

        <div className="bg-purple-100 p-3 rounded-full">
          <FaClock className="text-purple-600 text-xl" />
        </div>
      </div>

    </div>
  );
}

export default AnalysisTypeStats;