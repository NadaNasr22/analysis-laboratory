
import StatCard from "../../components/StatCard";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPatients } from "../../data/patientStorage";
import { getInvoices } from "../../data/invoiceStorage";
import TopNavbar from "../../components/TopNavbar";
function EmployeeDashboard() {
  const patients = getPatients();
  const navigate = useNavigate();
  const invoices = getInvoices();
  const totalRevenue = invoices
  .filter((invoice) => invoice.status === "Paid")
  .reduce((sum, invoice) => sum + invoice.total, 0);
  // const [darkMode, setDarkMode] = useState(false);
  return (
    
<div className="p-4 sm:p-6 overflow-x-hidden">
 

<div className="
grid 
grid-cols-1 
sm:grid-cols-2 
xl:grid-cols-4 
gap-4 sm:gap-6 
mt-6
">
<StatCard
  title="Patients"
  value={patients.length}
  icon="👥"
  color="bg-blue-100"
/>

<StatCard
  title="Requests"
  value="12"
  icon="🧪"
  color="bg-purple-100"
/>

<StatCard
  title="Invoices"
  value={invoices.length}
  icon="🧾"
  color="bg-orange-100"
/>

<StatCard
  title="Revenue"
  value={`${totalRevenue} EGP`}
  icon="💰"
  color="bg-green-100"
/>

  </div>
<div className="
grid 
grid-cols-1 
lg:grid-cols-2 
gap-4 sm:gap-6 
mt-6
">
  {/* Today's Patients */}
<div className="
bg-white dark:bg-gray-800
border border-gray-200 dark:border-gray-700
rounded-2xl
shadow-sm
p-4 sm:p-5
">
    <h2 className="text-lg font-semibold mb-4">
      Today's Patients
    </h2>

    <div className="space-y-3">

      <div className="flex justify-between border-b pb-2">
        <span>Ahmed Mohamed</span>
        <span className="text-gray-500">CBC</span>
      </div>

      <div className="flex justify-between border-b pb-2">
        <span>Sara Ali</span>
        <span className="text-gray-500">Blood Sugar</span>
      </div>

      <div className="flex justify-between">
        <span>Mohamed Khaled</span>
        <span className="text-gray-500">Urine Analysis</span>
      </div>

    </div>

  </div>

  {/* Recent Invoices */}
<div className="
bg-white dark:bg-gray-800
border border-gray-200 dark:border-gray-700
rounded-2xl
shadow-sm
p-4 sm:p-5
">
    <h2 className="text-lg font-semibold mb-4">
      Recent Invoices
    </h2>

    <div className="space-y-3">

      <div className="flex justify-between border-b pb-2">
        <span>#1001</span>
        <span className="text-green-600">Paid</span>
      </div>

      <div className="flex justify-between border-b pb-2">
        <span>#1002</span>
        <span className="text-yellow-600">Pending</span>
      </div>

      <div className="flex justify-between">
        <span>#1003</span>
        <span className="text-red-600">Cancelled</span>
      </div>

    </div>

  </div>

</div>
<div className="bg-white dark:bg-gray-800 
border border-gray-200 dark:border-gray-700 
rounded-2xl shadow-sm p-4 sm:p-6 mt-6">

  <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-5">
    Quick Actions
  </h2>


  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">


    {/* Add Patient */}
    <button
      onClick={() =>
        navigate("/employee/patients", {
          state: { openAddModal: true },
        })
      }
      className="
      group
      border border-gray-200 dark:border-gray-700
      rounded-2xl p-4 sm:p-5
      text-left
      hover:shadow-md
      hover:-translate-y-1
      transition-all
      "
    >

      <div className="
      w-12 h-12 rounded-xl
      bg-blue-100
      flex items-center justify-center
      mb-4
      ">
        👤
      </div>


      <h3 className="font-semibold text-gray-800 dark:text-white">
        Add Patient
      </h3>

      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
        Register new patient
      </p>

    </button>



    {/* Create Invoice */}
    <button
      onClick={() =>
        navigate("/employee/invoices", {
          state: { openAddModal: true },
        })
      }
      className="
      border border-gray-200 dark:border-gray-700
      rounded-2xl p-5
      text-left
      hover:shadow-md
      hover:-translate-y-1
      transition-all
      "
    >

      <div className="
      w-12 h-12 rounded-xl
      bg-green-100
      flex items-center justify-center
      mb-4
      ">
        🧾
      </div>


      <h3 className="font-semibold text-gray-800 dark:text-white">
        Create Invoice
      </h3>


      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
        Generate billing details
      </p>

    </button>



    {/* New Request */}
    <button
      onClick={() =>
        navigate("/employee/analysis-requests", {
          state: { openAddModal: true },
        })
      }
      className="
      border border-gray-200 dark:border-gray-700
      rounded-2xl p-5
      text-left
      hover:shadow-md
      hover:-translate-y-1
      transition-all
      "
    >

      <div className="
      w-12 h-12 rounded-xl
      bg-purple-100
      flex items-center justify-center
      mb-4
      ">
        🧪
      </div>


      <h3 className="font-semibold text-gray-800 dark:text-white">
        New Request
      </h3>


      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
        Create analysis request
      </p>


    </button>




    {/* Patients List */}
    <button
      onClick={() => navigate("/employee/patients")}
      className="
      border border-gray-200 dark:border-gray-700
      rounded-2xl p-5
      text-left
      hover:shadow-md
      hover:-translate-y-1
      transition-all
      "
    >

      <div className="
      w-12 h-12 rounded-xl
      bg-orange-100
      flex items-center justify-center
      mb-4
      ">
        📋
      </div>


      <h3 className="font-semibold text-gray-800 dark:text-white">
        Patients List
      </h3>


      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
        View all patients
      </p>


    </button>


  </div>

</div>

</div>
  );
}

export default EmployeeDashboard;