import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRequests } from "../../data/analysisRequestsStorage";
import StatCard from "../../components/StatCard";
import { translations } from "../../constants/translations";
import { useLanguage } from "../../constants/useLanguage";
import {
  FaUsers,
  FaFlask,
  FaMoneyBillWave,
  FaFileAlt,
  FaUserPlus,
  FaFileInvoice,
  FaFileMedical,
  FaEye,
  FaEdit,
} from "react-icons/fa";

function DoctorDashboard() {

const { language } = useLanguage();
const t = translations[language];

const recentRequests = getRequests().slice(-5).reverse();

const navigate = useNavigate();

const [selectedRequest, setSelectedRequest] = useState(null);
const [showViewModal, setShowViewModal] = useState(false);
const [showEditModal, setShowEditModal] = useState(false);
const [editingRequest, setEditingRequest] = useState(null);

const getStatusStyle = (status) => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-700";

    case "Processing":
      return "bg-blue-100 text-blue-700";

    case "Urgent":
      return "bg-red-100 text-red-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
};
const saveEditedRequest = () => {
  const allRequests = getRequests();

  const updatedRequests = allRequests.map((item) =>
    item.id === editingRequest.id ? editingRequest : item
  );

  saveRequests(updatedRequests);

  setRecentRequests(
    updatedRequests.slice(-5).reverse()
  );

  setShowEditModal(false);
};


const translateAnalysis = (name) => {
  return t.analysisNames?.[name] || name;
};
const translateStatus = (status) => {
  const statusMap = {
    Pending: t.pending,
    Completed: t.completed,
    Cancelled: t.cancelled,
    Processing: t.processing,
    Urgent: t.urgent,
    Critical: t.critical,
  };

  return statusMap[status] || status;
};
 return (
<div className="space-y-6 p-3 sm:p-5 lg:p-6 pt-20 sm:pt-22 lg:pt-24 bg-gray-50 dark:bg-gray-900 min-h-screen overflow-x-hidden">
<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
  <div>
    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
     {t.goodMorning} 
    </h1>

    <p className="text-gray-500 mt-1">
{t.overview}    </p>
  </div>

  <div className="flex flex-col sm:flex-row gap-3 mt-5 lg:mt-0">

   <button
  onClick={() => navigate("/doctor/patients")}
  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-medium transition"
>
  + {t.addPatient}

</button>

   <button
  onClick={() => navigate("/doctor/analysis-requests")}
  className="bg-blue-600 text-white px-6 py-3 rounded-xl"
>
+ {t.newRequest}
</button>

  </div>

</div>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">  
 <StatCard
title={t.todayPatients}
  value="120"
info="+12%"
  icon={<FaUsers size={24} />}
  color="bg-blue-500"
/>

<StatCard
  title={t.pendingTests}
  value="25"
info="+5%"
  icon={<FaFlask size={24} />}
  color="bg-emerald-500"
/>

<StatCard
  title={t.todayRevenue}
value="4,500 EGP"
info="+8%"
  icon={<FaMoneyBillWave size={24} />}
  color="bg-amber-500"
/>

<StatCard
  title={t.completedReports}
 value="95"
info="+16%"
  icon={<FaFileAlt size={24} />}
  color="bg-rose-500"
/>
</div>

{/* Main Content */}
<div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mt-6">
  {/* Left Side */}
<div className="xl:col-span-8">
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">

      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
{t.recentRequests}
        </h2>

        <button
  onClick={() => navigate("/doctor/analysis-requests")}
  className="text-blue-600 text-sm font-semibold hover:underline"
>
{t.viewAll}
</button>
      </div>

<div className="hidden lg:block overflow-x-auto">
    <table className="w-full">

    <thead className="text-gray-500 text-sm border-b">
      <tr>
        <th className="text-left py-3 w-[40%]">{t.patients}</th>
        <th className="text-left w-[20%]">{t.analysis}</th>
        <th className="text-left w-[18%]">{t.status}</th>
        <th className="text-left w-[15%]">{t.date}</th>
        <th className="text-center w-[7%]">{t.actions}</th>
      </tr>
    </thead>

    <tbody>
      {recentRequests.map((request) => (
        <tr
          key={request.id}
          className="border-b border-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
        >
          <td className="py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">
{request.patient?.name?.charAt(0)}
              </div>

              <div>
                <p className="font-semibold text-gray-800 dark:text-white">
{request.patient?.name}
                </p>

                <p className="text-xs text-gray-500">
#{request.id}
                </p>
              </div>
            </div>
          </td>

<td>
  {request.tests?.length > 0
    ? request.tests.map(test => test.short || test.name).join(", ")
    : "No Analysis"}
</td>
          <td>
         <span
  className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
    request.status
  )}`}
>
 {translateStatus(request.status)}
</span>
          </td>

          <td>{request.date}</td>

          <td>
            <div className="flex justify-center gap-3">
           <FaEye
  onClick={() => {
    setSelectedRequest(request);
    setShowViewModal(true);
  }}
  className="cursor-pointer text-blue-600 hover:scale-110 transition"
/>
<FaEdit
  onClick={() => {
    setEditingRequest({ ...request });
    setShowEditModal(true);
  }}
  className="cursor-pointer text-green-600 hover:scale-110 transition"
/>            </div>
          </td>
        </tr>
      ))}
    </tbody>

  </table>
</div>
<div className="lg:hidden space-y-4">
  {recentRequests.map((request)=>(
    <div
      key={request.id}
      className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 space-y-3"
    >

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
          {request.patient?.name?.charAt(0)}
        </div>

        <div>
          <p className="font-semibold dark:text-white">
            {request.patient?.name}
          </p>
          <p className="text-xs text-gray-500">
            #{request.id}
          </p>
        </div>
      </div>


      <p className="text-sm dark:text-white">
        Tests:
{request.tests
  ?.map(test => translateAnalysis(test.name || test.short))
  .join(", ")}      </p>


      <span className={`px-3 py-1 rounded-full text-xs ${getStatusStyle(request.status)}`}>
        {request.status}
      </span>


      <div className="flex justify-between items-center">
        <span className="text-sm">
          {request.date}
        </span>

        <div className="flex gap-3">
          <FaEye className="text-blue-600"/>
          <FaEdit className="text-green-600"/>
        </div>
      </div>

    </div>
  ))}
</div>

    </div>

  </div>

  {/* Right Side */}

<div className="xl:col-span-4 space-y-6">
<div className="bg-white dark:bg-gray-800 dark:border-gray-700 rounded-2xl border p-5">
      <h2 className="font-bold text-lg mb-4">
{t.quickActions}
      </h2>

      <div className="space-y-3">

 <button className="w-full flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700 transition">

  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
    <FaUserPlus className="text-blue-600 text-lg" />
  </div>

  <div className="text-left">
    <p className="font-semibold text-gray-800 dark:text-white">
  {t.addPatientAction}
    </p>

    <p className="text-xs text-gray-500 dark:text-gray-400">
  {t.registerPatientProfile}
    </p>
  </div>

</button>

  <button className="w-full flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700 transition">

  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
    <FaFileInvoice className="text-green-600 text-lg" />
  </div>

  <div className="text-left">
    <p className="font-semibold text-gray-800 dark:text-white">
  {t.createInvoice}
    </p>

    <p className="text-xs text-gray-500 dark:text-gray-400">
  {t.generateBillingDetails}
    </p>
  </div>

</button>

       <button className="w-full flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700 transition">

  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
    <FaFileMedical className="text-purple-600 text-lg" />
  </div>

  <div className="text-left">
    <p className="font-semibold text-gray-800 dark:text-white">
  {t.uploadResult}
    </p>

    <p className="text-xs text-gray-500 dark:text-gray-400">
  {t.importAnalysisData}
    </p>
  </div>

</button>

 <button className="w-full flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700 transition">

  <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
    <FaFlask className="text-orange-500 text-lg" />
  </div>

  <div className="text-left">
    <p className="font-semibold text-gray-800 dark:text-white">
  {t.manageTests}
    </p>

    <p className="text-xs text-gray-500 dark:text-gray-400">
  {t.configureLabParameters}
    </p>
  </div>

</button>

      </div>

    </div>

    <div className="rounded-2xl p-6 text-white bg-gradient-to-r from-blue-600 to-indigo-600">

      <h3 className="text-xl font-bold">
  {t.precisionAnalytics}
      </h3>

      <p className="text-sm mt-2 opacity-90">
  {t.aiLaboratoryInsights}
      </p>

      <button className="mt-5 bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold">
  {t.upgradeNow}
      </button>

    </div>

  </div>

</div>
{showViewModal && selectedRequest && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-[95%] max-w-xl p-5 sm:p-8">
      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Analysis Request Details
        </h2>

        <button
          onClick={() => setShowViewModal(false)}
          className="text-2xl text-gray-500 hover:text-red-500"
        >
          ×
        </button>

      </div>

      <div className="space-y-5">

        <div>
          <p className="text-gray-500 text-sm">Patient</p>
          <h3 className="font-semibold text-lg dark:text-white">
            {selectedRequest.patient?.name || selectedRequest.patient}
          </h3>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Priority</p>
          <h3 className="font-semibold dark:text-white">
            {selectedRequest.priority}
          </h3>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Status</p>

          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
            {selectedRequest.status}
          </span>
        </div>

        <div>
          <p className="text-gray-500 text-sm mb-2">
            Requested Tests
          </p>

          <div className="space-y-2">

            {selectedRequest.tests?.map((test) => (
              <div
                key={test.id}
                className="flex justify-between border rounded-xl p-3"
              >
                <span>{test.name}</span>

                <span className="font-semibold">
                  ${test.price}
                </span>
              </div>
            ))}

          </div>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Clinical Notes</p>

          <div className="border rounded-xl p-4 mt-2 min-h-[80px] dark:text-white">
            {selectedRequest.note || "No Notes"}
          </div>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Date</p>

          <h3 className="dark:text-white">
            {selectedRequest.date}
          </h3>
        </div>

      </div>

      <div className="flex justify-end mt-8">

        <button
          onClick={() => setShowViewModal(false)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
        >
          Close
        </button>

      </div>

    </div>

  </div>
)}

{showEditModal && editingRequest && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-[95%] max-w-lg p-5 sm:p-8">
      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold dark:text-white">
          Edit Request
        </h2>

        <button
          onClick={() => setShowEditModal(false)}
          className="text-2xl text-gray-500 hover:text-red-500"
        >
          ×
        </button>

      </div>

      <div className="space-y-5">

        <div>
          <label className="block mb-2 font-medium dark:text-white">
            Priority
          </label>

          <select
            value={editingRequest.priority}
            onChange={(e) =>
              setEditingRequest({
                ...editingRequest,
                priority: e.target.value,
              })
            }
            className="w-full border rounded-xl p-3 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
          >
            <option>Normal</option>
            <option>Urgent</option>
            <option>Critical</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium dark:text-white">
            Status
          </label>

          <select
            value={editingRequest.status}
            onChange={(e) =>
              setEditingRequest({
                ...editingRequest,
                status: e.target.value,
              })
            }
            className="w-full border rounded-xl p-3 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
          >
            <option>Pending</option>
            <option>Processing</option>
            <option>Completed</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium dark:text-white">
            Clinical Notes
          </label>

          <textarea
            rows={5}
            value={editingRequest.note}
            onChange={(e) =>
              setEditingRequest({
                ...editingRequest,
                note: e.target.value,
              })
            }
            className="w-full border rounded-xl p-3 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
          />
        </div>

      </div>

      <div className="flex justify-end gap-3 mt-8">

        <button
          onClick={() => setShowEditModal(false)}
          className="border px-5 py-3 rounded-xl"
        >
          Cancel
        </button>

        <button
          onClick={saveEditedRequest}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
        >
          Save Changes
        </button>

      </div>

    </div>

  </div>
)}
</div>
  );
}

export default DoctorDashboard;