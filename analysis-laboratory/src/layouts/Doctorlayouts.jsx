import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import DoctorNavbar from "../components/DoctorNavbar";

function DoctorLayout() {
  const [openSidebar, setOpenSidebar] = useState(false);

 return (
  <div className="flex overflow-x-hidden">

    <Sidebar
      openSidebar={openSidebar}
      setOpenSidebar={setOpenSidebar}
    />

    <div className="flex-1 min-w-0 lg:ml-64 min-h-screen bg-gray-100 dark:bg-gray-900 overflow-x-hidden">

      <DoctorNavbar
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
      />

      <main className="px-3 py-6 bg-[#f6f8fb] dark:bg-[#111827] min-h-[calc(100vh-64px)]">
        <Outlet />
      </main>

    </div>

  </div>
);
}

export default DoctorLayout;