
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../constants/Languageconstants";

function DoctorNavbar() {
    const { darkMode, setDarkMode } = useTheme();

  const { language, toggleLanguage } = useLanguage();
  const navigate = useNavigate();

const [showMenu, setShowMenu] = useState(false);

const handleLogout = () => {
  const confirmLogout = window.confirm(
    "Are you sure you want to logout?"
  );

  if (!confirmLogout) return;

  localStorage.removeItem("user");
  navigate("/");
};

// const changeLanguage = () => {
//   setLanguage(language === "EN" ? "AR" : "EN");
// };
  return (
<div className="bg-white dark:bg-gray-800 dark:text-white shadow h-16 flex justify-between items-center px-4 sm:px-6 lg:px-8 border-b border-gray-200 dark:border-gray-700 transition-all duration-300">    



<div className="flex justify-between items-center w-full">  
<div className="relative w-72">

  <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

  <input
    type="text"
    placeholder="Search patients or analysis..."
    className="w-full pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-gray-800 rounded-xl outline-none border border-gray-200 dark:border-gray-700"
  />

</div>

<div className="flex items-center gap-5">
    {/* Notification */}
    {/* Dark Mode */}
    {/* Language */}
    {/* Doctor */}
</div>
  </div>

  {/* Notification */}

  <div className="flex items-center gap-5 ml-10">

 { /*<button className="text-xl hover:text-blue-600 transition">
    <FaBell />
  </button>*/}

  {/* Dark Mode */}
  <button
    onClick={() => setDarkMode(!darkMode)}
    className="text-2xl"
  >
    {darkMode ? "☀️" : "🌙"}
  </button>

  {/* Language */}
  <div
    onClick={toggleLanguage}
    className="cursor-pointer font-semibold hover:text-blue-600"
  >
    {language === "en" ? "AR" : "EN"}
  </div>

<div className="relative">

  <button
    onClick={() => setShowMenu(!showMenu)}
    className="flex items-center gap-3"
  >
    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
      D
    </div>

    <span className="hidden sm:block font-medium">
      Doctor
    </span>
  </button>

  {showMenu && (
    <div className="absolute right-0 top-14 w-52 bg-white dark:bg-gray-800 rounded-xl shadow-xl border dark:border-gray-700 overflow-hidden z-50">

      <button
        onClick={() => {
          navigate("/doctor/profile");
          setShowMenu(false);
        }}
        className="w-full text-left px-5 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        👤 My Profile
      </button>

      <button
        onClick={handleLogout}
        className="w-full text-left px-5 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-gray-700"
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

export default DoctorNavbar;