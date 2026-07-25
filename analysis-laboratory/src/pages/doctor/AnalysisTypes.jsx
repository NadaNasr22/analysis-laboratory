import { useState } from "react";
import { analysisTypesData } from "../../data/analysisTypes";
import AnalysisTypeSearch from "../../components/AnalysisTypeSearch";
import AnalysisTypeStats from "../../components/AnalysisTypeStats";
import AnalysisTypeTable from "../../components/AnalysisTypeTable";

function AnalysisTypes() {

const [analysisList, setAnalysisList] = useState(analysisTypesData);
const [search, setSearch] = useState("");
const [showForm, setShowForm] = useState(false);

const [name, setName] = useState("");
const [category, setCategory] = useState("");
const [price, setPrice] = useState("");
const [duration, setDuration] = useState("");
const [selectedAnalysis, setSelectedAnalysis] = useState(null);
const [editingAnalysis, setEditingAnalysis] = useState(null);


const filteredAnalysis = analysisList.filter((item) =>
  item.name.toLowerCase().includes(search.toLowerCase())
);

const deleteAnalysis = (id) => {
  setAnalysisList(
    analysisList.filter((item) => item.id !== id)
  );
};
const addAnalysis = () => {
  if (!name || !category || !price || !duration) return;

  if (editingAnalysis) {
    setAnalysisList(
      analysisList.map((item) =>
        item.id === editingAnalysis.id
          ? {
              ...item,
              name,
              category,
              price,
              duration,
            }
          : item
      )
    );

    setEditingAnalysis(null);
  } else {
    setAnalysisList([
      ...analysisList,
      {
        id: Date.now(),
        name,
        category,
        price,
        duration,
      },
    ]);
  }

  setName("");
  setCategory("");
  setPrice("");
  setDuration("");

  setShowForm(false);
};
const viewAnalysis = (analysis) => {
  setSelectedAnalysis(analysis);
};
const editAnalysis = (analysis) => {
  setEditingAnalysis(analysis);

  setName(analysis.name);
  setCategory(analysis.category);
  setPrice(analysis.price);
  setDuration(analysis.duration);

  setShowForm(true);
};

return (
<div className="p-6">
      {/* Header */}
    <div className="flex justify-between items-center mb-8">

<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Analysis Types
      </h1>

     <button
  onClick={() => setShowForm(true)}
  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
>
  + Add Analysis
</button>

    </div>

    {/* Stats */}
    <AnalysisTypeStats total={analysisList.length} />

    {/* Search */}
    <AnalysisTypeSearch
      search={search}
      setSearch={setSearch}
    />

    {/* Table */}
   <AnalysisTypeTable
  analysisList={filteredAnalysis}
  onDelete={deleteAnalysis}
  onView={viewAnalysis}
    onEdit={editAnalysis}

/>

{showForm && (
  <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

    <div className="bg-white dark:bg-gray-800 dark:text-white  rounded-2xl shadow-xl w-[500px] p-8">

      <h2 className="text-2xl font-bold mb-6">
  {editingAnalysis ? "Edit Analysis" : "Add New Analysis"}
</h2>

      <input
        type="text"
        placeholder="Analysis Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
       className="w-full border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl p-3 mb-4 outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
  className="w-full border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl p-3 mb-4 outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
  className="w-full border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl p-3 mb-4 outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="text"
        placeholder="Duration"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      className="w-full border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl p-3 mb-4 outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex justify-end gap-3">

        <button
          onClick={() => setShowForm(false)}
className="px-5 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white transition"        >
          Cancel
        </button>

       <button
  onClick={addAnalysis}
  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl"
>
  {editingAnalysis ? "Update" : "Save"}
</button>

      </div>

    </div>

  </div>
)}
{selectedAnalysis && (
  <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

<div className="bg-white dark:bg-gray-800 dark:text-white rounded-2xl p-8 w-[450px] shadow-xl">
<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Analysis Details
      </h2>

      <div className="space-y-4">

        <p className="text-gray-700 dark:text-gray-200">
          <strong>Name:</strong> {selectedAnalysis.name}
        </p>

        <p className="text-gray-700 dark:text-gray-200">
          <strong>Category:</strong> {selectedAnalysis.category}
        </p>

        <p className="text-gray-700 dark:text-gray-200">
          <strong>Price:</strong> ${selectedAnalysis.price}
        </p>

        <p className="text-gray-700 dark:text-gray-200">
          <strong>Duration:</strong> {selectedAnalysis.duration}
        </p>

      </div>

      <div className="flex justify-end mt-6">

        <button
          onClick={() => setSelectedAnalysis(null)}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl"
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

export default AnalysisTypes;