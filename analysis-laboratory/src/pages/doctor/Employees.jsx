import { useState } from "react";
import { employeesData } from "../../data/employees";
import EmployeeSearch from "../../components/EmployeeSearch";
import { translations } from "../../constants/translations";
import { useLanguage } from "../../constants/Languageconstants";

import {
FaPhone,
FaEnvelope,
FaMoneyBillWave,
FaUserTie
} from "react-icons/fa";
import {
  HiOutlineEye,
  HiOutlinePencil,
  HiOutlineTrash
} from "react-icons/hi";
function Employees() {
const { language } = useLanguage();
const t = translations[language];
    
const [employeesList, setEmployeesList] = useState(employeesData);

const [search, setSearch] = useState("");

const [name, setName] = useState("");
const [phone, setPhone] = useState("");
const [position, setPosition] = useState("");
const [salary, setSalary] = useState("");

const [selectedEmployee, setSelectedEmployee] = useState(null);
const [editingEmployee, setEditingEmployee] = useState(null);
const [showForm, setShowForm] = useState(false);
const filteredEmployees = employeesList.filter((employee) =>
  employee.name.toLowerCase().includes(search.toLowerCase())
);





const deleteEmployee = (id) => {
  const confirmDelete = window.confirm("Are you sure?");

  if (confirmDelete) {
    setEmployeesList(
      employeesList.filter((emp) => emp.id !== id)
    );
  }
};
const addEmployee = () => {
  if (!name || !phone || !position || !salary) return;

  if (editingEmployee) {
    setEmployeesList(
      employeesList.map((emp) =>
        emp.id === editingEmployee.id
          ? {
              ...emp,
              name,
              phone,
              position,
              salary,
            }
          : emp
      )
    );

    setEditingEmployee(null);
  } else {
    setEmployeesList([
      ...employeesList,
      {
        id: Date.now(),
        name,
        phone,
        position,
        salary,
      },
    ]);
  }

  setName("");
  setPhone("");
  setPosition("");
  setSalary("");

  setShowForm(false);
};

const viewEmployee = (employee) => {
  setSelectedEmployee(employee);
};

const editEmployee = (employee) => {
  setEditingEmployee(employee);

  setName(employee.name);
  setPhone(employee.phone);
  setPosition(employee.position);
  setSalary(employee.salary);

  setShowForm(true);
};
  return (
<div className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 dark:text-white min-h-screen overflow-x-hidden transition-all">     
<div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold">
          {t.employees}</h1>

<button
  onClick={() => {
    setEditingEmployee(null);

    setName("");
    setPhone("");
    setPosition("");
    setSalary("");

    setShowForm(true);
  }}
className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
  {t.addEmployee}
  {/* Add Employees */}
</button>

      </div>
{/* <EmployeeStats /> */}

<EmployeeSearch
  search={search}
  setSearch={setSearch}
/>
{/* <div className="hidden lg:block">

<EmployeeTable
employees={filteredEmployees}
onDelete={deleteEmployee}
onView={viewEmployee}
onEdit={editEmployee}
/>

</div> */}
<div className="space-y-4 mt-6">
{filteredEmployees.length === 0 ? (

<div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 text-center">
  No employees found
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
{/* <div className="w-14 h-14">

<img src={employee.image} alt={employee.name}
className="w-full h-full rounded-full object-cover"/>

</div> */}
</div>


<div>

<h2 className="
font-semibold
text-gray-800
dark:text-white
">
{employee.name}
</h2>

<div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">

<FaUserTie className="text-purple-500"/>

<span>
{employee.position}
</span>

</div>

</div>

</div>



{/* Employee Details */}

<div className="mt-5 space-y-3 text-sm">

<div className="flex items-center gap-2">
<FaPhone className="text-blue-500"/>
<span>{employee.phone}</span>
</div>

<div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">

<FaEnvelope className="text-blue-500"/>

<span>
{employee.email}
</span>

</div>

<div className="flex items-center gap-2">
<FaMoneyBillWave className="text-green-500"/>
<span>{employee.salary} EGP</span>
</div>

</div>


{/* Status */}

<div className="mt-4">

<span className="
px-3
py-1
rounded-full
text-xs
bg-green-100
text-green-700
">
Active
</span>

</div>


{/* Actions */}

<div className="flex justify-end gap-2 mt-5">

<button
onClick={() => viewEmployee(employee)}
className="
p-2
rounded-lg
text-blue-600
hover:bg-blue-100
transition
"
>
<HiOutlineEye size={20}/>
</button>

<button
onClick={() => editEmployee(employee)}
className="
p-2
rounded-lg
text-yellow-600
hover:bg-yellow-100
transition
"
>
<HiOutlinePencil size={20}/>
</button>

<button
onClick={() => deleteEmployee(employee.id)}
className="
p-2
rounded-lg
text-red-600
hover:bg-red-100
transition
"
>
<HiOutlineTrash size={20}/>
</button>

</div>


</div>

))}

</div>

)}

</div>

 {showForm && (
<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-6 rounded-2xl w-full max-w-md shadow-2xl">
      <h2 className="mb-4 font-bold">Add Employee</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl p-3 mb-3"      />

      <input
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl p-3 mb-3"      />

      <select
        value={position}
        onChange={(e) => setPosition(e.target.value)}
className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl p-3 mb-3"      >
        <option value="">Select Position</option>
        <option value="Doctor">Doctor</option>
        <option value="Lab Technician">Lab Technician</option>
        <option value="Receptionist">Receptionist</option>
      </select>

      <input
        placeholder="Salary"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl p-3 mb-3"      />

      <div className="flex justify-end gap-2">

        <button
          onClick={() => setShowForm(false)}
className="px-5 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white transition"    > 
     {t.cancel}
        </button>

        <button
          onClick={addEmployee}
          
className="px-5 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white transition"        >
{editingEmployee ? "Update" : "save"}
        </button>

      </div>


    </div>
  </div>
)}

   {selectedEmployee && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">

    <div className="bg-white dark:bg-gray-800 dark:text-white rounded-2xl p-8 w-full max-w-md shadow-2xl">

      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Employee Details
      </h2>

      <div className="space-y-4">

        <p className="text-gray-700 dark:text-gray-200">
          <strong>Name:</strong> {selectedEmployee.name}
        </p>

        <p className="text-gray-700 dark:text-gray-200">
          <strong>Position:</strong> {selectedEmployee.position}
        </p>

        <p className="text-gray-700 dark:text-gray-200">
          <strong>Phone:</strong> {selectedEmployee.phone}
        </p>

        <p className="text-gray-700 dark:text-gray-200">
          <strong>Salary:</strong> ${selectedEmployee.salary}
        </p>

      </div>

      <div className="flex justify-end mt-8">

        <button
          onClick={() => setSelectedEmployee(null)}
          className="px-5 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white transition"
        >
          
          {t.cancel}
        </button>

      </div>

    </div>

  </div>
)}
</div>
  );
}

export default Employees;
