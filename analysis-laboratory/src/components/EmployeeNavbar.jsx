import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../constants/useLanguage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function EmployeeNavbar({ openSidebar, setOpenSidebar }) {
  const { darkMode, setDarkMode } = useTheme();
  const { language, toggleLanguage } = useLanguage();

  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const isArabic = language === "ar";

  return (
    <header
      dir={isArabic ? "rtl" : "ltr"}
      className="
        relative
        z-[100]

        h-16
        w-full

        bg-white
        dark:bg-gray-800

        text-gray-900
        dark:text-white

        border-b
        border-gray-200
        dark:border-gray-700

        shadow-sm

        flex
        items-center
        justify-between

        px-3
        sm:px-5
        lg:px-8

        transition-all
        duration-300
      "
    >

      {/* ==================== Left / Start Side ==================== */}

      <div className="flex items-center gap-3 min-w-0">

        {/* Mobile Menu */}

        <button
          type="button"
          onClick={() => setOpenSidebar(!openSidebar)}
          className="
            lg:hidden

            flex
            items-center
            justify-center

            w-10
            h-10

            rounded-xl

            text-xl

            text-gray-700
            dark:text-gray-200

            hover:bg-gray-100
            dark:hover:bg-gray-700

            transition
          "
          aria-label="Toggle sidebar"
        >
          {openSidebar ? "✕" : "☰"}
        </button>

        {/* Laboratory Name */}

        <h2
          className="
            text-base
            sm:text-xl
            lg:text-2xl

            font-bold

            text-blue-700
            dark:text-blue-400

            truncate
          "
        >
          {isArabic
            ? "معمل المستقبل"
            : "Analysis Laboratory"}
        </h2>

      </div>


      {/* ==================== Actions ==================== */}

      <div className="flex items-center gap-2 sm:gap-4">

        {/* ==================== Dark Mode ==================== */}

        <button
          type="button"
          onClick={() => setDarkMode(!darkMode)}
          className="
            flex
            items-center
            justify-center

            w-9
            h-9
            sm:w-10
            sm:h-10

            rounded-xl

            text-lg
            sm:text-xl

            hover:bg-gray-100
            dark:hover:bg-gray-700

            transition
          "
          aria-label="Toggle dark mode"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>


        {/* ==================== Language ==================== */}

        <button
          type="button"
          onClick={toggleLanguage}
          className="
            flex
            items-center
            justify-center

            h-9
            px-2
            sm:px-3

            rounded-lg

            text-sm
            sm:text-base

            font-semibold

            text-gray-700
            dark:text-gray-200

            hover:bg-gray-100
            dark:hover:bg-gray-700

            hover:text-blue-600

            transition
          "
        >
          {language === "en" ? "AR" : "EN"}
        </button>


        {/* ==================== Employee Menu ==================== */}

        <div className="relative">

          <button
            type="button"
            onClick={() => setShowMenu(!showMenu)}
            className="
              flex
              items-center
              gap-1

              h-9
              px-2
              sm:px-3

              rounded-lg

              font-semibold
              text-sm
              sm:text-base

              text-gray-700
              dark:text-gray-200

              hover:bg-gray-100
              dark:hover:bg-gray-700

              transition
            "
          >

            <span>👤</span>

            <span className="hidden sm:inline">
              {isArabic ? "الموظف" : "Employee"}
            </span>

            <span className="text-xs">
              ▾
            </span>

          </button>


          {/* ==================== Dropdown ==================== */}

          {showMenu && (
            <div
              className={`
                absolute
                top-full
                mt-3

                w-48
                sm:w-52

                bg-white
                dark:bg-gray-800

                rounded-xl

                shadow-2xl

                border
                border-gray-200
                dark:border-gray-700

                overflow-hidden

                z-[200]

                ${
                  isArabic
                    ? "left-0"
                    : "right-0"
                }
              `}
            >

              {/* ==================== Profile ==================== */}

              <button
                type="button"
                onClick={() => {
                  setShowMenu(false);
                  navigate("/employee/profile");
                }}
                className="
                  w-full

                  flex
                  items-center
                  gap-3

                  px-4
                  py-3

                  text-gray-800
                  dark:text-gray-100

                  hover:bg-gray-100
                  dark:hover:bg-gray-700

                  transition
                "
              >

                <span>👤</span>

                <span>
                  {isArabic
                    ? "الملف الشخصي"
                    : "Profile"}
                </span>

              </button>


              {/* ==================== Settings ==================== */}

              <button
                type="button"
                onClick={() => {
                  setShowMenu(false);
                  navigate("/employee/settings");
                }}
                className="
                  w-full

                  flex
                  items-center
                  gap-3

                  px-4
                  py-3

                  text-gray-800
                  dark:text-gray-100

                  hover:bg-gray-100
                  dark:hover:bg-gray-700

                  transition
                "
              >

                <span>⚙️</span>

                <span>
                  {isArabic
                    ? "الإعدادات"
                    : "Settings"}
                </span>

              </button>


              {/* ==================== Logout ==================== */}

              <button
                type="button"
                onClick={() => {
                  setShowMenu(false);
                  navigate("/employee/logout");
                }}
                className="
                  w-full

                  flex
                  items-center
                  gap-3

                  px-4
                  py-3

                  text-red-600

                  hover:bg-red-50
                  dark:hover:bg-red-900/20

                  transition
                "
              >

                <span>🚪</span>

                <span>
                  {isArabic
                    ? "تسجيل الخروج"
                    : "Logout"}
                </span>

              </button>

            </div>
          )}

        </div>

      </div>

    </header>
  );
}

export default EmployeeNavbar;


