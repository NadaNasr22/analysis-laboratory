import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../constants/Languageconstants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function EmployeeNavbar() {
  const { darkMode, setDarkMode } = useTheme();
  const { language, toggleLanguage } = useLanguage();
const navigate = useNavigate();
const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="bg-white dark:bg-gray-800 dark:text-white shadow h-16 flex justify-between items-center px-8 border-b border-gray-200 dark:border-gray-700 transition-all duration-300">

      <h2 className="text-2xl font-bold text-blue-700">
        Analysis Laboratory
      </h2>

      <div className="flex items-center gap-6">

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="text-2xl"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        <div
          onClick={toggleLanguage}
          className="cursor-pointer font-semibold text-gray-700 dark:text-white hover:text-blue-600 transition"
        >
          {language === "en" ? "AR" : "EN"}
        </div>

       <div className="relative">

  <button
    onClick={() => setShowMenu(!showMenu)}
    className="font-semibold"
  >
    👤 Employee
  </button>

  {showMenu && (
    <div className="absolute right-0 mt-3 w-44 bg-white dark:bg-gray-800 rounded-lg shadow-lg border">

      <button
        className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        👤 Profile
      </button>

      <button
        className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        ⚙ Settings
      </button>

  <button
  onClick={() => navigate("/employee/logout")}
  className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-gray-700"
>
  🚪 Logout
</button>

    </div>
  )}

</div>

      </div>

    </div>
  );
}

export default EmployeeNavbar;