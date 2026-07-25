import { Outlet } from "react-router-dom";
import EmployeeSidebar from "../components/EmployeeSidebar";
import EmployeeNavbar from "../components/EmployeeNavbar";

function EmployeeLayout() {
  return (
    <div className="flex min-h-screen overflow-x-hidden">

      <EmployeeSidebar />

      <div className="
      flex-1
      lg:ml-64
      min-h-screen
      bg-gray-100
      dark:bg-gray-900
      text-gray-900
      dark:text-white
      transition-all
      duration-300
      overflow-x-hidden
      ">

        <div className="sticky top-0 z-50">
          <EmployeeNavbar />
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>

      </div>

    </div>
  );
}

export default EmployeeLayout;