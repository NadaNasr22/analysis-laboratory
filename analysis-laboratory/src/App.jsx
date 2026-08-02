import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import DoctorLayout from "./layouts/Doctorlayouts.jsx";
import DoctorDashboard from "./pages/doctor/Dashboard";
import Patients from "./pages/doctor/Patients";
import AnalysisRequests from "./pages/doctor/AnalysisRequests";
import Employees from "./pages/doctor/Employees";
import AddEmployee from "./pages/doctor/AddEmployee";
import DoctorProfile from "./pages/doctor/DoctorProfile";
import AnalysisTypes from "./pages/doctor/AnalysisTypes";
import Invoices from "./pages/doctor/Invoices";
import Reports from "./pages/doctor/Reports";
import Settings from "./pages/doctor/Settings";

import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import EmployeeLayout from "./layouts/EmployeeLayout";
import EmployeePatients from "./pages/employee/EmployeePatients";
import EmployeeAnalysisRequests from "./pages/employee/EmployeeAnalysisRequests";
import EmployeeInvoices from "./pages/employee/EmployeeInvoices";
import EmployeeResults from "./pages/employee/EmployeeResults";
import EmployeeEnterResult from "./pages/employee/EmployeeEnterResult";
import EmployeeSettings from "./pages/employee/EmployeeSettings";
import EmployeeProfile from "./pages/employee/EmployeeProfile";
import Logout from "./pages/employee/Logout";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Doctor */}
        <Route path="/doctor" element={<DoctorLayout />}>

          <Route path="employees" element={<Employees />} />
          <Route path="profile" element={<DoctorProfile />} />
          <Route path="employees/add" element={<AddEmployee />} />
          <Route path="dashboard" element={<DoctorDashboard />} />
          <Route path="patients" element={<Patients />} />
          <Route
            path="analysis-requests"
            element={<AnalysisRequests />}
          />
          <Route
            path="analysis-types"
            element={<AnalysisTypes />}
          />
          <Route path="invoices" element={<Invoices />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />

        </Route>

        {/* Employee */}
        <Route path="/employee" element={<EmployeeLayout />}>

          <Route
            path="dashboard"
            element={<EmployeeDashboard />}
          />

          <Route
            path="patients"
            element={<EmployeePatients />}
          />

          <Route
            path="analysis-requests"
            element={<EmployeeAnalysisRequests />}
          />

          <Route
            path="invoices"
            element={<EmployeeInvoices />}
          />

          <Route
            path="results"
            element={<EmployeeResults />}
          />

          <Route
            path="enter-result"
            element={<EmployeeEnterResult />}
          />

          <Route
            path="logout"
            element={<Logout />}
          />

<Route
  path="settings"
  element={<EmployeeSettings />}
/>
<Route
  path="profile"
  element={<EmployeeProfile />}
/>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;