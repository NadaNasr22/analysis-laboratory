import { useState } from "react";
import { FaSave } from "react-icons/fa";
import { saveResults, getResults } from "../../data/resultStorage";


function EmployeeEnterResult() {

  const [patient,setPatient] = useState("");
  const [analysis,setAnalysis] = useState("");

  const [tests,setTests] = useState([
    {
      name:"",
      result:"",
      unit:"",
      range:""
    }
  ]);


  const addTest = () => {

    setTests([
      ...tests,
      {
        name:"",
        result:"",
        unit:"",
        range:""
      }
    ]);

  };


  const updateTest = (index,field,value)=>{

    const updated = [...tests];

    updated[index][field] = value;

    setTests(updated);

  };


  const handleSave = ()=>{

    const oldResults = getResults();


    const newResult = {

      id: Date.now(),

      patient,

      analysis,

      tests,

      date:new Date().toLocaleDateString(),

      status:"Completed"

    };


    saveResults([
      ...oldResults,
      newResult
    ]);


    alert("Result Saved");

  };

const analysisOptions = {
  "Complete Blood Count": [
    "Hemoglobin",
    "WBC",
    "Platelets",
    "RBC",
  ],

  "Blood Sugar": [
    "Fasting Blood Sugar",
    "Random Blood Sugar",
  ],

  "Urine Analysis": [
    "Protein",
    "Glucose",
    "PH",
  ]
};

return (
<div className="p-6">


<h1 className="text-2xl font-bold">
Enter Laboratory Result
</h1>



<div className="
bg-white
rounded-2xl
shadow
p-6
mt-6
space-y-4
">


<input
placeholder="Patient Name"
className="border rounded-xl p-3 w-full"
value={patient}
onChange={(e)=>setPatient(e.target.value)}
/>

<select
className="border rounded-xl p-3 w-full"
value={analysis}
onChange={(e)=>setAnalysis(e.target.value)}
>

<option value="">
Select Analysis
</option>

{Object.keys(analysisOptions).map((item)=>(

<option key={item}>
{item}
</option>

))}

</select>


<h2 className="font-bold mt-4">
Tests
</h2>


{tests.map((test,index)=>(

<div 
key={index}
className="grid grid-cols-4 gap-3"
>


<select
className="border p-2 rounded"
value={test.name}
onChange={(e)=>
updateTest(index,"name",e.target.value)
}
>

<option>
Select Test
</option>


{analysisOptions[analysis]?.map((testName)=>(

<option key={testName}>
{testName}
</option>

))}


</select>


<input
placeholder="Result"
className="border p-2 rounded"
value={test.result}
onChange={(e)=>
updateTest(index,"result",e.target.value)
}
/>


<input
placeholder="Unit"
className="border p-2 rounded"
value={test.unit}
onChange={(e)=>
updateTest(index,"unit",e.target.value)
}
/>


<input
placeholder="Reference Range"
className="border p-2 rounded"
value={test.range}
onChange={(e)=>
updateTest(index,"range",e.target.value)
}
/>


</div>

))}



<button
onClick={addTest}
className="bg-gray-200 px-4 py-2 rounded-xl"
>
+ Add Test
</button>



<button
onClick={handleSave}
className="
bg-blue-600
text-white
px-5
py-2
rounded-xl
flex
items-center
gap-2
"
>
<FaSave/>
Save Result
</button>



</div>


</div>
)

}


export default EmployeeEnterResult;