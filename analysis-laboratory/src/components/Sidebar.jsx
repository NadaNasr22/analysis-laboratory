import { NavLink } from "react-router-dom";
import { translations } from "../constants/translations";
import { useLanguage } from "../constants/useLanguage";
function Sidebar({ openSidebar, setOpenSidebar }) {
  const { language } = useLanguage();

  return (
    <div
      className={`
        fixed top-0 left-0 z-50
        w-64 h-screen
        bg-white dark:bg-gray-900
        border-r border-gray-200 dark:border-gray-700
        text-gray-800 dark:text-white
        flex flex-col
        transform transition-transform duration-300
        ${
          openSidebar
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }
      `}
    >
     
<div className="p-6 border-b border-gray-200 dark:border-gray-700 ">
  <h1 className="text-2xl font-bold text-blue-600">
    {translations[language].futureLaboratory}
  </h1>

  <p className="text-sm text-gray-500 mt-1">
    {translations[language].clinicalPrecision}
  </p>
</div>


      <ul className="mt-6 flex-1 px-2">

        <NavLink
          to="/doctor/dashboard"
          onClick={() => setOpenSidebar(false)}
          className={({ isActive }) =>
            isActive
              ? "block bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl mb-2 shadow-sm"
              : "block text-gray-600 dark:text-gray-300 font-medium px-6 py-3 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600 transition-all duration-300 mb-2"
          }
        >
          {translations[language].dashboard}
        </NavLink>

        <NavLink
          to="/doctor/profile"
          onClick={() => setOpenSidebar(false)}
          className={({ isActive }) =>
            isActive
              ? "block bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl mb-2 shadow-sm"
              : "block text-gray-600 dark:text-gray-300 font-medium px-6 py-3 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600 transition-all duration-300 mb-2"
          }
        >
          {translations[language].profile}
        </NavLink>

        <NavLink
          to="/doctor/patients"
          onClick={() => {
            if (window.innerWidth < 1024) {
              setOpenSidebar(false);
            }
          }}
          className={({ isActive }) =>
            isActive
              ? "block bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl mb-2 shadow-sm"
              : "block text-gray-600 dark:text-gray-300 font-medium px-6 py-3 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600 transition-all duration-300 mb-2"
          }
        >
          {translations[language].patients}
        </NavLink>

        <NavLink
          to="/doctor/employees"
          onClick={() => {
            if (window.innerWidth < 1024) {
              setOpenSidebar(false);
            }
          }}
          className={({ isActive }) =>
            isActive
              ? "block bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl mb-2 shadow-sm"
              : "block text-gray-600 dark:text-gray-300 font-medium px-6 py-3 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600 transition-all duration-300 mb-2"
          }
        >
          {translations[language].employees}
        </NavLink>

        <NavLink
          to="/doctor/analysis-requests"
          onClick={() => {
            if (window.innerWidth < 1024) {
              setOpenSidebar(false);
            }
          }}
          className={({ isActive }) =>
            isActive
              ? "block bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl mb-2 shadow-sm"
              : "block text-gray-600 dark:text-gray-300 font-medium px-6 py-3 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600 transition-all duration-300 mb-2"
          }
        >
          {translations[language].analysisRequests}
        </NavLink>

        <NavLink
          to="/doctor/analysis-types"
          onClick={() => {
            if (window.innerWidth < 1024) {
              setOpenSidebar(false);
            }
          }}
          className={({ isActive }) =>
            isActive
              ? "block bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl mb-2 shadow-sm"
              : "block text-gray-600 dark:text-gray-300 font-medium px-6 py-3 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600 transition-all duration-300 mb-2"
          }
        >
          {translations[language].analysisTypes}
        </NavLink>

        <NavLink
          to="/doctor/invoices"
          onClick={() => {
            if (window.innerWidth < 1024) {
              setOpenSidebar(false);
            }
          }}
          className={({ isActive }) =>
            isActive
              ? "block bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl mb-2 shadow-sm"
              : "block text-gray-600 dark:text-gray-300 font-medium px-6 py-3 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600 transition-all duration-300 mb-2"
          }
        >
          {translations[language].invoices}
        </NavLink>

        <NavLink
          to="/doctor/reports"
          onClick={() => {
            if (window.innerWidth < 1024) {
              setOpenSidebar(false);
            }
          }}
          className={({ isActive }) =>
            isActive
              ? "block bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl mb-2 shadow-sm"
              : "block text-gray-600 dark:text-gray-300 font-medium px-6 py-3 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600 transition-all duration-300 mb-2"
          }
        >
          {translations[language].reports}
        </NavLink>

        <NavLink
          to="/doctor/settings"
          onClick={() => {
            if (window.innerWidth < 1024) {
              setOpenSidebar(false);
            }
          }}
          className={({ isActive }) =>
            isActive
              ? "block bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl mb-2 shadow-sm"
              : "block text-gray-600 dark:text-gray-300 font-medium px-6 py-3 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600 transition-all duration-300 mb-2"
          }
        >
          {translations[language].settings}
        </NavLink>

      </ul>
    </div>
  );
}

export default Sidebar;