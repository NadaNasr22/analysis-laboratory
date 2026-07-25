import { NavLink } from "react-router-dom";
// import { FaSignOutAlt } from "react-icons/fa";
function Sidebar({ openSidebar }) {
      

    return (
<div
  className={`
       fixed top-0 left-0 z-50
    w-64 h-screen
    bg-white dark:bg-gray-900
    border-r border-gray-200 dark:border-gray-700
    text-gray-800 dark:text-white
    flex flex-col
    transform transition-transform duration-300
    ${
      openSidebar
        ? "translate-x-0"
        : "-translate-x-full lg:translate-x-0"
    }
  `}
>         
     <div className="p-6 border-b border-gray-200 dark:border-gray-700">

  <h1 className="text-2xl font-bold text-blue-600">
Future Laboratory
  </h1>

  <p className="text-sm text-gray-500 mt-1">
Clinical Precision
  </p>

</div>
<ul className="mt-6 flex-1  px-2">
      <NavLink
  to="/doctor/dashboard"
className={({ isActive }) =>
  isActive
    ? "block bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl mb-2 shadow-sm"
    : "block text-gray-600 dark:text-gray-300 font-medium px-6 py-3 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600 transition-all duration-300 mb-2"
}
>
  Dashboard
</NavLink>



<NavLink
 to="/doctor/profile"
className={({ isActive }) =>
  isActive
    ? "block bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl mb-2 shadow-sm"
    : "block text-gray-600 dark:text-gray-300 font-medium px-6 py-3 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600 transition-all duration-300 mb-2"
}
>
  My Profile
</NavLink>



<NavLink
to="/doctor/patients"
className={({ isActive }) =>
  isActive
    ? "block bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl mb-2 shadow-sm"
    : "block text-gray-600 dark:text-gray-300 font-medium px-6 py-3 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600 transition-all duration-300 mb-2"
}
>
 Patients
</NavLink>

  

<NavLink
to="/doctor/employees"
className={({ isActive }) =>
  isActive
    ? "block bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl mb-2 shadow-sm"
    : "block text-gray-600 dark:text-gray-300 font-medium px-6 py-3 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600 transition-all duration-300 mb-2"
}
>
 Employees
</NavLink>


    <NavLink
to="/doctor/analysis-requests"
className={({ isActive }) =>
  isActive
    ? "block bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl mb-2 shadow-sm"
    : "block text-gray-600 dark:text-gray-300 font-medium px-6 py-3 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600 transition-all duration-300 mb-2"
}
>
Analysis Requests</NavLink>




    <NavLink
  to="/doctor/analysis-types"
 className={({ isActive }) =>
  isActive
    ? "block bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl mb-2 shadow-sm"
    : "block text-gray-600 dark:text-gray-300 font-medium px-6 py-3 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600 transition-all duration-300 mb-2"
}
>
  Analysis Types
</NavLink>
      
  <NavLink
to="/doctor/analysis-results"
className={({ isActive }) =>
  isActive
    ? "block bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl mb-2 shadow-sm"
    : "block text-gray-600 dark:text-gray-300 font-medium px-6 py-3 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600 transition-all duration-300 mb-2"
}
>
Analysis Results
</NavLink>

 

  <NavLink
  to="/doctor/invoices"
className={({ isActive }) =>
  isActive
    ? "block bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl mb-2 shadow-sm"
    : "block text-gray-600 dark:text-gray-300 font-medium px-6 py-3 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600 transition-all duration-300 mb-2"
}
>
Invoices
</NavLink>
      


         <NavLink
  to="/doctor/reports"
className={({ isActive }) =>
  isActive
    ? "block bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl mb-2 shadow-sm"
    : "block text-gray-600 dark:text-gray-300 font-medium px-6 py-3 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600 transition-all duration-300 mb-2"
}
>
Reports
</NavLink>

{/* <NavLink
  to="/doctor/requests"
  className={({ isActive }) =>
    isActive
      ? "bg-blue-600 text-white rounded-xl px-4 py-3 flex items-center gap-3"
      : "px-4 py-3 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl"
  }
>
  Requests
</NavLink> */}

         <NavLink
  to="/doctor/settings"
className={({ isActive }) =>
  isActive
    ? "block bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl mb-2 shadow-sm"
    : "block text-gray-600 dark:text-gray-300 font-medium px-6 py-3 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600 transition-all duration-300 mb-2"
}
>
Settings
</NavLink>
         
      </ul>

      </div>
    )
}
export default Sidebar;