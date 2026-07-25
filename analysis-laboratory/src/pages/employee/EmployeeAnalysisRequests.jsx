import { useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import {
  FaClipboardList,
  FaClock,
  FaCheckCircle,
  FaCalendarDay,
} from "react-icons/fa";
import { getResults, saveResults } from "../../data/resultStorage";
// import { useLocation } from "react-router-dom";
function EmployeeAnalysisRequests() {

const [search,setSearch] = useState("");

  const [requests, setRequests] = useState([
    
  {
    id: 1,
    patient: "Ahmed Ali",
    analysis: "CBC",
    doctor: "Dr. Nada",
    date: "2026-06-25",
    status: "Pending",
  },
  {
    id: 2,
    patient: "Sara Mohamed",
    analysis: "Blood Sugar",
    doctor: "Dr. Nada",
    date: "2026-06-24",
    status: "Completed",
  },
]);


const [patient, setPatient] = useState("");
const [analysis, setAnalysis] = useState("");
const [doctor, setDoctor] = useState("");
const [date, setDate] = useState("");
const [note, setNote] = useState("");
const [selectedRequest, setSelectedRequest] = useState(null);
const [editingRequest, setEditingRequest] = useState(null);
const [showModal, setShowModal] = useState(false);
const addRequest = () => {
  if (!patient || !analysis || !doctor || !date) return;

  if (editingRequest) {
    setRequests(
      requests.map((request) =>
        request.id === editingRequest.id
          ? {
              ...request,
              patient,
              analysis,
              doctor,
              date,
              note,
            }
          : request
      )
    );

    setEditingRequest(null);
  } else {
    setRequests([
      ...requests,
      {
        id: Date.now(),
        patient,
        analysis,
        doctor,
        date,
        note,
        status: "Pending",
      },
    ]);
  }

  setPatient("");
  setAnalysis("");
  setDoctor("");
  setDate("");
  setNote("");

  setShowModal(false);
};
const viewRequest = (request) => {
  setSelectedRequest(request);
};
const editRequest = (request) => {
  setEditingRequest(request);

  setPatient(request.patient);
  setAnalysis(request.analysis);
  setDoctor(request.doctor);
  setDate(request.date);
  setNote(request.note || "");

  setShowModal(true);
};

const deleteRequest = (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this request?"
  );


  if (confirmDelete) {
    setRequests(
      requests.filter((request) => request.id !== id)
    );
  }
};
const changeStatus = (id, status) => {

  const updatedRequests = requests.map((request) => {

    if (request.id === id) {

      if (status === "Completed") {

        const results = getResults();

        const exists = results.find(
          (item) => item.id === request.id
        );


        if (!exists) {

          saveResults([
            ...results,
            {
              id: request.id,
              patient: request.patient,
              analysis: request.analysis,
              doctor: request.doctor,
              date: request.date,
              status: "Completed",
            }
          ]);

        }

      }


      return {
        ...request,
        status,
      };

    }


    return request;

  });


  setRequests(updatedRequests);

};
const totalRequests = requests.length;

const pendingRequests = requests.filter(
  (request) => request.status === "Pending"
).length;
const completedRequests = requests.filter(
  (request) => request.status === "Completed"
).length;


const todayRequests = requests.filter(
  (request) =>
    request.date === new Date().toISOString().slice(0, 10)
).length;



const filteredRequests = requests.filter((request) =>
  request.patient.toLowerCase().includes(search.toLowerCase()) ||
  request.analysis.toLowerCase().includes(search.toLowerCase()) ||
  request.doctor.toLowerCase().includes(search.toLowerCase())
);


  return (
<div className="
p-4 sm:p-6
bg-gray-50 dark:bg-gray-900
min-h-screen
overflow-x-hidden
">      

     {/* HEADER */}
<div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-4"> 
   <h1 className="text-xl font-bold text-gray-700">
    🧪 Analysis Requests
  </h1>

  <button
    onClick={() => setShowModal(true)}
className="
bg-blue-600 
hover:bg-blue-700 
text-white 
px-5 
py-2.5 
rounded-xl
font-medium
shadow-sm
hover:shadow-md
transition-all
w-full sm:w-auto
"  >
    + New Request
  </button>

</div>
<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
<div className="bg-white dark:bg-gray-800
border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm
p-4 sm:p-5 flex justify-between items-center hover:shadow-lg transition">

  <div>
    <p className="text-gray-500 text-sm">
      Total Requests
    </p>

    <h2 className="text-3xl font-bold">
      {totalRequests}
    </h2>
  </div>

  <div className="bg-blue-500 p-3 rounded-full text-white">
    <FaClipboardList size={24} />
  </div>

</div>
<div className="bg-white dark:bg-gray-800
border border-gray-200 dark:border-gray-700
rounded-2xl
shadow-sm
p-4 sm:p-5 flex justify-between items-center hover:shadow-lg transition">

  <div>
    <p className="text-gray-500 text-sm">
     Pending
    </p>

    <h2 className="text-3xl font-bold">
  {pendingRequests}
      </h2>
  </div>

  <div className="bg-yellow-500 p-3 rounded-full text-white">
<FaClock size={24} />
  </div>

</div>


<div className="bg-white dark:bg-gray-800
border border-gray-200 dark:border-gray-700
rounded-2xl
shadow-sm
p-4 sm:p-5 flex justify-between items-center hover:shadow-lg transition">

  <div>
   <p className="text-gray-500 text-sm">
  Completed
</p>

<h2 className="text-3xl font-bold">
  {completedRequests}
</h2> 
  </div>

  <div className="bg-green-500 p-3 rounded-full text-white">
<FaCheckCircle size={24} />
  </div>

</div>
 

  



<div className="bg-white dark:bg-gray-800
border border-gray-200 dark:border-gray-700
rounded-2xl
shadow-sm
p-4 sm:p-5 flex justify-between items-center hover:shadow-lg transition">

  <div>
    <p className="text-gray-500 text-sm">
  Today
    </p>

    <h2 className="text-3xl font-bold">
      {todayRequests}
    </h2>
  </div>

  <div className="bg-indigo-500 p-3 rounded-full text-white">
<FaCalendarDay size={24} />
  </div>

</div>


</div>

      {/* ADD FORM */}
      
<div className="mb-5 mt-4">
    <input
    type="text"
    placeholder="🔍 Search by patient, analysis or doctor..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500
"  />
</div>
      {/* TABLE */}
<div className="mt-6 bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-sm overflow-x-auto">      
<div className="hidden lg:grid grid-cols-6 p-3 text-sm font-semibold">  
<div>Patient</div>
  <div>Analysis</div>
  <div>Doctor</div>
  <div>Date</div>
  <div>Status</div>
  <div className="text-right">Actions</div>
</div>
{filteredRequests.length === 0 && (
  <div className="text-center py-6 text-gray-500">
    No analysis requests found.
  </div>
)}
    {filteredRequests.map((r) => (
      
  <div
    key={r.id}
className="hidden lg:grid grid-cols-6 p-3 border-t text-sm items-center"  >
    <div>{r.patient}</div>

<div>{r.analysis}</div>
    <div>{r.doctor}</div>

    <div>{r.date}</div>

   <div>
 <select
  value={r.status}
  onChange={(e) => changeStatus(r.id, e.target.value)}
  className={`px-3 py-1 rounded-full text-white text-xs outline-none
    ${
      r.status === "Completed"
        ? "bg-green-500"
        : r.status === "Pending"
        ? "bg-yellow-500"
        : "bg-red-500"
    }`}
>
  <option value="Pending">Pending</option>
  <option value="Completed">Completed</option>
  <option value="Cancelled">Cancelled</option>
</select>
</div>

    <div className="flex justify-end gap-3">
  <button
    onClick={() => viewRequest(r)}
    className="text-blue-600 hover:text-blue-800 transition"
    title="View"
  >
    <FaEye size={18} />
  </button>

  <button
    onClick={() => editRequest(r)}
    className="text-green-600 hover:text-green-800 transition"
    title="Edit"
  >
    <FaEdit size={18} />
  </button>

  <button
    onClick={() => deleteRequest(r.id)}
    className="text-red-600 hover:text-red-800 transition"
    title="Delete"
  >
    <FaTrash size={18} />
  </button>
</div>
  </div>
))}


      </div>

      <div className="lg:hidden space-y-4 mt-4">

{filteredRequests.map((r)=>(
<div
key={r.id}
className="
bg-gray-50
dark:bg-gray-700
rounded-xl
p-4
space-y-2
"
>

<p>
<b>Patient:</b> {r.patient}
</p>

<p>
<b>Analysis:</b> {r.analysis}
</p>

<p>
<b>Doctor:</b> {r.doctor}
</p>

<p>
<b>Date:</b> {r.date}
</p>

<div>
<b>Status:</b>

<select
value={r.status}
onChange={(e)=>changeStatus(r.id,e.target.value)}
className="ml-2 px-3 py-1 rounded-full"
>
<option>Pending</option>
<option>Completed</option>
<option>Cancelled</option>
</select>

</div>


<div className="flex gap-4 pt-3">

<button className="text-blue-600">
<FaEye/>
</button>

<button className="text-green-600">
<FaEdit/>
</button>

<button className="text-red-600">
<FaTrash/>
</button>

</div>


</div>
))}

</div>
{showModal && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

    <div className="bg-white rounded-xl p-6 w-[450px] shadow-xl">

      <h2 className="text-xl font-bold mb-4">
  {editingRequest ? "Edit Analysis Request" : "New Analysis Request"}
</h2>
<input
  className="w-full border p-2 rounded mb-3"
  placeholder="Patient Name"
  value={patient}
  onChange={(e) => setPatient(e.target.value)}
/>

<select
  className="w-full border p-2 rounded mb-3"
  value={analysis}
  onChange={(e) => setAnalysis(e.target.value)}
>
  <option value="">Select Analysis</option>
  <option value="CBC">CBC</option>
  <option value="Blood Sugar">Blood Sugar</option>
  <option value="Urine Analysis">Urine Analysis</option>
  <option value="Liver Function">Liver Function</option>
  <option value="Kidney Function">Kidney Function</option>
  <option value="Vitamin D">Vitamin D</option>
  <option value="Thyroid Profile">Thyroid Profile</option>
</select>

<select
  className="w-full border p-2 rounded mb-3"
  value={doctor}
  onChange={(e) => setDoctor(e.target.value)}
>
  <option value="">Select Doctor</option>
  <option value="Dr. Nada">Dr. Nada</option>
  <option value="Dr. Ahmed">Dr. Ahmed</option>
  <option value="Dr. Sara">Dr. Sara</option>
  <option value="Dr. Mohamed">Dr. Mohamed</option>
</select>
<textarea
  className="w-full border p-2 rounded mb-3"
  rows={3}
  placeholder="Doctor Notes (Optional)"
  value={note}
  onChange={(e) => setNote(e.target.value)}
></textarea>
   <input
  type="date"
  className="w-full border p-2 rounded mb-4"
  value={date}
  onChange={(e) => setDate(e.target.value)}
/>

      <div className="flex justify-end gap-2">

        <button
          onClick={() => setShowModal(false)}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Cancel
        </button>

     <button
  onClick={addRequest}
  className="bg-blue-600 text-white px-4 py-2 rounded"
  
>
{editingRequest ? "Update" : "Save"}
</button>

      </div>

    </div>

  </div>
  
)}

{selectedRequest && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

<div className="
bg-white
dark:bg-gray-800
rounded-xl
p-5
w-[95%]
lg:w-[650px]
max-h-[90vh]
overflow-y-auto
shadow-xl
">
      <h2 className="text-2xl font-bold mb-5">
        Analysis Request Details
      </h2>

<div className="
grid
grid-cols-1
sm:grid-cols-2
gap-4
">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-3">👤 Patient</h3>

          <p><strong>Name:</strong> {selectedRequest.patient}</p>
          <p><strong>Doctor:</strong> {selectedRequest.doctor}</p>
          <p><strong>Date:</strong> {selectedRequest.date}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-3">🧪 Analysis</h3>

          <p><strong>Type:</strong> {selectedRequest.analysis}</p>

          <p><strong>Status:</strong> {selectedRequest.status}</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 col-span-2">
          <h3 className="font-semibold mb-3">
            📝 Doctor Notes
          </h3>

          <p>
            {selectedRequest.note || "No notes"}
          </p>
        </div>

      </div>

      <div className="flex justify-end mt-5">

        <button
          onClick={() => setSelectedRequest(null)}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>

      </div>

    </div>

  </div>
)}
    </div>
  );
}

export default EmployeeAnalysisRequests;