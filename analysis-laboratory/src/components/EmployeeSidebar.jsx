import { NavLink } from "react-router-dom";
// import { FaSignOutAlt } from "react-icons/fa";

function EmployeeSidebar({ openSidebar }) {

  const linkStyle = ({ isActive }) =>
    isActive
      ? "block bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl mb-2 shadow-sm"
      : "block text-gray-600 dark:text-gray-300 font-medium px-6 py-3 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600 transition-all duration-300 mb-2";


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

      {/* Logo */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">

        <h1 className="text-2xl font-bold text-blue-600">
          Future Laboratory
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Clinical Precision
        </p>

      </div>


      {/* Links */}
      <ul className="mt-6 flex-1 px-2">


        <NavLink
          to="/employee/dashboard"
          className={linkStyle}
        >
          Dashboard
        </NavLink>


        <NavLink
          to="/employee/patients"
          className={linkStyle}
        >
          Patients
        </NavLink>


        <NavLink
          to="/employee/analysis-requests"
          className={linkStyle}
        >
          Analysis Requests
        </NavLink>


        <NavLink
          to="/employee/invoices"
          className={linkStyle}
        >
          Invoices
        </NavLink>


        <NavLink
          to="/employee/results"
          className={linkStyle}
        >
          Results
        </NavLink>
<NavLink
 to="/employee/enter-result"

          className={linkStyle}
>

  Enter Result

</NavLink>

      </ul>


    </div>
  );
}

export default EmployeeSidebar;