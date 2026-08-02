import { useEffect, useState } from "react";
import { employeesData } from "../../data/employees";
import { translations } from "../../constants/translations";
import { useLanguage } from "../../constants/useLanguage";

function Settings() {
  const { language } = useLanguage();

  const [logo, setLogo] = useState(
    localStorage.getItem("labLogo") || ""
  );

  const [settingsMessage, setSettingsMessage] = useState("");
  const [permissionsMessage, setPermissionsMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem("settings");

    return savedSettings
      ? JSON.parse(savedSettings)
      : {
          labName: "Analysis Laboratory",
          phone: "01012345678",
          email: "analysis@gmail.com",
          address: "Mansoura, Egypt",
          website: "www.analysislab.com",
          workingHours: "8:00 AM - 10:00 PM",
          adminName: "Admin",
          username: "admin",
          jobTitle: "Laboratory Administrator",
          language: "English",
          darkMode: false,
        };
  });

  const createEmployeesWithPermissions = () => {
    return employeesData.map((employee) => ({
      ...employee,

      permissions: {
        Patients: {
          view: false,
          add: false,
          edit: false,
          delete: false,
        },

        Employees: {
          view: false,
          add: false,
          edit: false,
          delete: false,
        },

        AnalysisRequests: {
          view: false,
          add: false,
          edit: false,
          delete: false,
        },

        AnalysisResults: {
          view: false,
          add: false,
          edit: false,
          delete: false,
        },

        Invoices: {
          view: false,
          add: false,
          edit: false,
          delete: false,
        },
      },
    }));
  };

  const [employees, setEmployees] = useState(() => {
    const savedEmployees = localStorage.getItem("employees");

    return savedEmployees
      ? JSON.parse(savedEmployees)
      : createEmployeesWithPermissions();
  });

  const [selectedEmployee, setSelectedEmployee] = useState(1);

  const currentEmployee = employees.find(
    (emp) => emp.id === selectedEmployee
  );

  const permissions = currentEmployee?.permissions || {};

  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [settings.darkMode]);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setLogo(reader.result);

      localStorage.setItem("labLogo", reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handlePermissionChange = (module, permission) => {
    setEmployees((prev) =>
      prev.map((employee) => {
        if (employee.id !== selectedEmployee) {
          return employee;
        }

        return {
          ...employee,

          permissions: {
            ...employee.permissions,

            [module]: {
              ...employee.permissions[module],

              [permission]:
                !employee.permissions[module][permission],
            },
          },
        };
      })
    );
  };

  const handleSavePermissions = () => {
    localStorage.setItem(
      "employees",
      JSON.stringify(employees)
    );

    setPermissionsMessage(
      translations[language].permissionsSaved
    );

    setTimeout(() => {
      setPermissionsMessage("");
    }, 3000);
  };

  const handleSaveSettings = () => {
    localStorage.setItem(
      "settings",
      JSON.stringify(settings)
    );

    setSettingsMessage(
      translations[language].settingsSaved
    );

    setTimeout(() => {
      setSettingsMessage("");
    }, 3000);
  };

  const [passwords, setPasswords] = useState({
    current: "",
    newPassword: "",
    confirm: "",
  });

  const handleChangePassword = () => {
    if (passwords.current !== "admin123") {
      setPasswordMessage(
        translations[language].currentPasswordIncorrect
      );

      return;
    }

    if (passwords.newPassword !== passwords.confirm) {
      setPasswordMessage(
        translations[language].passwordsDoNotMatch
      );

      return;
    }

    if (passwords.newPassword.length < 6) {
      setPasswordMessage(
        translations[language].passwordMinLength
      );

      return;
    }

    setPasswordMessage(
      translations[language].passwordChanged
    );

    setPasswords({
      current: "",
      newPassword: "",
      confirm: "",
    });

    setTimeout(() => {
      setPasswordMessage("");
    }, 3000);
  };

  return (
<div className="p-4 sm:p-6 pt-20 sm:pt-22 overflow-x-hidden">
      {/* Page Header */}

      <h1 className="text-3xl font-bold">
        {translations[language].settings}
      </h1>

      <p className="text-gray-500 mt-2">
        {translations[language].manageLaboratorySettings}
      </p>


      {/* Laboratory Header */}

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 transition-all mt-6">

        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">

          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">

            <div className="w-24 h-24 rounded-full overflow-hidden bg-blue-100 flex items-center justify-center">

              {logo ? (
                <img
                  src={logo}
                  alt="Lab Logo"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-5xl">
                  🏥
                </span>
              )}

            </div>


            <div>

              <h2 className="text-2xl font-bold">
                {settings.labName}
              </h2>

              <p className="text-gray-500 mt-2">
                📍 {settings.address}
              </p>

              <p className="text-gray-500">
                📞 {settings.phone}
              </p>

              <p className="text-gray-500">
                📧 {settings.email}
              </p>

            </div>

          </div>


          <label className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl cursor-pointer w-full sm:w-auto text-center">

            {translations[language].uploadLogo}

            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="hidden"
            />

          </label>

        </div>

      </div>


      {/* Main Grid */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 mt-8">


        {/* Laboratory Information */}

        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-md p-4 sm:p-6 transition-all">

          <h2 className="text-xl font-bold mb-6">
            🏥 {translations[language].laboratoryInformation}
          </h2>


          {settingsMessage && (
            <div className="bg-green-100 text-green-700 p-3 rounded-xl mb-4">
              {settingsMessage}
            </div>
          )}


          <div className="space-y-5">

            <div>

              <label className="block mb-2 font-medium">
                {translations[language].laboratoryName}
              </label>

              <input
                type="text"
                value={settings.labName}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    labName: e.target.value,
                  })
                }
                className="w-full border rounded-xl p-3 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />

            </div>


            <div>

              <label className="block mb-2 font-medium">
                {translations[language].phoneNumber}
              </label>

              <input
                type="text"
                value={settings.phone}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    phone: e.target.value,
                  })
                }
                className="w-full border rounded-xl p-3 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />

            </div>


            <div>

              <label className="block mb-2 font-medium">
                {translations[language].emailAddress}
              </label>

              <input
                type="email"
                value={settings.email}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    email: e.target.value,
                  })
                }
                className="w-full border rounded-xl p-3 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />

            </div>


            <div>

              <label className="block mb-2 font-medium">
                {translations[language].address}
              </label>

              <input
                type="text"
                value={settings.address}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    address: e.target.value,
                  })
                }
                className="w-full border rounded-xl p-3 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />

            </div>


            <div>

              <label className="block mb-2 font-medium">
                {translations[language].website}
              </label>

              <input
                type="text"
                value={settings.website}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    website: e.target.value,
                  })
                }
                className="w-full border rounded-xl p-3 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />

            </div>


            <div>

              <label className="block mb-2 font-medium">
                {translations[language].workingHours}
              </label>

              <input
                type="text"
                value={settings.workingHours}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    workingHours: e.target.value,
                  })
                }
                className="w-full border rounded-xl p-3 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />

            </div>

          </div>

        </div>


        {/* Administrator */}

        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-md p-6 transition-all">

          <h2 className="text-xl font-bold mb-6">
            👨‍⚕️ {translations[language].administrator}
          </h2>


          <div className="space-y-5">

            <div>

              <label className="block mb-2 font-medium">
                {translations[language].administratorName}
              </label>

              <input
                type="text"
                value={settings.adminName}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    adminName: e.target.value,
                  })
                }
                className="w-full border rounded-xl p-3"
              />

            </div>


            <div>

              <label className="block mb-2 font-medium">
                {translations[language].username}
              </label>

              <input
                type="text"
                value={settings.username}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    username: e.target.value,
                  })
                }
                className="w-full border rounded-xl p-3"
              />

            </div>


            <div>

              <label className="block mb-2 font-medium">
                {translations[language].jobTitle}
              </label>

              <input
                type="text"
                value={settings.jobTitle}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    jobTitle: e.target.value,
                  })
                }
                className="w-full border rounded-xl p-3"
              />

            </div>


            <div>

              <label className="block mb-2 font-medium">
                {translations[language].role}
              </label>

              <select className="w-full border rounded-xl p-3">

                <option>
                  {translations[language].laboratoryDirector}
                </option>

                <option>
                  {translations[language].administrator}
                </option>

                <option>
                  {translations[language].manager}
                </option>

              </select>

            </div>


            <div>

              <label className="block mb-2 font-medium">
                {translations[language].contactEmail}
              </label>

              <input
                type="email"
                value={settings.email}
                disabled
                className="w-full border rounded-xl p-3 text-gray-900 dark:text-white"
              />

            </div>

          </div>

        </div>


        {/* Appearance */}

        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-md p-6 transition-all">

          <h2 className="text-xl font-bold mb-6">
            🎨 {translations[language].appearance}
          </h2>


          <div className="space-y-6">

            <div className="flex items-center justify-between">

              <div>

                <h3 className="font-semibold">
                  {translations[language].darkMode}
                </h3>

                <p className="text-sm text-gray-500">
                  {translations[language].enableDarkTheme}
                </p>

              </div>


              <input
                type="checkbox"
                checked={settings.darkMode}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    darkMode: e.target.checked,
                  })
                }
                className="w-5 h-5"
              />

            </div>


            <div>

              <label className="block mb-2 font-medium">
                {translations[language].language}
              </label>


              <select
                value={settings.language}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    language: e.target.value,
                  })
                }
                className="w-full border rounded-xl p-3"
              >

                <option value="English">
                  {translations[language].english}
                </option>

                <option value="Arabic">
                  {translations[language].arabic}
                </option>

              </select>

            </div>

          </div>

        </div>


        {/* Security */}

        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-md p-6 transition-all">

          <h2 className="text-xl font-bold mb-6">
            🔐 {translations[language].security}
          </h2>


          <div className="space-y-5">

            <input
              type="password"
              placeholder={
                translations[language].currentPassword
              }
              value={passwords.current}
              onChange={(e) =>
                setPasswords({
                  ...passwords,
                  current: e.target.value,
                })
              }
              className="w-full border rounded-xl p-3"
            />


            <input
              type="password"
              placeholder={
                translations[language].newPassword
              }
              value={passwords.newPassword}
              onChange={(e) =>
                setPasswords({
                  ...passwords,
                  newPassword: e.target.value,
                })
              }
              className="w-full border rounded-xl p-3"
            />


            <input
              type="password"
              placeholder={
                translations[language].confirmPassword
              }
              value={passwords.confirm}
              onChange={(e) =>
                setPasswords({
                  ...passwords,
                  confirm: e.target.value,
                })
              }
              className="w-full border rounded-xl p-3"
            />

          </div>


          {passwordMessage && (
            <div className="bg-green-100 text-green-700 p-3 rounded-xl mt-4">
              {passwordMessage}
            </div>
          )}


          <button
            onClick={handleChangePassword}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl mt-5"
          >
            {translations[language].changePassword}
          </button>

        </div>


        {/* Employee Permissions */}

        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-md p-3 sm:p-6 transition-all lg:col-span-2 overflow-hidden">

          <h2 className="text-xl font-bold mb-6">
            👨‍💼 {translations[language].employeePermissions}
          </h2>


          <label className="block font-medium mb-2">
            {translations[language].selectEmployee}
          </label>


          <select
            value={selectedEmployee}
            onChange={(e) =>
              setSelectedEmployee(Number(e.target.value))
            }
            className="w-full border rounded-xl p-3 mb-6"
          >

            {employees.map((employee) => (
              <option
                key={employee.id}
                value={employee.id}
              >
                {employee.name}
              </option>
            ))}

          </select>


          {permissionsMessage && (
            <div className="bg-green-100 text-green-700 p-3 rounded-xl mb-4">
              {permissionsMessage}
            </div>
          )}


          <div className="overflow-x-auto rounded-xl">

            <table className="w-full min-w-[650px]">

              <thead>

                <tr className="border-b">

                  <th className="p-3 text-left">
                    {translations[language].module}
                  </th>

                  <th className="p-3 whitespace-nowrap">
                    {translations[language].view}
                  </th>

                  <th className="p-3">
                    {translations[language].add}
                  </th>

                  <th className="p-3">
                    {translations[language].edit}
                  </th>

                  <th className="p-3">
                    {translations[language].delete}
                  </th>

                </tr>

              </thead>


              <tbody>

                {Object.entries(permissions).map(
                  ([module, access]) => {

                    const moduleTranslations = {
                      Patients:
                        translations[language].patients,

                      Employees:
                        translations[language].employees,

                      AnalysisRequests:
                        translations[language].analysisRequests,

                      AnalysisResults:
                        translations[language].analysisResults,

                      Invoices:
                        translations[language].invoices,
                    };


                    return (
                      <tr
                        key={module}
                        className="border-b"
                      >

                        <td className="p-3 font-medium">

                          {moduleTranslations[module] || module}

                        </td>


                        {[
                          "view",
                          "add",
                          "edit",
                          "delete",
                        ].map((permission) => (

                          <td
                            key={permission}
                            className="text-center"
                          >

                            <input
                              type="checkbox"
                              checked={access[permission]}
                              onChange={() =>
                                handlePermissionChange(
                                  module,
                                  permission
                                )
                              }
                            />

                          </td>

                        ))}

                      </tr>
                    );
                  }
                )}

              </tbody>

            </table>

          </div>


          <button
            onClick={handleSavePermissions}
            className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
          >
            {translations[language].savePermissions}
          </button>

        </div>


        {/* Save Settings */}

        <div className="lg:col-span-2 flex justify-end mt-2">

          <button
            onClick={handleSaveSettings}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
          >
            {translations[language].saveSettings}
          </button>

        </div>

      </div>


      {/* Reset Settings */}

      <button
        onClick={() => {
          localStorage.removeItem("settings");
          localStorage.removeItem("employees");

          window.location.reload();
        }}
        className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl mt-5"
      >
        {translations[language].resetSettings}
      </button>

    </div>
  );
}

export default Settings;






