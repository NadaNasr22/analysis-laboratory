// import { useState, useEffect } from "react";
// import {
//   getResults,
//   saveResults,
// } from "../../data/analysisResultsStorage";
// import AnalysisResultStats from "../../components/AnalysisResultStats";
// import AnalysisResultTable from "../../components/AnalysisResultTable";
// import AnalysisResultModal from "../../components/AnalysisResultModal";
// import { analysisTypesData } from "../../data/analysisTypes";
// import { translations } from "../../constants/translations";

// function AnalysisResults() {
//   const { language } = useLanguage();
// const t = translations[language];

// const [results, setResults] = useState([]);
// console.log("Results:", results);
// const [selectedResult, setSelectedResult] = useState(null);
// const [deleteResult, setDeleteResult] = useState(null);
// const [editingResult, setEditingResult] = useState(null);
// const [search, setSearch] = useState("");
// const [statusFilter, setStatusFilter] = useState("All");

// const [editValue, setEditValue] = useState("");

// const [editNotes, setEditNotes] = useState("");
// const getStatus = (result, min, max) => {
//   if (result < min) return "Low";
//   if (result > max) return "High";
//   return "Normal";
// };
// const viewResult = (result) => {
//   setSelectedResult(result);
// };
// // const editResult = (item) => {
// //   setEditingResult(item);

// //   setEditValue(item.result);

// //   setEditNotes(item.notes);
// // };

// const saveEdit = () => {
//   setResults(
//     results.map((item) =>
//       item.id === editingResult.id
//         ? {
//             ...item,
//             result: Number(editValue),
//             notes: editNotes,
//           }
//         : item
//     )
//   );

//   setEditingResult(null);
// };
// const totalTests = results.length;

// const normalCount = results.filter(
//   (item) => getStatus(item.result, item.min, item.max) === "Normal"
// ).length;

// const highCount = results.filter(
//   (item) => getStatus(item.result, item.min, item.max) === "High"
// ).length;

// const lowCount = results.filter(
//   (item) => getStatus(item.result, item.min, item.max) === "Low"
// ).length;
// const filteredResults = results.filter((item) => {

//   const patientName =
//     typeof item.patient === "string"
//       ? item.patient
//       : item.patient?.name || "";

//   const matchSearch = patientName
//     .toLowerCase()
//     .includes(search.toLowerCase());

//   const status = getStatus(
//     item.result,
//     item.min,
//     item.max
//   );

//   const matchStatus =
//     statusFilter === "All" ||
//     status === statusFilter;

//   return matchSearch && matchStatus;
// });

// const removeResult = (id) => {
//   setResults(results.filter((item) => item.id !== id));
//   setDeleteResult(null);
// };




// const handlePrintReport = (result) => {
//   const printWindow = window.open("", "_blank");

//   printWindow.document.write(`
//     <html>

//       <head>

//         <title>Analysis Report</title>

//         <style>

//           body{
//             font-family:Arial;
//             padding:40px;
//             color:#222;
//           }

//           h1{
//             text-align:center;
//             color:#2563eb;
//           }

//           h3{
//             margin-top:30px;
//           }

//           table{
//             width:100%;
//             border-collapse:collapse;
//             margin-top:20px;
//           }

//           th,td{
//             border:1px solid #ddd;
//             padding:12px;
//             text-align:left;
//           }

//           th{
//             background:#f3f4f6;
//           }

//           .info{
//             display:flex;
//             justify-content:space-between;
//             margin-top:25px;
//           }

//           .footer{
//             margin-top:70px;
//             display:flex;
//             justify-content:space-between;
//           }

//         </style>

//       </head>

//       <body>

//         <h1>Analysis Laboratory</h1>

//         <hr>

//         <div class="info">

//           <div>
//             <p><strong>Patient :</strong> ${result.patient?.name}</p>
//             <p><strong>Age :</strong> ${result.age}</p>
//             <p><strong>Gender :</strong> ${result.gender}</p>
//           </div>

//           <div>
//             <p><strong>Doctor :</strong> ${result.doctor}</p>
//             <p><strong>Date :</strong> ${result.date}</p>
//           </div>

//         </div>

//         <table>

//           <thead>

//             <tr>
//               <th>Analysis</th>
//               <th>Result</th>
//               <th>Reference</th>
//               <th>Unit</th>
//             </tr>

//           </thead>

//           <tbody>

//             <tr>

//               <td>${result.analysis}</td>

//               <td>${result.result}</td>

//               <td>${result.min} - ${result.max}</td>

//               <td>${result.unit}</td>

//             </tr>

//           </tbody>

//         </table>

//         <h3>Doctor Notes</h3>

//         <p>${result.notes}</p>

//         <div class="footer">

//           <div>
//             ______________________
//             <br>
//             Laboratory Signature
//           </div>

//           <div>
//             ______________________
//             <br>
//             Doctor Signature
//           </div>

//         </div>

//       </body>

//     </html>
//   `);

// printWindow.document.close();

// setTimeout(() => {
//   printWindow.focus();
//   printWindow.print();
// }, 500);
// };

// const [showModal, setShowModal] = useState(false);
// const [selectedAnalysis, setSelectedAnalysis] = useState(null);
// const [selectedPatient, setSelectedPatient] = useState(null);

// const handleEditResult = (patient) => {
//   setSelectedPatient(patient);
//   setSelectedAnalysis({
//     name: patient.analysis,
//     fields:
//       analysisTypesData.find(
//         (item) => item.name === patient.analysis
//       )?.fields || [],
//   });

//   setShowModal(true);
// };

// useEffect(() => {
//   saveResults(results);
// }, [results]);
// // return (

// // <div className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 dark:text-white min-h-screen overflow-x-hidden transition-all">
// //   <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
// //   {t.analysisResults}
// // </h1>
// // <AnalysisResultStats
// //   total={totalTests}
// //   normal={normalCount}
// //   high={highCount}
// //   low={lowCount}
// // />

// // <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center mt-8">
// //   <input
// //     type="text"
// //     placeholder="Search patient..."
// //     value={search}
// //     onChange={(e) => setSearch(e.target.value)}
// // className="w-full lg:w-80 border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl p-3" />

// //   <select
// //     value={statusFilter}
// //     onChange={(e) => setStatusFilter(e.target.value)}
// // className="w-full lg:w-auto border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl p-3">    <option>All</option>
// //     <option>Normal</option>
// //     <option>High</option>
// //     <option>Low</option>
// //   </select>

// // </div>

// // <div className="hidden lg:block">

// // <AnalysisResultTable
// //   results={filteredResults}
// //   getStatus={getStatus}
// //   onView={viewResult}
// //   onDelete={setDeleteResult}
// //   onEdit={handleEditResult}
// // />

// // </div>
// // <div className="lg:hidden space-y-4 mt-6">

// // {filteredResults.length === 0 ? (

// // <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 text-center">
// //   No analysis results found
// // </div>

// // ) : (

// // filteredResults.map((result)=>(

// // <div
// //  key={result.id}
// //  className="bg-white dark:bg-gray-800 rounded-xl shadow p-4"
// // >

// // <div className="space-y-2 text-sm">


// // <p>
// // <span className="font-semibold">Patient:</span>{" "}
// // {result.patient?.name}
// // </p>


// // <p>
// // <span className="font-semibold">Analysis:</span>{" "}
// // {result.analysis}
// // </p>


// // <p>
// // <span className="font-semibold">Result:</span>{" "}
// // {result.result}
// // </p>


// // <p>
// // <span className="font-semibold">Date:</span>{" "}
// // {result.date}
// // </p>


// // <span
// // className={`
// // inline-block px-3 py-1 rounded-full text-white text-xs
// // ${
// // getStatus(result)==="Normal"
// // ? "bg-green-500"
// // : getStatus(result)==="High"
// // ? "bg-red-500"
// // : "bg-yellow-500"
// // }
// // `}
// // >
// // {getStatus(result)}
// // </span>


// // <div className="flex justify-end gap-2 mt-4">

// // <button
// // onClick={()=>viewResult(result)}
// // className="bg-blue-500 text-white p-2 rounded-md"
// // >
// // 👁️
// // </button>


// // <button
// // onClick={()=>handleEditResult(result)}
// // className="bg-yellow-500 text-white p-2 rounded-md"
// // >
// // ✏️
// // </button>


// // <button
// // onClick={()=>setDeleteResult(result)}
// // className="bg-red-500 text-white p-2 rounded-md"
// // >
// // 🗑️
// // </button>

// // </div>


// // </div>

// // </div>

// // ))

// // )}

// // </div>
// // {selectedResult && (
// //   <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

// // <div className="bg-white dark:bg-gray-800 dark:text-white w-[700px] rounded-2xl shadow-2xl p-8">
// // <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
// //           Laboratory Report
// //       </h2>

// //       <div className="grid grid-cols-2 gap-6">

// //         <div>
// //           <p><strong>Patient:</strong> {selectedResult.patient}</p>
// //           <p><strong>Age:</strong> {selectedResult.age}</p>
// //           <p><strong>Gender:</strong> {selectedResult.gender}</p>
// //         </div>

// //         <div>
// //           <p><strong>Doctor:</strong> {selectedResult.doctor}</p>
// //           <p><strong>Date:</strong> {selectedResult.date}</p>
// //         </div>

// //       </div>



// // <hr className="my-6 border-gray-300 dark:border-gray-600" />     
// //       <table className="w-full border">

// // <thead className="bg-gray-100 dark:bg-gray-700">
// //           <tr>

// //            <th  className="border dark:border-gray-600 p-3">Analysis</th>

// //            <th className="border dark:border-gray-600 p-3">Result</th>

// //        <th  className="border dark:border-gray-600 p-3">Reference</th>

// //          <th  className="border dark:border-gray-600 p-3">Unit</th>

// //           </tr>

// //         </thead>

// //         <tbody>

// //           <tr>

// // <td className="border dark:border-gray-600 p-3">
// //                 {selectedResult.analysis}
// //             </td>

// // <td className="border dark:border-gray-600 p-3">
// //                 {selectedResult.result}
// //             </td>

// //          <td className="border dark:border-gray-600 p-3">
// //               {selectedResult.min} - {selectedResult.max}
// //             </td>

// //        <td className="border dark:border-gray-600 p-3">
// //               {selectedResult.unit}
// //             </td>

// //           </tr>

// //         </tbody>

// //       </table>

// //       <div className="mt-6">

// //         <h3 className="font-bold mb-2">
// //           Doctor Notes
// //         </h3>

// // <p className="text-gray-600 dark:text-gray-300">
// //             {selectedResult.notes}
// //         </p>

// //       </div>

// //       <div className="flex justify-end gap-3 mt-8">

// //         <button
// //           onClick={() => setSelectedResult(null)}
// // className="px-5 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white transition"        >
// //           Close
// //         </button>

// // <button
// //   onClick={() => handlePrintReport(selectedResult)}
// //   className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
// // >
// //   Print Report
// // </button>

// //       </div>

// //     </div>

// //   </div>
// // )}
// // {deleteResult && (
// //   <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

// // <div className="bg-white dark:bg-gray-800 dark:text-white rounded-2xl p-8 w-[450px] shadow-xl">
// //       <h2 className="text-2xl font-bold text-red-600 mb-4">
// //         Delete Analysis Result
// //       </h2>

// // <p className="text-gray-600 dark:text-gray-300 mb-6">
// //           Are you sure you want to delete this analysis result?
// //       </p>

// // <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 mb-6">
// //         <p>
// //           <strong>Patient:</strong> {deleteResult.patient}
// //         </p>

// //         <p>
// //           <strong>Analysis:</strong> {deleteResult.analysis}
// //         </p>

// //       </div>

// //       <div className="flex justify-end gap-3">

// //         <button
// //           onClick={() => setDeleteResult(null)}
// //            className="px-5 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white transition"        >
// //           Cancel
// //         </button>

// //         <button
// //           onClick={() => removeResult(deleteResult.id)}
// //           className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
// //         >
// //           Delete
// //         </button>

// //       </div>

// //     </div>

// //   </div>
// // )}
// // {editingResult && (
// //   <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

// // <div className="bg-white dark:bg-gray-800 dark:text-white rounded-2xl w-[500px] p-8 shadow-xl">
// // <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
// //           Edit Analysis Result
// //       </h2>

// //       <div className="mb-4">
// //         <label className="font-semibold">
// //           Patient
// //         </label>

// //         <input
// //           value={editingResult.patient}
// //           disabled
// // className="w-full mt-2 border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl p-3"        />
// //       </div>

// //       <div className="mb-4">
// //         <label className="font-semibold">
// //           Analysis
// //         </label>

// //         <input
// //           value={editingResult.analysis}
// //           disabled
// // className="w-full mt-2 border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl p-3"        />
// //       </div>

// //       <div className="mb-4">
// //         <label className="font-semibold">
// //           Result
// //         </label>

// //         <input
// //           value={editValue}
// //           onChange={(e) => setEditValue(e.target.value)}
// // className="w-full mt-2 border dark:border-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-white rounded-xl p-3"        />
// //       </div>

// //       <div className="mb-6">
// //         <label className="font-semibold">
// //           Doctor Notes
// //         </label>

// //         <textarea
// //           value={editNotes}
// //           onChange={(e) => setEditNotes(e.target.value)}
// //           rows="4"
// // className="w-full mt-2 border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl p-3"        />
// //       </div>

// //       <div className="flex justify-end gap-3">

// //         <button
// //           onClick={() => setEditingResult(null)}
// // className="px-5 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white transition"        >
// //           Cancel
// //         </button>

// //         <button
// //           onClick={saveEdit}
// //           className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
// //         >
// //           Save Changes
// //         </button>

// //       </div>

// //     </div>

// //   </div>
// // )}
// // <AnalysisResultModal
// //   isOpen={showModal}
// //   onClose={() => setShowModal(false)}
// //   analysis={selectedAnalysis}
// //   patient={selectedPatient}
// // />
// // </div>

// // );

// }

// export default AnalysisResults;
function AnalysisResults() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">
        Analysis Results
      </h1>
      <p>Coming Soon...</p>
    </div>
  );
}

export default AnalysisResults;