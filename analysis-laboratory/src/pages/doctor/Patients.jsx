import { useState, useEffect } from "react";
import { useLanguage } from "../../constants/Languageconstants";
import { translations } from "../../constants/translations";
import { getPatients, savePatients } from "../../data/patientStorage";
import {
  HiOutlineEye,
  HiOutlinePencilSquare,
  HiOutlineTrash,
} from "react-icons/hi2";
function Patients() {

const { language } = useLanguage();
const t = translations[language];

  const [search, setSearch] = useState("");
  console.log("After useState");
const initialPatients = [
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
  analyses: [
    "CBC",
    "Blood Sugar",
    "Vitamin D"
  ],
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
  analyses: [
    "Urine Test",
    "Liver Function"
  ],
},
]


const [patients, setPatients] = useState(() => {

  const savedPatients = getPatients();

  return savedPatients.length > 0
    ? savedPatients
    : initialPatients;
});
console.log(patients);
useEffect(() => {
  savePatients(patients);
}, [patients]);

// useEffect(() => {
//   localStorage.setItem("patients", JSON.stringify(patients));
//   alert("useEffect works");
// }, [patients]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
const [phone, setPhone] = useState("");
const [address, setAddress] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);

 const addPatient = () => {
  if (!name || !age) return;

  if (editingPatient) {
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

// const { language } = useLanguage();

  return (



<div className="p-6 sm:p-6 lg:p-8">
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-5">
    <p className="text-sm text-gray-500">
      Total Patients
    </p>

    <h2 className="text-3xl font-bold mt-2 text-gray-800 dark:text-white">
      {patients.length}
    </h2>

    <p className="text-sm text-green-500 mt-2">
      +12% this month
    </p>
  </div>


  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-5">
    <p className="text-sm text-gray-500">
      New Patients
    </p>

    <h2 className="text-3xl font-bold mt-2 text-gray-800 dark:text-white">
      2
    </h2>

    <p className="text-sm text-blue-500 mt-2">
      Today
    </p>
  </div>


  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-5">
    <p className="text-sm text-gray-500">
      Active Patients
    </p>

    <h2 className="text-3xl font-bold mt-2 text-gray-800 dark:text-white">
      8
    </h2>

    <p className="text-sm text-green-500 mt-2">
      Active Cases
    </p>
  </div>


  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-5">
    <p className="text-sm text-gray-500">
      Completed Tests
    </p>

    <h2 className="text-3xl font-bold mt-2 text-gray-800 dark:text-white">
      24
    </h2>

    <p className="text-sm text-purple-500 mt-2">
      This month
    </p>
  </div>


</div>
<div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">

  <div>
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
      Patients
    </h1>

    <p className="text-gray-500 mt-1">
      Manage and monitor all patients
    </p>
  </div>


  <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">


    <div className="relative w-full sm:w-72">

      <input
        className="
        w-full
        border
        dark:bg-gray-800
        dark:border-gray-700
        rounded-xl
        px-4
        py-2.5
        text-sm
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
        "
        placeholder="Search patient..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

    </div>


    <button
      onClick={() => {
        setEditingPatient(null);
        setName("");
        setAge("");
        setGender("");
        setPhone("");
        setShowModal(true);
      }}
      className="
      bg-blue-600
      hover:bg-blue-700
      text-white
      px-5
      py-2.5
      rounded-xl
      font-medium
      transition
      shadow-sm
      "
    >
      + Add Patient
    </button>


  </div>

</div>

      {/* TABLE CARD */}
<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 overflow-x-auto">
             {/* HEADER ROW */}
<div className="
grid 
grid-cols-[2fr_1fr_1fr_2fr_1fr_1fr]
bg-gray-50 
dark:bg-gray-700
rounded-xl
px-6
py-4
text-sm
font-semibold
text-gray-600
dark:text-gray-200
">

  <div>Name</div>
<div>Age</div>
<div>Gender</div>
<div>Phone</div>
<div>Status</div>

<div className="text-center">
  Actions
</div>

</div>

        {/* ROWS */}
       {filteredPatients.map((p) => (
        
  <div
  key={p.id}
  className="grid grid-cols-[2fr_1fr_1fr_2fr_1fr_1fr] items-center px-6 py-4 border-b border-gray-200 hover:bg-gray-50 transition"
>
  <div className="flex items-center gap-3">

  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">
    {p.name.charAt(0).toUpperCase()}
  </div>

  <div>
    <p className="font-semibold text-gray-800 dark:text-white">
      {p.name}
    </p>

    <p className="text-xs text-gray-500">
      {p.email}
    </p>
  </div>

</div>
    <div className="text-gray-800 dark:text-white">{p.age}</div>
    <div  className="text-gray-800 dark:text-white">{p.gender}</div>
    <div  className="text-gray-800 dark:text-white">{p.phone}</div>
{/* STATUS */}
<div>

<span
className={`
px-3 py-1 rounded-full text-xs font-medium
${
p.status === "Completed"
? "bg-green-100 text-green-700"
: p.status === "Pending"
? "bg-yellow-100 text-yellow-700"
: "bg-red-100 text-red-700"
}
`}
>
{p.status}
</span>

</div>
<div className="flex justify-center gap-2">
    <button
    onClick={() => viewPatient(p)}
className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition"  >
    <HiOutlineEye className="w-4 h-4 sm:w-5 sm:h-5" />
  </button>

  <button
    onClick={() => editPatient(p)}
className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded-lg transition"  >
    <HiOutlinePencilSquare className="w-4 h-4 sm:w-5 sm:h-5" />
  </button>

  <button
    onClick={() => deletePatient(p.id)}
className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition"  >
    <HiOutlineTrash className="w-4 h-4 sm:w-5 sm:h-5" />
  </button>
</div>
  </div>
))}
{filteredPatients.length === 0 && (
  <div className="
text-center
py-10
text-gray-500
">

<div className="text-4xl mb-3">
👥
</div>

<p className="font-medium">
No patients found
</p>

<p className="text-sm mt-1">
Try searching with another name
</p>

</div>
)}
      </div>

      {/* MODAL */}
      {showModal && (
<div className="
fixed
inset-0
bg-black/50
backdrop-blur-sm
flex
items-center
justify-center
z-50
">
<div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 sm:p-6 w-[95%] max-w-md">
            <h2 className="text-sm font-semibold mb-3">
              {t.addPatient}
            </h2>

            <input
              placeholder="Name"
              className="w-full mb-2 p-2 border rounded text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              placeholder="Age"
              className="w-full mb-3 p-2 border rounded text-sm"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />

                     <select
                       className="w-full mb-2 p-2 border rounded text-sm"

                     value={gender}
                     onChange={(e)=>setGender(e.target.value)}
                     >
                     <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                       <option value="Female">Female</option>
                      </select>

                          <input
                               placeholder="Phone Number"
                             className="w-full mb-3 p-2 border rounded text-sm"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              />

                              <input
  placeholder="Address"
  className="w-full mb-3 p-2 border rounded text-sm"
  value={address}
  onChange={(e) => setAddress(e.target.value)}
/>
            <div className="flex justify-end gap-2">

             <button
  onClick={() => setShowModal(false)}
  className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white rounded-xl transition"
>
  {t.cancel}
</button>

                <button
                onClick={addPatient}
                      className="px-3 py-1 text-sm bg-blue-600 text-white rounded"
                           >
                          {editingPatient ? "Update" : "save"}
                          </button>

            </div>

          </div>

        </div>

        
      )}

      {selectedPatient && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

<div className="
bg-white
dark:bg-gray-800
rounded-2xl
p-6
w-[95%]
max-w-4xl
max-h-[90vh]
overflow-y-auto
shadow-2xl
">
       <div className="mb-6">

<h2 className="text-2xl font-bold text-gray-900 dark:text-white">
  Patient Profile
</h2>

<p className="text-sm text-gray-500 mt-1">
  Complete medical and payment information
</p>

</div>


<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
<div className="
bg-gray-50
dark:bg-gray-700
rounded-2xl
p-5
shadow-sm
">
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
  👤 Patient Information
</h3>

<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
  <p className="text-gray-700 dark:text-gray-200">
  <strong>Name:</strong> {selectedPatient.name}
</p>
<p className="text-gray-700 dark:text-gray-200">
  <strong>Age:</strong> {selectedPatient.age}
</p>

    <p className="text-gray-700 dark:text-gray-200">
  <strong>Gender:</strong> {selectedPatient.gender}
</p>
      <p className="text-gray-700 dark:text-gray-200">
  <strong>Phone:</strong> {selectedPatient.phone}
</p>
          <p className="text-gray-700 dark:text-gray-200">
  <strong>Address:</strong> {selectedPatient.address}
</p>
          <p className="text-gray-700 dark:text-gray-200">
  <strong>Email:</strong> {selectedPatient.email}
</p>
          <p className="text-gray-700 dark:text-gray-200">
  <strong>Blood Type::</strong> {selectedPatient.bloodType}
</p>
  </div>
</div>

<div className="
bg-gray-50
dark:bg-gray-700
rounded-2xl
p-5
shadow-sm
mt-4
">
  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
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


 
<div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow-sm col-span-2">
<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
      🧪 Analysis List
  </h3>

<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {selectedPatient.analyses.map((analysis, index) => (
<div
 key={index}
 className="
 bg-white
 dark:bg-gray-800
 rounded-xl
 p-3
 shadow-sm
 border
 dark:border-gray-700
 "
>
 🧪 {analysis}
</div>
    ))}
  </div>
</div>

</div>
      <div className="flex justify-end mt-6">

        <button
          onClick={() => setSelectedPatient(null)}
className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl transition"        >
          {t.cancel}
        </button>

      </div>

    </div>

  </div>
)}

    </div>
    
  );
}

export default Patients;