import { useState } from "react";
import { Outlet } from "react-router-dom";

import EmployeeSidebar from "../components/EmployeeSidebar";
import EmployeeNavbar from "../components/EmployeeNavbar";

function EmployeeLayout() {
const [openSidebar, setOpenSidebar] = useState(false);

return ( <div className="flex min-h-screen overflow-x-hidden">


  {/* ================= SIDEBAR ================= */}

  <EmployeeSidebar
    openSidebar={openSidebar}
    setOpenSidebar={setOpenSidebar}
  />

  {/* ================= OVERLAY ================= */}

  {openSidebar && (
    <div
      onClick={() => setOpenSidebar(false)}
      className="
        fixed inset-0
        bg-black/40
        z-40
        lg:hidden
      "
    />
  )}

  {/* ================= MAIN ================= */}

  <div
    className="
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
    "
  >

    {/* ================= NAVBAR ================= */}

    <div className="sticky top-0 z-50">
      <EmployeeNavbar
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
      />
    </div>

    {/* ================= CONTENT ================= */}

    <main className="p-4 sm:p-6 lg:p-8">
      <Outlet />
    </main>

  </div>

</div>


);
}

export default EmployeeLayout;
