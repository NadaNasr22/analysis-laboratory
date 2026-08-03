import { useState } from "react";
import { employeesData } from "../../data/employees";
import EmployeeSearch from "../../components/EmployeeSearch";
import { translations } from "../../constants/translations";
import { useLanguage } from "../../constants/useLanguage";
import {
  FaPhone,
  FaEnvelope,
  FaMoneyBillWave,
  FaUserTie,
} from "react-icons/fa";

import {
  HiOutlineEye,
  HiOutlinePencil,
  HiOutlineTrash,
} from "react-icons/hi";

function Employees() {
  const { language } = useLanguage();
  const t = translations[language];

  const [employeesList, setEmployeesList] = useState(() => {
    const savedEmployees = localStorage.getItem("employees");

    return savedEmployees
      ? JSON.parse(savedEmployees)
      : employeesData.map((employee) => ({
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
  });

  const [search, setSearch] = useState("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const filteredEmployees = employeesList.filter((employee) =>
    employee.name.toLowerCase().includes(search.toLowerCase())
  );

  // Translate employee position
  const translatePosition = (position) => {
    const positionMap = {
      Doctor: t.doctorPosition,
      "Lab Technician": t.labTechnician,
      Receptionist: t.receptionist,
    };

    return positionMap[position] || position;
  };

  // Delete Employee
  const deleteEmployee = (id) => {
    const confirmDelete = window.confirm(
      t.confirmDeleteEmployee
    );

    if (confirmDelete) {
      const updatedEmployees = employeesList.filter(
        (emp) => emp.id !== id
      );

      setEmployeesList(updatedEmployees);

      localStorage.setItem(
        "employees",
        JSON.stringify(updatedEmployees)
      );
    }
  };

  // Add / Update Employee
  const addEmployee = () => {
    if (
      !name ||
      !phone ||
      !email ||
      !address ||
      !position ||
      !salary
    ) {
      return;
    }

    if (editingEmployee) {
      const updatedEmployees = employeesList.map((emp) =>
        emp.id === editingEmployee.id
          ? {
              ...emp,
              name,
              phone,
              email,
              address,
              position,
              salary,
            }
          : emp
      );

      setEmployeesList(updatedEmployees);

      localStorage.setItem(
        "employees",
        JSON.stringify(updatedEmployees)
      );

      setEditingEmployee(null);
    } else {
      const newEmployee = {
        id: Date.now(),
        name,
        phone,
        email,
        address,
        position,
        salary,
        image: "/images/avatar.png",

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
      };

      const updatedEmployees = [
        ...employeesList,
        newEmployee,
      ];

      setEmployeesList(updatedEmployees);

      localStorage.setItem(
        "employees",
        JSON.stringify(updatedEmployees)
      );
    }

    setName("");
    setPhone("");
    setEmail("");
    setAddress("");
    setPosition("");
    setSalary("");

    setShowForm(false);
  };

  // View Employee
  const viewEmployee = (employee) => {
    setSelectedEmployee(employee);
  };

  // Edit Employee
  const editEmployee = (employee) => {
    setEditingEmployee(employee);

    setName(employee.name);
    setPhone(employee.phone);
    setEmail(employee.email || "");
    setAddress(employee.address || "");
    setPosition(employee.position);
    setSalary(employee.salary);

    setShowForm(true);
  };

  return (
<div
  className="
    p-4 sm:p-6
    pt-20
    bg-gray-50
    dark:bg-gray-900
    dark:text-white
    min-h-screen
    overflow-x-hidden
    transition-all
  "
>
      {/* Header */}
<div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-10 pt-4 sm:pt-6">
        <div>
          <h1 className="text-2xl font-bold">
            {t.employees}
          </h1>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {t.employeesManagement}
          </p>
        </div>

        <button
          onClick={() => {
            setEditingEmployee(null);

            setName("");
            setPhone("");
            setPosition("");
            setSalary("");
            setEmail("");
            setAddress("");

            setShowForm(true);
          }}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
        >
          + {t.addEmployee}
        </button>

      </div>

      {/* Search */}
      <EmployeeSearch
        search={search}
        setSearch={setSearch}
      />

      {/* Employees */}
      <div className="space-y-4 mt-6">

        {filteredEmployees.length === 0 ? (

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 text-center">

            <p className="text-gray-500 dark:text-gray-400">
              {t.noEmployeesFound}
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            {filteredEmployees.map((employee) => (

              <div
                key={employee.id}
                className="
                  bg-white
                  dark:bg-gray-800
                  rounded-2xl
                  shadow-sm
                  p-5
                  hover:shadow-md
                  transition
                "
              >

                {/* Employee Header */}
                <div className="flex items-center gap-4">

                  <div
                    className="
                      w-12
                      h-12
                      rounded-full
                      bg-blue-100
                      text-blue-600
                      flex
                      items-center
                      justify-center
                      font-bold
                      text-lg
                    "
                  >
                    {employee.name.charAt(0).toUpperCase()}
                  </div>

                  <div>

                    <h2 className="font-semibold text-gray-800 dark:text-white">
                      {employee.name}
                    </h2>

                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">

                      <FaUserTie className="text-purple-500" />

                      <span>
                        {translatePosition(employee.position)}
                      </span>

                    </div>

                  </div>

                </div>

                {/* Employee Details */}
                <div className="mt-5 space-y-3 text-sm">

                  <div className="flex items-center gap-2">
                    <FaPhone className="text-blue-500" />
                    <span>{employee.phone}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">

                    <FaEnvelope className="text-blue-500" />

                    <span className="break-all">
                      {employee.email}
                    </span>

                  </div>

                  <div className="flex items-center gap-2">

                    <FaMoneyBillWave className="text-green-500" />

                    <span>
                      {employee.salary} EGP
                    </span>

                  </div>

                </div>

                {/* Status */}
                <div className="mt-4">

                  <span
                    className="
                      px-3
                      py-1
                      rounded-full
                      text-xs
                      bg-green-100
                      text-green-700
                    "
                  >
                    {t.employeeActive}
                  </span>

                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2 mt-5">

                  <button
                    onClick={() => viewEmployee(employee)}
                    title={t.view}
                    className="
                      p-2
                      rounded-lg
                      text-blue-600
                      hover:bg-blue-100
                      transition
                    "
                  >
                    <HiOutlineEye size={20} />
                  </button>

                  <button
                    onClick={() => editEmployee(employee)}
                    title={t.edit}
                    className="
                      p-2
                      rounded-lg
                      text-yellow-600
                      hover:bg-yellow-100
                      transition
                    "
                  >
                    <HiOutlinePencil size={20} />
                  </button>

                  <button
                    onClick={() => deleteEmployee(employee.id)}
                    title={t.delete}
                    className="
                      p-2
                      rounded-lg
                      text-red-600
                      hover:bg-red-100
                      transition
                    "
                  >
                    <HiOutlineTrash size={20} />
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

      {/* Add / Edit Employee Modal */}
      {showForm && (

        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">

          <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-6 rounded-2xl w-full max-w-md shadow-2xl">

            {/* Modal Header */}
            <div className="flex items-center justify-between mb-5">

              <h2 className="font-bold text-xl">
                {editingEmployee
                  ? t.edit
                  : t.addEmployeeTitle}
              </h2>

              <button
                onClick={() => setShowForm(false)}
                className="text-2xl text-gray-400 hover:text-red-500"
              >
                ✕
              </button>

            </div>

            {/* Name */}
            <input
              placeholder={t.name}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="
                w-full
                border
                dark:border-gray-600
                dark:bg-gray-700
                dark:text-white
                rounded-xl
                p-3
                mb-3
              "
            />

            {/* Phone */}
            <input
              placeholder={t.phone}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="
                w-full
                border
                dark:border-gray-600
                dark:bg-gray-700
                dark:text-white
                rounded-xl
                p-3
                mb-3
              "
            />

            {/* Email */}
            <input
              type="email"
              placeholder={t.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                w-full
                border
                dark:border-gray-600
                dark:bg-gray-700
                dark:text-white
                rounded-xl
                p-3
                mb-3
              "
            />

            {/* Address */}
            <input
              placeholder={t.address}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="
                w-full
                border
                dark:border-gray-600
                dark:bg-gray-700
                dark:text-white
                rounded-xl
                p-3
                mb-3
              "
            />

            {/* Position */}
            <select
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="
                w-full
                border
                dark:border-gray-600
                dark:bg-gray-700
                dark:text-white
                rounded-xl
                p-3
                mb-3
              "
            >

              <option value="">
                {t.selectPosition}
              </option>

              <option value="Doctor">
                {t.doctorPosition}
              </option>

              <option value="Lab Technician">
                {t.labTechnician}
              </option>

              <option value="Receptionist">
                {t.receptionist}
              </option>

            </select>

            {/* Salary */}
            <input
              placeholder={t.salary}
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="
                w-full
                border
                dark:border-gray-600
                dark:bg-gray-700
                dark:text-white
                rounded-xl
                p-3
                mb-5
              "
            />

            {/* Buttons */}
            <div className="flex justify-end gap-2">

              <button
                onClick={() => setShowForm(false)}
                className="
                  px-5
                  py-2
                  rounded-xl
                  bg-gray-200
                  hover:bg-gray-300
                  dark:bg-gray-700
                  dark:hover:bg-gray-600
                  dark:text-white
                  transition
                "
              >
                {t.cancel}
              </button>

              <button
  onClick={addEmployee}
  className="
    min-w-[100px]
    h-11
    px-5
    py-2
    rounded-xl
    bg-blue-600
    hover:bg-blue-700
    text-white
    whitespace-nowrap
    flex
    items-center
    justify-center
    transition
  "
>
  {editingEmployee
    ? t.update
    : t.save}
</button>

            </div>

          </div>

        </div>
      )}

      {/* Employee Details Modal */}
      {selectedEmployee && (

        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">

          <div className="bg-white dark:bg-gray-800 dark:text-white rounded-2xl p-6 sm:p-8 w-full max-w-md shadow-2xl">

            {/* Header */}
            <div className="flex items-center justify-between mb-6">

              <h2 className="text-2xl font-bold">
                {t.employeeDetails}
              </h2>

              <button
                onClick={() => setSelectedEmployee(null)}
                className="text-2xl text-gray-400 hover:text-red-500"
              >
                ✕
              </button>

            </div>

            <div className="space-y-4">

              {/* Name */}
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t.name}
                </p>

                <p className="font-semibold mt-1">
                  {selectedEmployee.name}
                </p>
              </div>

              {/* Position */}
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t.position}
                </p>

                <p className="font-semibold mt-1">
                  {translatePosition(
                    selectedEmployee.position
                  )}
                </p>
              </div>

              {/* Phone */}
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t.phone}
                </p>

                <p className="font-semibold mt-1">
                  {selectedEmployee.phone}
                </p>
              </div>

              {/* Email */}
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t.email}
                </p>

                <p className="font-semibold mt-1 break-all">
                  {selectedEmployee.email}
                </p>
              </div>

              {/* Address */}
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t.address}
                </p>

                <p className="font-semibold mt-1">
                  {selectedEmployee.address}
                </p>
              </div>

              {/* Salary */}
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t.salary}
                </p>

                <p className="font-semibold mt-1">
                  {selectedEmployee.salary} EGP
                </p>
              </div>

            </div>

            {/* Close */}
            <div className="flex justify-end mt-8">

              <button
                onClick={() => setSelectedEmployee(null)}
                className="
                  px-5
                  py-2
                  rounded-xl
                  bg-red-500
                  hover:bg-red-600
                  text-white
                  transition
                "
              >
                {t.close}
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default Employees;

