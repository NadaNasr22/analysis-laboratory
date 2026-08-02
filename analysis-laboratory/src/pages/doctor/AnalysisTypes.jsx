import { useState } from "react";
import {
getAnalysisTypes,
saveAnalysisTypes,
} from "../../data/analysisStorage";

import AnalysisTypeSearch from "../../components/AnalysisTypeSearch";
import AnalysisTypeStats from "../../components/AnalysisTypeStats";
import AnalysisTypeTable from "../../components/AnalysisTypeTable";

import { useLanguage } from "../../constants/useLanguage";
import { translations } from "../../constants/translations";

function AnalysisTypes() {
const { language } = useLanguage();
const t = translations[language];

const [analysisList, setAnalysisList] = useState(() =>
getAnalysisTypes()
);

const [search, setSearch] = useState("");
const [showForm, setShowForm] = useState(false);

const [name, setName] = useState("");
const [category, setCategory] = useState("");
const [price, setPrice] = useState("");
const [duration, setDuration] = useState("");

const [selectedAnalysis, setSelectedAnalysis] =
useState(null);

const [editingAnalysis, setEditingAnalysis] =
useState(null);

// ==================== FILTER ====================

const filteredAnalysis = analysisList.filter((item) =>
item.name
?.toLowerCase()
.includes(search.toLowerCase())
);

// ==================== DELETE ====================

const deleteAnalysis = (analysisOrId) => {
// سواء الـ Table بعت id أو بعت الـ analysis نفسه
const id =
typeof analysisOrId === "object"
? analysisOrId?.id
: analysisOrId;


if (id === undefined || id === null) {
  return;
}

const updatedList = analysisList.filter(
  (item) => String(item.id) !== String(id)
);

setAnalysisList(updatedList);

// مهم جدًا:
// الدكتور والموظف بيقرأوا من نفس الـ storage
saveAnalysisTypes(updatedList);

// لو التحليل المحذوف كان مفتوح في التفاصيل
if (
  selectedAnalysis &&
  String(selectedAnalysis.id) === String(id)
) {
  setSelectedAnalysis(null);
}

// لو التحليل المحذوف كان بيتعدل
if (
  editingAnalysis &&
  String(editingAnalysis.id) === String(id)
) {
  setEditingAnalysis(null);
  setShowForm(false);
}


};

// ==================== ADD / EDIT ====================

const addAnalysis = () => {
if (!name || !category || !price || !duration) {
return;
}


let updatedList;

if (editingAnalysis) {
  updatedList = analysisList.map((item) =>
    String(item.id) ===
    String(editingAnalysis.id)
      ? {
          ...item,
          name,
          category,
          price,
          duration,
        }
      : item
  );

  setEditingAnalysis(null);
} else {
  const newAnalysis = {
    id: Date.now(),
    name,
    category,
    price,
    duration,
    fields: [],
  };

  updatedList = [
    ...analysisList,
    newAnalysis,
  ];
}

setAnalysisList(updatedList);

// حفظ نفس البيانات التي يقرأ منها الموظف
saveAnalysisTypes(updatedList);

setName("");
setCategory("");
setPrice("");
setDuration("");
setShowForm(false);


};

// ==================== VIEW ====================

const viewAnalysis = (analysis) => {
setSelectedAnalysis(analysis);
};

// ==================== EDIT ====================

const editAnalysis = (analysis) => {
setEditingAnalysis(analysis);


setName(analysis.name || "");
setCategory(analysis.category || "");
setPrice(analysis.price || "");
setDuration(analysis.duration || "");

setShowForm(true);


};

// ==================== CLOSE FORM ====================

const closeForm = () => {
setShowForm(false);
setEditingAnalysis(null);


setName("");
setCategory("");
setPrice("");
setDuration("");


};

return ( <div className="px-6 pt-12 pb-6">
{/* ==================== HEADER ==================== */}


  <div className="flex justify-between items-center mb-8">
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
      {t.analysisTypesTitle}
    </h1>

    <button
      onClick={() => {
        setEditingAnalysis(null);
        setName("");
        setCategory("");
        setPrice("");
        setDuration("");
        setShowForm(true);
      }}
      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
    >
      + {t.addAnalysis}
    </button>
  </div>

  {/* ==================== STATS ==================== */}

  <AnalysisTypeStats
    total={analysisList.length}
  />

  {/* ==================== SEARCH ==================== */}

  <AnalysisTypeSearch
    search={search}
    setSearch={setSearch}
  />

  {/* ==================== TABLE ==================== */}

  <AnalysisTypeTable
    analysisList={filteredAnalysis}
    onDelete={deleteAnalysis}
    onView={viewAnalysis}
    onEdit={editAnalysis}
  />

  {/* ==================== ADD / EDIT MODAL ==================== */}

  {showForm && (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 dark:text-white rounded-2xl shadow-xl w-full max-w-[500px] p-8">

        <h2 className="text-2xl font-bold mb-6">
          {editingAnalysis
            ? t.editAnalysis
            : t.addNewAnalysis}
        </h2>

        <input
          type="text"
          placeholder={t.analysisName}
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="w-full border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl p-3 mb-4 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          placeholder={t.category}
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          className="w-full border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl p-3 mb-4 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          placeholder={t.price}
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
          className="w-full border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl p-3 mb-4 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          placeholder={t.duration}
          value={duration}
          onChange={(e) =>
            setDuration(e.target.value)
          }
          className="w-full border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl p-3 mb-4 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={closeForm}
            className="px-5 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white transition"
          >
            {t.cancel}
          </button>

          <button
            onClick={addAnalysis}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl"
          >
            {editingAnalysis
              ? t.updateAnalysis
              : t.save}
          </button>
        </div>
      </div>
    </div>
  )}

  {/* ==================== DETAILS MODAL ==================== */}

  {selectedAnalysis && (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 dark:text-white rounded-2xl p-8 w-full max-w-[450px] shadow-xl">

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          {t.analysisDetails}
        </h2>

        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-200">
            <strong>{t.name}:</strong>{" "}
            {selectedAnalysis.name}
          </p>

          <p className="text-gray-700 dark:text-gray-200">
            <strong>{t.category}:</strong>{" "}
            {selectedAnalysis.category}
          </p>

          <p className="text-gray-700 dark:text-gray-200">
            <strong>{t.price}:</strong>{" "}
            ${selectedAnalysis.price}
          </p>

          <p className="text-gray-700 dark:text-gray-200">
            <strong>{t.duration}:</strong>{" "}
            {selectedAnalysis.duration}
          </p>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={() =>
              setSelectedAnalysis(null)
            }
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  )}
</div>

);
}

export default AnalysisTypes;

