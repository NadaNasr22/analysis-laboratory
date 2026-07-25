import AnalysisResultRow from "./AnalysisResultRow";

function AnalysisResultTable({
  results,
  getStatus,
  onView,
    onDelete,
    onEdit,

}) {
    
  return (
<div className="bg-white dark:bg-gray-800 dark:text-white rounded-2xl shadow overflow-hidden mt-6 transition-all">
<div className="grid grid-cols-7 bg-gray-100 dark:bg-gray-700 p-4 font-semibold text-gray-600 dark:text-gray-300">
        <div>Patient</div>

        <div>Analysis</div>

        <div>Result</div>

        <div>Reference</div>

        <div>Status</div>

        <div>Date</div>

        <div className="text-center">Action</div>

      </div>

   {results.map((item) => (
  <AnalysisResultRow
    key={item.id}
    item={item}
    getStatus={getStatus}
    onView={onView}
      onDelete={onDelete}
       onEdit={onEdit}

  />
))}

    </div>
  );
}

export default AnalysisResultTable;