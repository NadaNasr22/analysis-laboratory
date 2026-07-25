import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {getRequests,saveRequests,} from "../../data/analysisRequestsStorage";
import { useLanguage } from "../../constants/Languageconstants";
import { translations } from "../../constants/translations";
// import { getPatients } from "../../data/patientsStorage";
function AnalysisRequests() {
 const { language } = useLanguage();
const navigate = useNavigate();
const [requests, setRequests] = useState(getRequests());
const [step, setStep] = useState(1);
const [currentPage, setCurrentPage] = useState(1);

const requestsPerPage = 5;
const indexOfLast = currentPage * requestsPerPage;
const indexOfFirst = indexOfLast - requestsPerPage;

const currentRequests = requests.slice(
  indexOfFirst,
  indexOfLast
);
const totalPages = Math.ceil(
  requests.length / requestsPerPage
);

const [selectedTests, setSelectedTests] = useState([]);

const [priority, setPriority] = useState("Normal");

const [note, setNote] = useState("");

const [patients, setPatients] = useState([
  {
    id: 1,
    name: "Jonathan Doe",
    gender: "Male",
    age: 42,
  },
  {
    id: 2,
    name: "Sara Wright",
    gender: "Female",
    age: 31,
  },
  {
    id: 3,
    name: "Hassan Ahmed",
    gender: "Male",
    age: 45,
  },
]);

const analysisList = [
  {
    id: 1,
    short: "CBC",
    name: "Complete Blood Count",
    category: "Hematology",
    price: 20,
  },
  {
    id: 2,
    short: "LFT",
    name: "Liver Function Test",
    category: "Chemistry",
    price: 35,
  },
  {
    id: 3,
    short: "KFT",
    name: "Kidney Function Test",
    category: "Chemistry",
    price: 30,
  },
  {
    id: 4,
    short: "PCR",
    name: "PCR Test",
    category: "Microbiology",
    price: 45,
  },
  {
    id: 5,
    short: "HbA1c",
    name: "Diabetes Test",
    category: "Diabetes",
    price: 28,
  },
];


const [selectedPatient, setSelectedPatient] = useState(null);
const [showPatientModal, setShowPatientModal] = useState(false);

const [newPatientName, setNewPatientName] = useState("");
const [newPatientAge, setNewPatientAge] = useState("");
const [newPatientGender, setNewPatientGender] = useState("Male");
const [newPatientPhone, setNewPatientPhone] = useState("");
const addNewPatient = () => {
  if (!newPatientName || !newPatientAge) return;

  const patient = {
    id: Date.now(),
    name: newPatientName,
    age: Number(newPatientAge),
    gender: newPatientGender,
    phone: newPatientPhone,
  };

  setPatients([...patients, patient]);

  setSelectedPatient(patient);

  setNewPatientName("");
  setNewPatientAge("");
  setNewPatientGender("Male");
  setNewPatientPhone("");

  setShowPatientModal(false);
};


const toggleTest = (test) => {
  const exists = selectedTests.find((item) => item.id === test.id);

  if (exists) {
    setSelectedTests(
      selectedTests.filter((item) => item.id !== test.id)
    );
  } else {
    setSelectedTests([...selectedTests, test]);
  }
};

const createRequest = () => {

  const newRequest = {
    id: Date.now(),
    patient: selectedPatient,
    tests: selectedTests,
    priority,
    note,
    status: "Pending",
    date: new Date().toLocaleDateString(),
  };


  const updatedRequests = [
    ...requests,
    newRequest
  ];


  saveRequests(updatedRequests);
  setRequests(updatedRequests);


  setStep(4);
};


const completeRequest = (id) => {

  const updatedRequests = requests.map((req)=>{

    if(req.id === id){

      const oldResults = getResults();

      const exists = oldResults.find(
        result => result.id === req.id
      );


      if(!exists){

        const newResult = {
          id: req.id,
          patient: req.patient,
          tests: req.tests,
          date: req.date,
          status: "Completed",
        };


        saveResults([
          ...oldResults,
          newResult
        ]);

      }


      return {
        ...req,
        status:"Completed"
      };

    }


    return req;

  });


  setRequests(updatedRequests);
  saveRequests(updatedRequests);

};
  return (
<div className="p-6">
{step === 1 && (
<>
    {/* Header */}
<div className="mb-8">

  <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
    Analysis Request
  </h1>

  <p className="text-gray-500 mt-2">
    Configure and manage new analysis tests with clinical precision.
  </p>

</div>
{/* Steps */}

<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">

  <div className="grid grid-cols-4 gap-4">

    <div>
  <p
    className={`text-sm font-semibold ${
      step === 1 ? "text-blue-600" : "text-gray-400"
    }`}
  >
    Patient Selection
  </p>

  <div
    className={`h-1 rounded-full mt-3 ${
      step >= 1 ? "bg-blue-600" : "bg-gray-200"
    }`}
  ></div>
</div>

    <div>
  <p
    className={`text-sm font-semibold ${
      step === 2 ? "text-blue-600" : "text-gray-400"
    }`}
  >
    Test Panel
  </p>

  <div
    className={`h-1 rounded-full mt-3 ${
      step >= 2 ? "bg-blue-600" : "bg-gray-200"
    }`}
  ></div>
</div>

   <div>
  <p
    className={`text-sm font-semibold ${
      step === 3 ? "text-blue-600" : "text-gray-400"
    }`}
  >
    Results Review
  </p>

  <div
    className={`h-1 rounded-full mt-3 ${
      step >= 3 ? "bg-blue-600" : "bg-gray-200"
    }`}
  ></div>
</div>

    <div>
  <p
    className={`text-sm font-semibold ${
      step === 4 ? "text-blue-600" : "text-gray-400"
    }`}
  >
    Complete
  </p>

  <div
    className={`h-1 rounded-full mt-3 ${
      step >= 4 ? "bg-blue-600" : "bg-gray-200"
    }`}
  ></div>
</div>

</div>
<div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">

<h2 className="text-xl font-bold text-gray-800 dark:text-white">
Select Patient
</h2>

<p className="text-gray-500 text-sm mt-1">
Search the database for an existing patient or add a new entry.
</p>
<div className="flex flex-col md:flex-row gap-4 mt-6">

  <input
    type="text"
    placeholder="Search patient..."
    className="flex-1 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 bg-white dark:bg-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
  />

 <button
  onClick={() => setShowPatientModal(true)}
  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition"
>
  + New Patient
</button>

</div>
</div>
<div className="space-y-3 mt-6">

  {patients.map((patient) => (

 <div
  key={patient.id}
  onClick={() => setSelectedPatient(patient)}
  className={`flex justify-between items-center p-4 rounded-xl border transition cursor-pointer
  ${
    selectedPatient?.id === patient.id
      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
      : "border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700"
  }`}
>

      <div className="flex items-center gap-4">

        <div
          className={`w-11 h-11 rounded-full flex items-center justify-center font-bold
          ${
selectedPatient?.id === patient.id
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {patient.name.charAt(0)}
        </div>

        <div>

          <h3 className="font-semibold text-gray-800 dark:text-white">
            {patient.name}
          </h3>

          <p className="text-sm text-gray-500">
            {patient.gender} • {patient.age} Years
          </p>

        </div>

      </div>

      <div className="text-gray-400 text-xl">
        ›
      </div>

    </div>

  ))}

</div>

<div className="flex justify-end mt-8">
  <button
    onClick={() => {
      if (!selectedPatient) {
        alert("Please select a patient first");
        return;
      }

      setStep(2);
    }}
    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl"
  >
    Next Step →
  </button>
</div>

</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">

  <div className="bg-green-50 border border-green-100 rounded-2xl p-5">
    <div className="w-12 h-12 rounded-xl bg-green-600 text-white flex items-center justify-center mb-4">
      ✓
    </div>

    <h3 className="font-bold text-gray-800">
      Lab Certified
    </h3>

    <p className="text-sm text-gray-500 mt-2">
      All laboratory procedures comply with international quality standards.
    </p>
  </div>

  <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
    <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-4">
      ⚡
    </div>

    <h3 className="font-bold text-gray-800">
      Fast Track Service
    </h3>

    <p className="text-sm text-gray-500 mt-2">
      Priority processing for urgent medical requests.
    </p>
  </div>

  <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
    <div className="w-12 h-12 rounded-xl bg-gray-700 text-white flex items-center justify-center mb-4">
      💬
    </div>

    <h3 className="font-bold text-gray-800">
      Lab Support
    </h3>

    <p className="text-sm text-gray-500 mt-2">
      Contact our team if you need help with patient requests.
    </p>
  </div>

</div>
</>
)}
{step === 2 && (

<div className="grid grid-cols-12 gap-6">

  {/* Left Side */}
  <div className="col-span-12 xl:col-span-8">

    <h2 className="text-2xl font-bold mb-6 dark:text-white">
      Select Analysis Tests
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

      {analysisList.map((test) => {

        const selected = selectedTests.some(
          (item) => item.id === test.id
        );

        return (

          <div
            key={test.id}
            onClick={() => toggleTest(test)}
            className={`rounded-2xl border p-5 cursor-pointer transition
            ${
              selected
                ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                : "border-gray-200 hover:border-blue-400 dark:border-gray-700"
            }`}
          >

            <div className="flex justify-between">

              <div>

                <h3 className="font-bold dark:text-white">
                  {test.short}
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  {test.name}
                </p>

              </div>

              {selected && (
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                  ✓
                </div>
              )}

            </div>

            <div className="mt-6 flex justify-between">

              <span className="text-gray-500">
                {test.category}
              </span>

              <span className="font-bold text-blue-600">
                ${test.price}
              </span>

            </div>

          </div>

        );

      })}

    </div>

  </div>

  {/* Right Side */}
  <div className="col-span-12 xl:col-span-4">

    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sticky top-5">

      <h2 className="text-xl font-bold dark:text-white">
        Selected Tests
      </h2>

      <p className="text-sm text-gray-500 mt-1">
        {selectedTests.length} Test Selected
      </p>

      <div className="space-y-3 mt-6">

        {selectedTests.length === 0 ? (

          <div className="text-center py-8 text-gray-400">
            No tests selected
          </div>

        ) : (

          selectedTests.map((test) => (

            <div
              key={test.id}
              className="flex justify-between items-center border rounded-xl p-4 dark:border-gray-700"
            >

              <div>

                <h4 className="font-semibold dark:text-white">
                  {test.short}
                </h4>

                <p className="text-xs text-gray-500">
                  {test.name}
                </p>

              </div>

              <span className="font-bold text-blue-600">
                ${test.price}
              </span>

            </div>

          ))

        )}

      </div>

      <div className="border-t mt-6 pt-6 dark:border-gray-700">

        <div className="flex justify-between text-lg font-bold dark:text-white">

          <span>Total</span>

          <span className="text-blue-600">
            $
            {selectedTests.reduce(
              (sum, item) => sum + item.price,
              0
            )}
          </span>

        </div>

      </div>

      <div className="flex gap-3 mt-8">

        <button
          onClick={() => setStep(1)}
          className="flex-1 border rounded-xl py-3"
        >
          Back
        </button>

        <button
          onClick={() => {
            if (selectedTests.length === 0) {
              alert("Please select at least one test");
              return;
            }

            setStep(3);
          }}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3"
        >
          Continue
        </button>

      </div>

    </div>

  </div>

</div>

)}
{step === 3 && (

<div className="space-y-6">

  {/* Header */}
  <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">

    <h2 className="text-2xl font-bold dark:text-white">
      Review Request
    </h2>

    <p className="text-gray-500 mt-2">
      Review all information before creating the request.
    </p>

  </div>

  {/* Patient */}
  <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">

    <h3 className="font-bold text-lg dark:text-white mb-4">
      Selected Patient
    </h3>

    <p className="font-semibold dark:text-white">
      {selectedPatient?.name}
    </p>

    <p className="text-gray-500">
      {selectedPatient?.gender} • {selectedPatient?.age} Years
    </p>

  </div>

  {/* Selected Tests */}
  <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">

    <h3 className="font-bold text-lg dark:text-white mb-4">
      Selected Analysis
    </h3>

    <div className="space-y-3">

      {selectedTests.map((test) => (

        <div
          key={test.id}
          className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-3"
        >

          <div>

            <p className="font-semibold dark:text-white">
              {test.name}
            </p>

            <p className="text-sm text-gray-500">
              {test.category}
            </p>

          </div>

          <span className="font-bold text-blue-600">
            ${test.price}
          </span>

        </div>

      ))}

    </div>

    <div className="flex justify-between mt-6 text-xl font-bold dark:text-white">

      <span>Total</span>

      <span className="text-blue-600">
        $
        {selectedTests.reduce(
          (sum, item) => sum + item.price,
          0
        )}
      </span>

    </div>

  </div>

  {/* Priority */}
  <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">

    <h3 className="font-bold mb-3 dark:text-white">
      Priority
    </h3>

    <select
      value={priority}
      onChange={(e) => setPriority(e.target.value)}
      className="w-full border rounded-xl p-3 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
    >
      <option>Normal</option>
      <option>Urgent</option>
      <option>Critical</option>
    </select>

    <h3 className="font-bold mt-6 mb-3 dark:text-white">
      Clinical Notes
    </h3>

    <textarea
      rows={5}
      value={note}
      onChange={(e) => setNote(e.target.value)}
      className="w-full border rounded-xl p-3 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
      placeholder="Write notes..."
    />

  </div>

  {/* Buttons */}

  <div className="flex justify-between">

    <button
      onClick={() => setStep(2)}
      className="border px-6 py-3 rounded-xl"
    >
      ← Back
    </button>

    <button
      onClick={createRequest}
      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl"
    >
      Create Request
    </button>

  </div>

</div>

)}
{step === 4 && (

<div className="max-w-3xl mx-auto text-center py-20">

  <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto">

    <div className="text-5xl text-green-600">
      ✓
    </div>

  </div>

  <h1 className="text-4xl font-bold mt-8 text-gray-800 dark:text-white">
    Analysis Request Created
  </h1>

  <p className="text-gray-500 mt-4">
    The laboratory request has been successfully registered.
  </p>

  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow border border-gray-200 dark:border-gray-700 mt-10 p-8 text-left">

    <h2 className="font-bold text-xl mb-5">
      Summary
    </h2>

    <p>
      <b>Patient :</b> {selectedPatient?.name}
    </p>

    <p className="mt-2">
      <b>Tests :</b> {selectedTests.length}
    </p>

    <p className="mt-2">
      <b>Priority :</b> {priority}
    </p>

    <p className="mt-2">
      <b>Status :</b>

      <span className="ml-2 px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm">
        Pending
      </span>

    </p>

  </div>

  <div className="flex justify-center gap-4 mt-10">

    <button
      onClick={() => {
        setStep(1);
        setSelectedPatient(null);
        setSelectedTests([]);
        setPriority("Normal");
        setNote("");
      }}
      className="border px-6 py-3 rounded-xl"
    >
      Create Another
    </button>
<button
  onClick={() => navigate("/doctor/analysis-requests")}
  className="bg-blue-600 text-white px-6 py-3 rounded-xl"
>
  View Requests
</button>

  </div>

</div>

)}
<div className="mt-12">
  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
    Recent Requests
  </h2>

  <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">

    <table className="w-full">

      <thead className="bg-gray-100 dark:bg-gray-700">

        <tr>

          <th className="text-left p-4">Patient</th>

          <th className="text-left p-4">Tests</th>

          <th className="text-left p-4">Priority</th>

          <th className="text-left p-4">Status</th>

          <th className="text-left p-4">Date</th>
          <th className="text-left p-4">Actions</th>

        </tr>

      </thead>

      <tbody>

        {currentRequests.map((request) => (

          <tr
            key={request.id}
            className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
          >

            <td className="p-4">
              {request.patient?.name}
            </td>

           <td className="p-4">
  {request.tests ? request.tests.length : 0}
</td>

            <td className="p-4">
              {request.priority}
            </td>

            <td className="p-4">

              <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                {request.status}
              </span>

            </td>

            <td className="p-4">
              {request.date}
            </td>
            <td className="p-4">

<button
  onClick={() => completeRequest(request.id)}
  className="text-green-600 hover:text-green-800"
>
  Complete
</button>

</td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>
<div className="flex justify-center items-center gap-3 mt-6">

  <button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage(currentPage - 1)}
    className="text-gray-500 hover:text-blue-600 disabled:opacity-30"
  >
    &lt;
  </button>

  {Array.from({ length: totalPages }, (_, index) => (
    <button
      key={index}
      onClick={() => setCurrentPage(index + 1)}
      className={`text-sm font-medium transition ${
        currentPage === index + 1
          ? "text-blue-600 border-b-2 border-blue-600 pb-1"
          : "text-gray-500 hover:text-blue-600"
      }`}
    >
      {index + 1}
    </button>
  ))}

  <button
    disabled={currentPage === totalPages}
    onClick={() => setCurrentPage(currentPage + 1)}
    className="text-gray-500 hover:text-blue-600 disabled:opacity-30"
  >
    &gt;
  </button>

</div>
</div>
{showPatientModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-xl">

      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Add New Patient
      </h2>

      <div className="space-y-4">

        <input
          type="text"
          placeholder="Patient Name"
          value={newPatientName}
          onChange={(e) => setNewPatientName(e.target.value)}
          className="w-full border rounded-xl px-4 py-3 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
        />

        <input
          type="number"
          placeholder="Age"
          value={newPatientAge}
          onChange={(e) => setNewPatientAge(e.target.value)}
          className="w-full border rounded-xl px-4 py-3 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
        />

        <select
          value={newPatientGender}
          onChange={(e) => setNewPatientGender(e.target.value)}
          className="w-full border rounded-xl px-4 py-3 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
        >
          <option>Male</option>
          <option>Female</option>
        </select>

        <input
          type="text"
          placeholder="Phone Number"
          value={newPatientPhone}
          onChange={(e) => setNewPatientPhone(e.target.value)}
          className="w-full border rounded-xl px-4 py-3 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
        />

      </div>

      <div className="flex justify-end gap-3 mt-8">

        <button
          onClick={() => setShowPatientModal(false)}
          className="px-5 py-2 rounded-xl border"
        >
          Cancel
        </button>

        <button
          onClick={addNewPatient}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl"
        >
          Save Patient
        </button>

      </div>

    </div>
  </div>

)}
    </div>
    
    
  );
}

export default AnalysisRequests;