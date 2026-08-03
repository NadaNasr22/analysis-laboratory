import { useState } from "react";
import { useLanguage } from "../../constants/useLanguage";
import { translations } from "../../constants/translations";

function EmployeeSettings() {
  const { language } = useLanguage();

  const t = translations[language];
  const isArabic = language === "ar";

  const [employeeName, setEmployeeName] = useState(
    localStorage.getItem("employeeName") || "Employee"
  );

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [nameMessage, setNameMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  // ==================== Save Name ====================

  const handleSaveName = () => {
    if (!employeeName.trim()) {
      setNameMessage(t.enterEmployeeNameError);
      return;
    }

    localStorage.setItem(
      "employeeName",
      employeeName.trim()
    );

    setNameMessage(t.nameSaved);

    setTimeout(() => {
      setNameMessage("");
    }, 3000);
  };

  // ==================== Change Password ====================

  const handleChangePassword = () => {
    setPasswordMessage("");

    if (!currentPassword) {
      setPasswordMessage(t.enterCurrentPassword);
      return;
    }

    if (!newPassword) {
      setPasswordMessage(t.enterNewPassword);
      return;
    }

    if (newPassword.length < 6) {
      setPasswordMessage(t.passwordMinLength);
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMessage(t.passwordsDoNotMatch);
      return;
    }

    const savedPassword =
      localStorage.getItem("employeePassword") ||
      "admin123";

    if (currentPassword !== savedPassword) {
      setPasswordMessage(t.currentPasswordIncorrect);
      return;
    }

    localStorage.setItem(
      "employeePassword",
      newPassword
    );

    setPasswordMessage(t.passwordChanged);

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    setTimeout(() => {
      setPasswordMessage("");
    }, 3000);
  };

  return (
    <div
      dir={isArabic ? "rtl" : "ltr"}
      className="
        min-h-screen
        p-4
        sm:p-6
        lg:p-8
        overflow-x-hidden
        bg-gray-50
        dark:bg-gray-900
        text-gray-800
        dark:text-white
        transition-all
        duration-300
      "
    >
      {/* ================= Header ================= */}

      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">
          {t.employeeSettings}
        </h1>

        <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm sm:text-base">
          {t.manageEmployeeAccount}
        </p>
      </div>

      {/* ================= Main Grid ================= */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">

        {/* ================= Personal Information ================= */}

        <div
          className="
            bg-white
            dark:bg-gray-800
            rounded-2xl
            shadow-sm
            border
            border-gray-200
            dark:border-gray-700
            p-5
            sm:p-6
          "
        >
          <div className="flex items-center gap-3 mb-6">

            <div
              className="
                w-11
                h-11
                rounded-xl
                bg-blue-100
                dark:bg-blue-900/30
                flex
                items-center
                justify-center
                text-xl
              "
            >
              👤
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-bold">
                {t.personalInformation}
              </h2>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t.updateEmployeeName}
              </p>
            </div>

          </div>

          {/* Success Message */}

          {nameMessage && (
            <div
              className="
                mb-4
                bg-green-50
                dark:bg-green-900/20
                border
                border-green-200
                dark:border-green-800
                text-green-700
                dark:text-green-300
                rounded-xl
                p-3
                text-sm
              "
            >
              {nameMessage}
            </div>
          )}

          {/* Name */}

          <label className="block font-medium mb-2">
            {t.employeeName}
          </label>

          <input
            type="text"
            value={employeeName}
            onChange={(e) =>
              setEmployeeName(e.target.value)
            }
            className="
              w-full
              border
              border-gray-300
              dark:border-gray-600
              bg-white
              dark:bg-gray-700
              text-gray-900
              dark:text-white
              rounded-xl
              px-4
              py-3
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "
            placeholder={t.enterEmployeeName}
          />

          <button
            type="button"
            onClick={handleSaveName}
            className="
              w-full
              sm:w-auto
              mt-5
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-6
              py-3
              rounded-xl
              font-medium
              transition
            "
          >
            {t.saveName}
          </button>
        </div>

        {/* ================= Password ================= */}

        <div
          className="
            bg-white
            dark:bg-gray-800
            rounded-2xl
            shadow-sm
            border
            border-gray-200
            dark:border-gray-700
            p-5
            sm:p-6
            lg:col-span-2
          "
        >
          <div className="flex items-center gap-3 mb-6">

            <div
              className="
                w-11
                h-11
                rounded-xl
                bg-red-100
                dark:bg-red-900/30
                flex
                items-center
                justify-center
                text-xl
              "
            >
              🔐
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-bold">
                {t.changePassword}
              </h2>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t.updateAccountPassword}
              </p>
            </div>

          </div>

          {/* Password Message */}

          {passwordMessage && (
            <div
              className="
                mb-4
                bg-red-50
                dark:bg-red-900/20
                border
                border-red-200
                dark:border-red-800
                text-red-700
                dark:text-red-300
                rounded-xl
                p-3
                text-sm
              "
            >
              {passwordMessage}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* Current Password */}

            <input
              type="password"
              value={currentPassword}
              onChange={(e) =>
                setCurrentPassword(e.target.value)
              }
              placeholder={t.currentPassword}
              className="
                w-full
                border
                border-gray-300
                dark:border-gray-600
                bg-white
                dark:bg-gray-700
                text-gray-900
                dark:text-white
                rounded-xl
                px-4
                py-3
                outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />

            {/* New Password */}

            <input
              type="password"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(e.target.value)
              }
              placeholder={t.newPassword}
              className="
                w-full
                border
                border-gray-300
                dark:border-gray-600
                bg-white
                dark:bg-gray-700
                text-gray-900
                dark:text-white
                rounded-xl
                px-4
                py-3
                outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />

            {/* Confirm Password */}

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              placeholder={t.confirmPassword}
              className="
                w-full
                border
                border-gray-300
                dark:border-gray-600
                bg-white
                dark:bg-gray-700
                text-gray-900
                dark:text-white
                rounded-xl
                px-4
                py-3
                outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />

          </div>

          <button
            type="button"
            onClick={handleChangePassword}
            className="
              w-full
              sm:w-auto
              mt-5
              bg-red-500
              hover:bg-red-600
              text-white
              px-6
              py-3
              rounded-xl
              font-medium
              transition
            "
          >
            {t.changePassword}
          </button>

        </div>

      </div>
    </div>
  );
}

export default EmployeeSettings;

