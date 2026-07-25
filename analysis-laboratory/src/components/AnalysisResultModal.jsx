import { useState  } from "react";
import {
  getResults,
  saveResults,
} from "../data/analysisResultsStorage";

import {
  getRequests,
  saveRequests,
} from "../data/analysisRequestsStorage";

function AnalysisResultModal({
  isOpen,
  onClose,
  analysis,
  patient,
}) {
  const [results, setResults] = useState({});
//   useEffect(() => {
//   saveResults(results);
// }, [results]);


// useEffect(() => {
//   const refreshResults = () => {
//     setResults(getResults());
//   };

//   window.addEventListener("focus", refreshResults);

//   return () => {
//     window.removeEventListener("focus", refreshResults);
//   };
// }, []);
 const handleSave = () => {
  const allResults = getResults();

  const newResult = {
    id: crypto.randomUUID(), // بدل Date.now()
    patient: patient.patient,
    analysis: analysis.name,
    doctor: patient.doctor,
    date: patient.date,
    notes: patient.note || "",
    result: Object.values(results).join(" | "),
    unit: "",
    min: "",
    max: "",
    age: patient.age || "",
    gender: patient.gender || "",
  };


  saveResults([...allResults, newResult]);

  const requests = getRequests();

  const updatedRequests = requests.map((item) =>
    item.id === patient.id
      ? { ...item, status: "Completed" }
      : item
  );

  saveRequests(updatedRequests);

  onClose();
};


  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

      <div className="bg-white rounded-xl shadow-lg p-6 w-[700px]">

  <h2 className="text-2xl font-bold mb-6">
    Analysis Result
  </h2>

  <p className="text-gray-500 mb-5">
Patient: {patient?.patient}
  </p>

  <p className="font-semibold mb-4">
    {analysis?.name}
  </p>

  {analysis?.fields?.map((field) => (
    <div
      key={field.name}
      className="grid grid-cols-4 gap-4 items-center mb-3"
    >
      <div className="font-medium">
        {field.name}
      </div>

      <input
  type="text"
  value={results[field.name] || ""}
  onChange={(e) =>
    setResults({
      ...results,
      [field.name]: e.target.value,
    })
  }
  placeholder="Result"
  className="border rounded px-2 py-1"
/>

      <div>{field.unit}</div>

      <div className="text-gray-500">
        {field.reference}
      </div>

     
    </div>
  ))}
<div className="flex justify-end gap-3 mt-6">
    <button
    onClick={onClose}
    className="bg-red-500 text-white px-4 py-2 rounded"
  >
    Close
  </button>

  <button
  onClick={handleSave}
  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
>
  Save Result
</button>
</div>
</div>

    </div>
  );
}

export default AnalysisResultModal;