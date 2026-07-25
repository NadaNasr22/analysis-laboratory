import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { getPatients, savePatients } from "../../data/patientStorage";
function EmployeePatients() {
  const [search, setSearch] = useState("");
const location = useLocation();
const [showModal, setShowModal] = useState(false);
useEffect(() => {
  if (location.state?.openAddModal) {
    setTimeout(() => {
      setShowModal(true);
    }, 0);
  }
}, [location.state]);
const defaultPatients = [
  {
    id: 1,
    name: "Ahmed Ali",
    age: 30,
    gender: "Male",
    address: "Cairo",
    phone: "01012345678",
    email: "ahmed@gmail.com",
    bloodType: "O+",
    total: 500,
    paid: 300,
    status: "Pending",
    analyses: ["CBC", "Blood Sugar", "Vitamin D"],
  },
  {
    id: 2,
    name: "Sara Mohamed",
    age: 25,
    gender: "Female",
    address: "Mansoura",
    phone: "01198765432",
    email: "sara@gmail.com",
    bloodType: "A+",
    total: 800,
    paid: 800,
    status: "Completed",
    analyses: ["Urine Test", "Liver Function"],
  },
];

const [patients, setPatients] = useState(() => {
  const savedPatients = getPatients();

  return savedPatients.length > 0
    ? savedPatients
    : defaultPatients;
});
useEffect(() => {
  savePatients(patients);
}, [patients]);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
const [phone, setPhone] = useState("");
const [address, setAddress] = useState("");
  const [editingPatient, setEditingPatient] = useState(null);

 const addPatient = () => {
  if (!name || !age) return;

  if (editingPatient) {
    // تعديل
    setPatients(
     patients.map((patient) =>
  patient.id === editingPatient.id
    ? {
        ...patient,
        name,
        age,
        gender,
        phone,
        address,
      }
    : patient
)
    );

    setEditingPatient(null);
  } else {
    // إضافة
  setPatients([
  ...patients,
  {
    id: Date.now(),
    name,
    age,
    gender,
    phone,
  },
]);
  }

 setName("");
setAge("");
setGender("");
setPhone("");
setAddress("");
  setShowModal(false);
};;

const deletePatient = (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this patient?"
  );

  if (confirmDelete) {
    setPatients(patients.filter((patient) => patient.id !== id));
  }
};

const editPatient = (patient) => {
  setEditingPatient(patient);
  setName(patient.name);
  setAge(patient.age);
  setGender(patient.gender);
setPhone(patient.phone);
setAddress(patient.address);
  setShowModal(true);
};
const [selectedPatient, setSelectedPatient] = useState(null);
const filteredPatients = patients.filter((patient) =>
  patient.name.toLowerCase().includes(search.toLowerCase())
)
const viewPatient = (patient) => {
  setSelectedPatient(patient);
};

  return (



<div className="p-4 sm:p-6 lg:p-10 bg-gray-50 min-h-screen overflow-x-hidden">
<div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
  <div className="bg-white p-3 rounded shadow text-center">
    <p className="text-xs text-gray-500">Total</p>
    <p className="text-lg font-bold">{patients.length}</p>
  </div>

  <div className="bg-white p-3 rounded shadow text-center">
    <p className="text-xs text-gray-500">New</p>
    <p className="text-lg font-bold">2</p>
  </div>

  <div className="bg-white p-3 rounded shadow text-center">
    <p className="text-xs text-gray-500">Active</p>
    <p className="text-lg font-bold">--</p>
  </div>

</div>
<input
  className="w-full mb-3 p-2 border rounded text-sm"
  placeholder="Search patient by name..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>
      {/* HEADER */}
<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
          <h1 className="text-xl font-semibold text-gray-700">
Patient Records
        </h1>

      <button
 onClick={() => {
  setEditingPatient(null);
  setName("");
  setAge("");
  setGender("");
  setPhone("");
  setShowModal(true);
}}
className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm w-full sm:w-auto">
  + Add Patient
</button>
      </div>

      {/* TABLE CARD */}
<div className="mt-6 bg-white p-4 sm:p-6 rounded-xl shadow overflow-x-auto">
        {/* HEADER ROW */}
<div className="hidden sm:grid grid-cols-5 text-xs text-gray-600 font-medium px-4 py-2">
    <div>Name</div>
  <div>Age</div>
  <div>Gender</div>
  <div>Phone</div>
  <div className="text-right">Actions</div>
</div>

        {/* ROWS */}
       {filteredPatients.map((p) => (
        
  <div
    key={p.id}
className="grid grid-cols-1 sm:grid-cols-5 gap-2 sm:gap-0 px-4 py-3 text-sm border-t hover:bg-gray-50"  >
    <div className="text-gray-800">{p.name}</div>
    <div className="text-gray-600">{p.age}</div>
    <div>{p.gender}</div>
    <div>{p.phone}</div>

<div className="flex justify-end gap-3">
  <button
    onClick={() => viewPatient(p)}
    className="text-blue-600 hover:text-blue-800 transition"
    title="View"
  >
    <FaEye size={18} />
  </button>

  <button
    onClick={() => editPatient(p)}
    className="text-green-600 hover:text-green-800 transition"
    title="Edit"
  >
    <FaEdit size={18} />
  </button>

  <button
    onClick={() => deletePatient(p.id)}
    className="text-red-600 hover:text-red-800 transition"
    title="Delete"
  >
    <FaTrash size={18} />
  </button>
</div>
</div>
))}
{filteredPatients.length === 0 && (
  <div className="text-center py-6 text-gray-500">
    No patients found.
  </div>
)}
      </div>

      {/* MODAL */}
      {showModal && (
<div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
<div className="bg-white rounded-xl shadow-xl p-5 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Add Patient
            </h2>

            <input
              placeholder="Name"
              className="w-full mb-2.5 px-3 py-2.5 rounded-lg border border-gray-300 
    focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              placeholder="Age"
              className="w-full mb-2.5 px-3 py-2.5 rounded-lg border border-gray-300 
    focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />

                     <select
                       className="w-full mb-2.5 px-3 py-2.5 rounded-lg border border-gray-300
    focus:outline-none focus:ring-2 focus:ring-blue-500"

                     value={gender}
                     onChange={(e)=>setGender(e.target.value)}
                     >
                     <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                       <option value="Female">Female</option>
                      </select>

                          <input
                               placeholder="Phone Number"
                             className="w-full mb-2.5 px-3 py-2.5 rounded-lg border border-gray-300"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              />

                              <input
  placeholder="Address"
  className="w-full mb-4 px-3 py-2.5 rounded-lg border border-gray-300"
  value={address}
  onChange={(e) => setAddress(e.target.value)}
/>
            <div className="flex justify-end gap-2">

              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
              >
                Cancel
              </button>

                <button
                onClick={addPatient}
                      className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                           >
                          {editingPatient ? "Update" : "Save"}
                          </button>

            </div>

          </div>

        </div>

        
      )}

      {selectedPatient && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

<div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto shadow-xl">      <h2 className="text-2xl font-bold mb-5">
        Patient Details
      </h2>


<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
  <h3 className="text-lg font-semibold mb-3">
    👤 Patient Information
  </h3>

  <div className="space-y-2  ">
    <p><strong>Name:</strong> {selectedPatient.name}</p>
    <p><strong>Age:</strong> {selectedPatient.age}</p>
    <p><strong>Gender:</strong> {selectedPatient.gender}</p>
    <p><strong>Phone:</strong> {selectedPatient.phone}</p>
    <p><strong>Address:</strong> {selectedPatient.address}</p>
    <p><strong>Email:</strong> {selectedPatient.email}</p>
    <p><strong>Blood Type:</strong> {selectedPatient.bloodType}</p>
  </div>
</div>

 <div className="bg-gray-50 rounded-lg p-4 shadow-sm mt-4">
  <h3 className="text-lg font-semibold mb-3">
    💰 Payment Information
  </h3>

  <div className="space-y-2">
    <p><strong>Total:</strong> {selectedPatient.total} EGP</p>
    <p><strong>Paid:</strong> {selectedPatient.paid} EGP</p>
    <p>
      <strong>Remaining:</strong>{" "}
      {selectedPatient.total - selectedPatient.paid} EGP
    </p>

   <div className="flex items-center gap-3">
  <strong>📋 Status:</strong>

  <span
    className={`px-3 py-1 rounded-full text-white text-sm
      ${
        selectedPatient.status === "Completed"
          ? "bg-green-500"
          : selectedPatient.status === "Pending"
          ? "bg-yellow-500"
          : "bg-red-500"
      }`}
  >
    {selectedPatient.status}
  </span>
</div> 
  </div>
</div>


 
<div className="bg-gray-50 rounded-lg p-4 shadow-sm col-span-2">
    <h3 className="text-lg font-semibold mb-3">
    🧪 Analysis List
  </h3>

  <ul className="list-disc ml-5 space-y-2">
    {selectedPatient.analyses.map((analysis, index) => (
      <li key={index}>{analysis}</li>
    ))}
  </ul>
</div>

</div>
      <div className="flex justify-end mt-6">

        <button
          onClick={() => setSelectedPatient(null)}
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

export default EmployeePatients;