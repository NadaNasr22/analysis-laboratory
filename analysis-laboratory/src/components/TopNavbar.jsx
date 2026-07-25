import { FaMoon, FaSun, FaGlobe, FaUserCircle } from "react-icons/fa";
import { useLanguage } from "../constants/Languageconstants";

function TopNavbar({ darkMode, setDarkMode, title }) {
  const { language, toggleLanguage } = useLanguage();

  return (
    <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-5 rounded-xl shadow mb-6">

      <h1 className="text-2xl font-bold dark:text-white">
        {title}
      </h1>

      <div className="flex items-center gap-5">

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="text-xl dark:text-white"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        <button
          onClick={toggleLanguage}
          className="flex items-center gap-2 dark:text-white"
        >
          <FaGlobe />
          {language === "en" ? "AR" : "EN"}
        </button>

        <button className="text-3xl text-blue-600">
          <FaUserCircle />
        </button>

      </div>
    </div>
  );
}

export default TopNavbar;