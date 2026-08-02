import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaSearch, FaBars } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../constants/useLanguage";

function DoctorNavbar({
  openSidebar,
  setOpenSidebar,
}) {
  const { darkMode, setDarkMode } = useTheme();
  const { language, toggleLanguage } = useLanguage();

  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const isArabic = language === "ar";

  const handleLanguageChange = () => {
    // حفظ اللغة الحالية قبل التغيير
    localStorage.setItem("selectedLanguage", isArabic ? "ar" : "en");

    toggleLanguage();

    // حفظ اللغة الجديدة
    localStorage.setItem(
      "selectedLanguage",
      isArabic ? "en" : "ar"
    );
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      isArabic
        ? "هل أنت متأكد أنك تريد تسجيل الخروج؟"
        : "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <header
      className="
        fixed
        top-0
        left-0
        right-0
        lg:left-64
        z-[9999]
        h-16

        bg-white
        dark:bg-gray-800

        text-gray-900
        dark:text-white

        border-b
        border-gray-200
        dark:border-gray-700

        shadow-sm

        transition-all
        duration-300
      "
    >

      <div
        className="
          h-full
          flex
          items-center
          justify-between
          gap-4
          px-3
          sm:px-6
          lg:px-8
        "
      >

        {/* Left */}

        <div className="flex items-center gap-3 flex-1 min-w-0">

          {/* Mobile Sidebar */}

          <button
            type="button"
            onClick={() => setOpenSidebar(!openSidebar)}
            className="
              lg:hidden
              w-10
              h-10
              flex
              items-center
              justify-center
              rounded-xl
              text-xl
              hover:bg-gray-100
              dark:hover:bg-gray-700
              transition
              flex-shrink-0
            "
          >
            <FaBars />
          </button>


          {/* Search */}

          <div className="relative flex-1 max-w-md">

            <FaSearch
              className={`
                absolute
                top-1/2
                -translate-y-1/2
                text-gray-400
                ${isArabic ? "right-3" : "left-3"}
              `}
            />

            <input
              type="text"
              placeholder={
                isArabic
                  ? "البحث عن المرضى أو التحاليل..."
                  : "Search patients or analysis..."
              }
              className={`
                w-full
                py-2.5
                rounded-xl
                border
                border-gray-200
                dark:border-gray-700
                bg-gray-100
                dark:bg-gray-900
                outline-none
                focus:ring-2
                focus:ring-blue-500
                text-gray-900
                dark:text-white
                ${isArabic ? "pr-10 pl-4" : "pl-10 pr-4"}
              `}
            />

          </div>

        </div>


        {/* Right */}

        <div className="flex items-center gap-2 sm:gap-5">

          {/* Dark Mode */}

          <button
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            className="
              w-9
              h-9
              sm:w-10
              sm:h-10
              flex
              items-center
              justify-center
              rounded-xl
              text-xl
              hover:bg-gray-100
              dark:hover:bg-gray-700
              transition
            "
            aria-label="Toggle dark mode"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>


          {/* Language */}

          <button
            type="button"
            onClick={handleLanguageChange}
            className="
              h-9
              px-2
              sm:px-3
              rounded-lg
              font-semibold
              text-sm
              sm:text-base
              hover:bg-gray-100
              dark:hover:bg-gray-700
              hover:text-blue-600
              transition
            "
          >
            {isArabic ? "EN" : "AR"}
          </button>


          {/* Doctor Menu */}

          <div className="relative">

            <button
              type="button"
              onClick={() => setShowMenu(!showMenu)}
              className="
                flex
                items-center
                gap-2
                rounded-xl
                px-2
                py-1.5
                hover:bg-gray-100
                dark:hover:bg-gray-700
                transition
              "
            >

              <div
                className="
                  w-9
                  h-9
                  sm:w-10
                  sm:h-10
                  rounded-full
                  bg-blue-600
                  text-white
                  flex
                  items-center
                  justify-center
                  font-bold
                  flex-shrink-0
                "
              >
                D
              </div>

              <span className="hidden sm:block font-medium">
                {isArabic ? "الطبيب" : "Doctor"}
              </span>

              <span className="text-xs">
                ▾
              </span>

            </button>


            {/* Dropdown */}

            {showMenu && (

              <div
                className={`
                  absolute
                  top-full
                  mt-3
                  w-56
                  rounded-xl
                  bg-white
                  dark:bg-gray-800
                  border
                  border-gray-200
                  dark:border-gray-700
                  shadow-2xl
                  overflow-hidden
                  z-[10000]

                  ${
                    isArabic
                      ? "left-0"
                      : "right-0"
                  }
                `}
              >

                {/* Profile */}

                <button
                  type="button"
                  onClick={() => {
                    navigate("/doctor/profile");
                    setShowMenu(false);
                  }}
                  className="
                    w-full
                    text-left
                    px-5
                    py-3
                    hover:bg-gray-100
                    dark:hover:bg-gray-700
                    transition
                  "
                >
                  👤{" "}
                  {isArabic
                    ? "ملفي الشخصي"
                    : "My Profile"}
                </button>


                {/* Logout */}

                <button
                  type="button"
                  onClick={handleLogout}
                  className="
                    w-full
                    text-left
                    px-5
                    py-3
                    text-red-600
                    hover:bg-red-50
                    dark:hover:bg-red-900/20
                    transition
                  "
                >
                  🚪{" "}
                  {isArabic
                    ? "تسجيل الخروج"
                    : "Logout"}
                </button>

              </div>

            )}

          </div>

        </div>

      </div>

    </header>
  );
}

export default DoctorNavbar;

