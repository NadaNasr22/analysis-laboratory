import { NavLink } from "react-router-dom";
import { useLanguage } from "../constants/useLanguage";
import { translations } from "../constants/translations";

function EmployeeSidebar({ openSidebar, setOpenSidebar }) {
  const { language } = useLanguage();

  const t = translations[language];
  const isArabic = language === "ar";

  const linkStyle = ({ isActive }) =>
    isActive
      ? "block bg-blue-600 text-white font-semibold px-4 sm:px-6 py-3 rounded-xl mb-2 shadow-sm transition-all duration-200"
      : "block text-gray-600 dark:text-gray-300 font-medium px-4 sm:px-6 py-3 rounded-xl mb-2 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200";

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      setOpenSidebar(false);
    }
  };

  return (
    <>
      {/* ==================== Overlay ==================== */}
      {openSidebar && (
        <div
          onClick={() => setOpenSidebar(false)}
          className="
            fixed inset-0
            bg-black/40
            z-40
            lg:hidden
          "
        />
      )}

      {/* ==================== Sidebar ==================== */}
      <aside
        dir={isArabic ? "rtl" : "ltr"}
        className={`
          fixed
          top-0
          left-0
          z-50

          w-64
          h-screen

          bg-white
          dark:bg-gray-900

          border-r
          border-gray-200
          dark:border-gray-700

          text-gray-800
          dark:text-white

          flex
          flex-col

          shadow-xl
          lg:shadow-none

          transform
          transition-transform
          duration-300
          ease-in-out

          ${
            openSidebar
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* ==================== Logo ==================== */}
        <div className="p-5 sm:p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl sm:text-2xl font-bold text-blue-600">
            {t.futureLaboratory}
          </h1>

          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            {t.clinicalPrecision}
          </p>
        </div>

        {/* ==================== Links ==================== */}
        <nav className="flex-1 overflow-y-auto px-2 py-5">

          <NavLink
            to="/employee/dashboard"
            className={linkStyle}
            onClick={handleLinkClick}
          >
            {t.dashboard}
          </NavLink>

          <NavLink
            to="/employee/patients"
            className={linkStyle}
            onClick={handleLinkClick}
          >
            {t.patients}
          </NavLink>

          <NavLink
            to="/employee/analysis-requests"
            className={linkStyle}
            onClick={handleLinkClick}
          >
            {t.analysisRequests}
          </NavLink>

          <NavLink
            to="/employee/invoices"
            className={linkStyle}
            onClick={handleLinkClick}
          >
            {t.invoices}
          </NavLink>

          <NavLink
            to="/employee/enter-result"
            className={linkStyle}
            onClick={handleLinkClick}
          >
            {t.enterLaboratoryResult}
          </NavLink>

        </nav>

        {/* ==================== Bottom ==================== */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-center text-gray-400 dark:text-gray-500">
            © {t.futureLaboratory}
          </p>
        </div>
      </aside>
    </>
  );
}

export default EmployeeSidebar;


