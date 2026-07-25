import { useState, useEffect } from "react";
import { FaEye, FaPrint } from "react-icons/fa";
import { getResults } from "../../data/resultStorage";
function EmployeeResults() {

const [results,setResults] = useState([]);
const [search,setSearch] = useState("");
const [selectedResult,setSelectedResult] = useState(null);
useEffect(()=>{

  const loadResults = () => {
    const data = getResults();
    setResults(data);
  };

  loadResults();

  window.addEventListener(
    "storage",
    loadResults
  );

  return () => {
    window.removeEventListener(
      "storage",
      loadResults
    );
  };

},[]);

  const filteredResults = results.filter((item) =>
    item.patient
      .toLowerCase()
      .includes(search.toLowerCase())
  );

// const updateStatus = (id)=>{

//  const updated = results.map((item)=>{

//   if(item.id === id){

//     return {
//       ...item,
//       status:"Completed"
//     }

//   }

//   return item;

//  });


//  setResults(updated);

//  saveResults(updated);

// };

const handlePrint = (result) => {

  const printWindow = window.open("", "_blank");


  printWindow.document.write(`

<!DOCTYPE html>
<html>

<head>

<title>Laboratory Report</title>

<style>

body{
  font-family: Arial, sans-serif;
  padding:40px;
  color:#222;
}

.report{
  max-width:800px;
  margin:auto;
  border:1px solid #ddd;
  padding:30px;
  border-radius:15px;
}

.header{
  text-align:center;
  border-bottom:2px solid #2563eb;
  padding-bottom:15px;
}

.header h1{
  color:#2563eb;
  margin:0;
  font-size:32px;
}

.header p{
  margin:5px;
}


.title{
  text-align:center;
  margin:25px 0;
  font-size:22px;
  font-weight:bold;
}


.section{
  margin-top:20px;
}


.box{
  background:#f8fafc;
  border:1px solid #ddd;
  padding:15px;
  border-radius:10px;
}


.row{
  margin:10px 0;
}


.status{
  color:#16a34a;
  font-weight:bold;
}


.footer{
  margin-top:40px;
  border-top:1px solid #ddd;
  padding-top:20px;
}


</style>

</head>


<body>


<div class="report">


<div class="header">

<h1>
Future Laboratory
</h1>

<p>
Clinical Precision
</p>

<p>
Mansoura - Egypt | Tel: 01000000000
</p>

</div>



<div class="title">
Laboratory Report
</div>



<div class="section">

<h3>
Patient Information
</h3>


<div class="box">

<div class="row">
<b>Patient Name:</b>
${result.patient}
</div>


<div class="row">
<b>Requested Analysis:</b>
${result.analysis}
</div>


<div class="row">
<b>Requested By:</b>
${result.doctor}
</div>


<div class="row">
<b>Report Date:</b>
${result.date}
</div>


</div>


</div>




<div class="section">

<h3>
Result Status
</h3>


<div class="box">


<div class="row">

<b>Status:</b>

<span class="status">
${result.status}
</span>

</div>


<p>
The laboratory test has been completed
and verified successfully.
</p>


</div>


</div>




<div class="footer">


<p>
Laboratory Technician: _______________
</p>


<p>
Doctor Signature: _______________
</p>


<br/>


<p>
This report is electronically generated.
Please consult your physician for interpretation.
</p>


</div>



</div>


</body>

</html>

`);


printWindow.document.close();

printWindow.print();

};

  return (
    <div className="
    w-full
    min-h-screen
    bg-gray-50
    p-4 sm:p-6
    overflow-hidden
    ">

      <h1 className="
      text-2xl
      font-bold
      text-gray-800
      ">
        Analysis Results
      </h1>

      <p className="text-gray-500 mt-2">
        View and print patient laboratory results
      </p>


      {/* Search */}

      <div className="
      mt-6
      bg-white
      rounded-2xl
      shadow-sm
      p-4
      ">

        <input
          type="text"
          placeholder="Search patient..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          className="
          border
          rounded-xl
          px-4
          py-2.5
          w-full
          sm:w-80
          outline-none
          focus:ring-2
          focus:ring-blue-500
          "
        />

      </div>


      {/* Results */}

      <div className="
      mt-6
      bg-white
      rounded-2xl
      shadow-sm
      overflow-hidden
      ">


        <div className="overflow-x-auto">

        <table className="
        w-full
        min-w-[700px]
        ">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">
                Patient
              </th>

              <th className="p-4 text-left">
                Analysis
              </th>

              <th className="p-4 text-left">
                Date
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Actions
              </th>

            </tr>

          </thead>


          <tbody>

          {filteredResults.map((result)=>(

            <tr
            key={result.id}
            className="
            border-t
            hover:bg-gray-50
            "
            >

              <td className="p-4">
                {result.patient}
              </td>


             <td className="p-4">
  {result.tests?.map(test => test.name).join(", ")}
</td>


              <td className="p-4">
                {result.date}
              </td>


              <td className="p-4">

                <span
                className={`
                px-3 py-1 rounded-full text-sm
                ${
                  result.status === "Completed"
                  ?
                  "bg-green-100 text-green-700"
                  :
                  "bg-yellow-100 text-yellow-700"
                }
                `}
                >

                {result.status}

                </span>

              </td>


              <td className="p-4">

                <div className="flex gap-4">

               <button
onClick={()=>setSelectedResult(result)}
className="text-blue-600 hover:text-blue-800"
title="View"
>
  <FaEye/>
</button>


<button
onClick={() => handlePrint(result)}
className="text-purple-600 hover:text-purple-800"
title="Print"
>
  <FaPrint />
</button>


                </div>

              </td>


            </tr>

          ))}


          </tbody>


        </table>

        </div>


      </div>

{selectedResult && (

<div className="
fixed
inset-0
bg-black/40
flex
items-center
justify-center
z-50
">

<div className="
bg-white
rounded-2xl
p-6
w-[90%]
sm:w-[450px]
shadow-xl
">

<h2 className="text-xl font-bold mb-4">
  Analysis Result
</h2>


<p>
<b>Patient:</b> {selectedResult.patient}
</p>

<p>
<b>Analysis:</b> {selectedResult.analysis}
</p>


{selectedResult.tests && (
<div className="mt-4">

<h3 className="font-bold mb-3">
Test Results
</h3>

<table className="w-full border">

<thead>
<tr className="bg-gray-100">

<th className="p-2">
Test
</th>

<th className="p-2">
Result
</th>

<th className="p-2">
Unit
</th>

<th className="p-2">
Reference
</th>

</tr>
</thead>


<tbody>

{selectedResult.tests.map((test,index)=>(

<tr 
key={index}
className="border-t"
>

<td className="p-2">
{test.name}
</td>

<td className="p-2">
{test.result}
</td>

<td className="p-2">
{test.unit}
</td>

<td className="p-2">
{test.range}
</td>

</tr>

))}

</tbody>

</table>

</div>
)}

<p>
<b>Date:</b> {selectedResult.date}
</p>

<p>
<b>Status:</b> 
<span className="text-green-600 ml-2">
{selectedResult.status}
</span>
</p>


<button
onClick={()=>setSelectedResult(null)}
className="
mt-5
bg-blue-600
text-white
px-5
py-2
rounded-xl
"
>
Close
</button>


</div>

</div>

)}
    </div>
  );
}


export default EmployeeResults;