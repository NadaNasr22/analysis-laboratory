import { useState } from "react";
import { useLanguage } from "../../constants/useLanguage";

function EmployeeProfile() {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  const [name, setName] = useState(
    localStorage.getItem("employeeName") || "Employee"
  );

  const [email, setEmail] = useState(
    localStorage.getItem("employeeEmail") || "employee@gmail.com"
  );

  const [address, setAddress] = useState(
    localStorage.getItem("employeeAddress") || "Mansoura, Egypt"
  );

  const [message, setMessage] = useState("");

  const handleSave = () => {
    localStorage.setItem("employeeName", name);
    localStorage.setItem("employeeEmail", email);
    localStorage.setItem("employeeAddress", address);

    setMessage(
      isArabic
        ? "تم حفظ البيانات بنجاح"
        : "Profile updated successfully"
    );

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <div
      dir={isArabic ? "rtl" : "ltr"}
      className="
        min-h-screen
        p-4 sm:p-6 lg:p-8
        bg-gray-100 dark:bg-gray-900
        text-gray-900 dark:text-white
      "
    >

      {/* Header */}

      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">
          {isArabic ? "الملف الشخصي" : "Employee Profile"}
        </h1>

        <p className="text-gray-500 dark:text-gray-400 mt-2">
          {isArabic
            ? "تعديل بيانات الموظف"
            : "Edit your employee information"}
        </p>
      </div>

      {/* Card */}

      <div
        className="
          bg-white dark:bg-gray-800
          rounded-2xl
          shadow-sm
          border border-gray-200 dark:border-gray-700
          p-5 sm:p-6
          max-w-3xl
        "
      >

        {/* Employee */}

        <div className="flex flex-col sm:flex-row items-center gap-5 mb-8">

          <div
            className="
              w-24 h-24
              rounded-full
              bg-blue-100 dark:bg-blue-900/30
              flex items-center justify-center
              text-4xl
            "
          >
            👤
          </div>

          <div className="text-center sm:text-left">
            <h2 className="text-xl font-bold">
              {name || (isArabic ? "الموظف" : "Employee")}
            </h2>

            <p className="text-gray-500 dark:text-gray-400">
              {isArabic ? "موظف المعمل" : "Laboratory Employee"}
            </p>
          </div>

        </div>

        {/* Message */}

        {message && (
          <div
            className="
              mb-5
              p-3
              rounded-xl
              bg-green-100
              dark:bg-green-900/30
              text-green-700
              dark:text-green-300
            "
          >
            {message}
          </div>
        )}

        {/* Name */}

        <div className="mb-5">

          <label className="block mb-2 font-medium">
            {isArabic ? "الاسم" : "Name"}
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="
              w-full
              px-4 py-3
              rounded-xl
              border border-gray-300 dark:border-gray-600
              bg-white dark:bg-gray-700
              text-gray-900 dark:text-white
              outline-none
              focus:ring-2 focus:ring-blue-500
            "
          />

        </div>

        {/* Email */}

        <div className="mb-5">

          <label className="block mb-2 font-medium">
            {isArabic ? "البريد الإلكتروني" : "Email"}
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              w-full
              px-4 py-3
              rounded-xl
              border border-gray-300 dark:border-gray-600
              bg-white dark:bg-gray-700
              text-gray-900 dark:text-white
              outline-none
              focus:ring-2 focus:ring-blue-500
            "
          />

        </div>

        {/* Address */}

        <div className="mb-6">

          <label className="block mb-2 font-medium">
            {isArabic ? "العنوان" : "Address"}
          </label>

          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="
              w-full
              px-4 py-3
              rounded-xl
              border border-gray-300 dark:border-gray-600
              bg-white dark:bg-gray-700
              text-gray-900 dark:text-white
              outline-none
              focus:ring-2 focus:ring-blue-500
            "
          />

        </div>

        {/* Save */}

        <div
          className={`flex ${
            isArabic ? "justify-start" : "justify-end"
          }`}
        >

          <button
            onClick={handleSave}
            className="
              w-full sm:w-auto
              px-6 py-3
              rounded-xl
              bg-blue-600
              hover:bg-blue-700
              text-white
              font-medium
              transition
            "
          >
            {isArabic ? "حفظ التعديلات" : "Save Changes"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default EmployeeProfile;

