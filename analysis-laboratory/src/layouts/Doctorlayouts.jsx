import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import DoctorNavbar from "../components/DoctorNavbar";

function DoctorLayout() {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="flex">

      <Sidebar
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
      />

      <div className="flex-1 lg:ml-64 min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-all duration-300">

        <div className="sticky top-0 z-50">
          <DoctorNavbar
            openSidebar={openSidebar}
            setOpenSidebar={setOpenSidebar}
          />
        </div>

       <div className="px-8 py-6 bg-[#f6f8fb] dark:bg-[#111827] min-h-screen">
  <Outlet />
</div>

      </div>

    </div>
  );
}

export default DoctorLayout;