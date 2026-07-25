import { useEffect, useState } from "react";

function Settings() {
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


useEffect(() => {
  if (settings.darkMode) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}, [settings.darkMode]);

const [logo, setLogo] = useState(
  localStorage.getItem("labLogo") || ""
);
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
const [employees, setEmployees] = useState([
  {
    id: 1,
    name: "Sara",
    role: "Receptionist",
    permissions: {
      Patients: { view: true, add: true, edit: false, delete: false },
      Employees: { view: false, add: false, edit: false, delete: false },
      AnalysisRequests: { view: true, add: true, edit: true, delete: false },
      AnalysisResults: { view: true, add: false, edit: false, delete: false },
      Invoices: { view: true, add: true, edit: false, delete: false },
    },
  },

  {
    id: 2,
    name: "Ahmed",
    role: "Technician",
    permissions: {
      Patients: { view: true, add: false, edit:false, delete:false },
      Employees: { view:false, add:false, edit:false, delete:false },
      AnalysisRequests: { view:true, add:false, edit:true, delete:false },
      AnalysisResults: { view:true, add:true, edit:true, delete:true },
      Invoices: { view:false, add:false, edit:false, delete:false },
    },
  },

  {
    id: 3,
    name: "Mohamed",
    role: "Accountant",
    permissions: {
      Patients: { view:true, add:false, edit:false, delete:false },
      Employees: { view:false, add:false, edit:false, delete:false },
      AnalysisRequests: { view:false, add:false, edit:false, delete:false },
      AnalysisResults: { view:false, add:false, edit:false, delete:false },
      Invoices: { view:true, add:true, edit:true, delete:true },
    },
  },
]);

  
const [selectedEmployee, setSelectedEmployee] = useState(1);

const currentEmployee = employees.find(
  (emp) => emp.id === selectedEmployee
);

const permissions = currentEmployee.permissions;
const handlePermissionChange = (module, permission) => {
  setEmployees((prevEmployees) =>
    prevEmployees.map((emp) => {
      if (emp.id !== selectedEmployee) return emp;

      return {
        ...emp,
        permissions: {
          ...emp.permissions,
          [module]: {
            ...emp.permissions[module],
            [permission]:
              !emp.permissions[module][permission],
          },
        },
      };
    })
  );
};

const [settingsMessage, setSettingsMessage] = useState("");
const [permissionsMessage, setPermissionsMessage] = useState("");
const handleSaveSettings = () => {
  localStorage.setItem("settings", JSON.stringify(settings));

  setSettingsMessage("Settings saved successfully ✅");

  setTimeout(() => {
    setSettingsMessage("");
  }, 3000);
};
const handleSavePermissions = () => {
  localStorage.setItem("employees", JSON.stringify(employees));

  setPermissionsMessage("Permissions saved successfully ✅");

  setTimeout(() => {
    setPermissionsMessage("");
  }, 3000);
};
const [passwordMessage, setPasswordMessage] = useState("");

const [passwords, setPasswords] = useState({
  current: "",
  newPassword: "",
  confirm: "",
});

const handleChangePassword = () => {

  if (passwords.current !== "admin123") {
    setPasswordMessage("❌ Current password is incorrect");
    return;
  }

  if (passwords.newPassword !== passwords.confirm) {
    setPasswordMessage("❌ Passwords do not match");
    return;
  }

  if (passwords.newPassword.length < 6) {
    setPasswordMessage("❌ Password must be at least 6 characters");
    return;
  }

  setPasswordMessage("✅ Password changed successfully");

  setPasswords({
    current: "",
    newPassword: "",
    confirm: "",
  });

  setTimeout(() => {
    setPasswordMessage("");
  }, 3000);
};

const [language, setLanguage] = useState(
  localStorage.getItem("language") || "EN"
);
const changeLanguage = () => {
  const newLanguage = language === "EN" ? "AR" : "EN";

  setLanguage(newLanguage);

  localStorage.setItem("language", newLanguage);
};
// localStorage.setItem("settings", JSON.stringify(settings));
// localStorage.setItem("darkMode", JSON.stringify(settings.darkMode));
// localStorage.setItem("language", settings.language);

return (
<div className="p-6">
  {settingsMessage && (
  <div className="bg-green-100 text-green-700 p-3 rounded-xl mt-4 mb-4">
    {settingsMessage}
  </div>
)}
<h1 className="text-3xl font-bold">
Settings
</h1>


<p className="text-gray-500 mt-2">
Manage laboratory settings
</p>

<div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 transition-all">
<div className="flex items-center justify-between">

<div className="flex items-center gap-5">

<div className="w-24 h-24 rounded-full overflow-hidden bg-blue-100 flex items-center justify-center">
  {logo ? (
    <img
      src={logo}
      alt="Lab Logo"
      className="w-full h-full object-cover"
    />
  ) : (
    <span className="text-5xl">🏥</span>
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

<label className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl cursor-pointer">
  Upload Logo

  <input
    type="file"
    accept="image/*"
    onChange={handleLogoUpload}
    className="hidden"
  />
</label>

{/* <button
  onClick={() => {
    setLogo("");
    localStorage.removeItem("labLogo");
  }}
  className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl"
>
  Remove Logo
</button> */}

</div>

</div>

<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

<div className="bg-white dark:bg-gray-800 rounded-3xl shadow-md p-6 transition-all">

  <h2 className="text-xl font-bold mb-6">
    🏥 Laboratory Information
  </h2>

{settingsMessage && (
  <div className="bg-green-100 text-green-700 p-3 rounded-xl mb-4">
    {settingsMessage}
  </div>
)}
  <div className="space-y-5">

    <div>
      <label className="block mb-2 font-medium">
        Laboratory Name
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
        Phone Number
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
        Email Address
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
        Address
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
        Website
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
        Working Hours
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
<div className="bg-white dark:bg-gray-800 rounded-3xl shadow-md p-6 transition-all">

  <h2 className="text-xl font-bold mb-6">
    👨‍⚕️ Administrator
  </h2>

  <div className="space-y-5">

    <div>
      <label className="block mb-2 font-medium">
        Administrator Name
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
        className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label className="block mb-2 font-medium">
        Username
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
        className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label className="block mb-2 font-medium">
        Job Title
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
        className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label className="block mb-2 font-medium">
        Role
      </label>

      <select
        className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option>Laboratory Director</option>
        <option>Administrator</option>
        <option>Manager</option>
      </select>
    </div>

    <div>
      <label className="block mb-2 font-medium">
        Contact Email
      </label>

      <input
        type="email"
        value={settings.email}
        className="w-full border rounded-xl p-3 text-gray-900 dark:text-white"
        disabled
      />
    </div>

  </div>

</div>
<div className="bg-white dark:bg-gray-800 rounded-3xl shadow-md p-6 transition-all">

  <h2 className="text-xl font-bold mb-6">
    🎨 Appearance
  </h2>

  <div className="space-y-6">

    <div className="flex items-center justify-between">

      <div>

        <h3 className="font-semibold">
          Dark Mode
        </h3>

        <p className="text-sm text-gray-500">
          Enable dark theme for the dashboard.
        </p>

      </div>

      <input
        type="checkbox"
        checked={settings.darkMode}
        onChange={(e)=>
          setSettings({
            ...settings,
            darkMode:e.target.checked,
          })
        }
        className="w-5 h-5"
      />

    </div>

    <div>

      <label className="block mb-2 font-medium">
        Language
      </label>

      <select
        value={settings.language}
        onChange={(e)=>
          setSettings({
            ...settings,
            language:e.target.value,
          })
        }
        className="w-full border rounded-xl p-3"
      >

        <option  onClick={changeLanguage}
  className="flex items-center gap-2"
>
  🌐 {language}</option>
        <option>Arabic</option>

      </select>

    </div>

  </div>

</div>
<div className="bg-white dark:bg-gray-800 rounded-3xl shadow-md p-6 transition-all">

<h2 className="text-xl font-bold mb-6">
🔐 Security
</h2>

<div className="space-y-5">

<input
  type="password"
  placeholder="Current Password"
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
  placeholder="New Password"
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
  placeholder="Confirm Password"
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
  <div className="bg-green-100 text-green-700 p-3 rounded-xl mb-4">
    {passwordMessage}
  </div>
)}
<button
  onClick={handleChangePassword}
  className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl transition mt-5"
>
  Change Password
</button>
</div>
<div className="bg-white dark:bg-gray-800 rounded-3xl shadow-md p-6 transition-all lg:col-span-2">
<h2 className="text-xl font-bold mb-6">
👨‍💼 Employee Permissions
</h2>

<div className="mb-6">

<label className="block font-medium mb-2">
Select Employee
</label>

<select
  value={selectedEmployee}
  onChange={(e) =>
    setSelectedEmployee(Number(e.target.value))
  }
  className="w-full border rounded-xl p-3"
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

</div>

<div className="overflow-x-auto">
{permissionsMessage && (
  <div className="bg-green-100 text-green-700 p-3 rounded-xl mb-4">
    {permissionsMessage}
  </div>
)}

<table className="w-full">

<thead className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 transition-all">

<tr>

<th className="p-3 text-left">
Module
</th>

<th>View</th>

<th>Add</th>

<th>Edit</th>

<th>Delete</th>

</tr>

</thead>

<tbody>

{Object.entries(permissions).map(([module, access])=>(

<tr
key={module}
className="border-b"
>

<td className="p-3 font-medium">
{module}
</td>


<td className="text-center">
  <input
    type="checkbox"
    checked={access.view}
    onChange={() =>
      handlePermissionChange(module, "view")
    }
  />
</td>

<td className="text-center">
  {"add" in access ? (
    <input
      type="checkbox"
      checked={access.add}
      onChange={() =>
        handlePermissionChange(module, "add")
      }
    />
  ) : (
    <span>-</span>
  )}
</td>
<td className="text-center">
  {"edit" in access ? (
    <input
      type="checkbox"
      checked={access.edit}
      onChange={() =>
        handlePermissionChange(module, "edit")
      }
    />
  ) : (
    <span>-</span>
  )}
</td>

<td className="text-center">
  {"delete" in access ? (
    <input
      type="checkbox"
      checked={access.delete}
      onChange={() =>
        handlePermissionChange(module, "delete")
      }
    />
  ) : (
    <span>-</span>
  )}
</td>



</tr>

))}

</tbody>

</table>
<button
  onClick={handleSavePermissions}
  className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
>
  Save Permissions
</button>

</div>


<div className="lg:col-span-2 flex justify-end gap-4 mt-6">
  <button
    onClick={handleSaveSettings}
    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
  >
    Save Settings
  </button>
</div>

</div>

</div>
<button
  onClick={() => {
    localStorage.removeItem("settings");
    localStorage.removeItem("employees");
    window.location.reload();
  }}
  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl mt-5"
>
  Reset Settings
</button>
</div>
);
}
export default Settings;