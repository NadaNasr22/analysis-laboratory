import AnalysisTypeRow from "./AnalysisTypeRow";

function AnalysisTypeTable({
analysisList,
onDelete,
onView,
onEdit,

}){
  return (
<div className="bg-white dark:bg-gray-800 dark:text-white rounded-xl shadow overflow-hidden transition">
<div className="grid grid-cols-5 font-bold bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white p-4">
        <div>Name</div>
        <div>Category</div>
        <div>Price</div>
        <div>Duration</div>
        <div className="text-right">Actions</div>

      </div>

      {analysisList.map((analysis) => (
       <AnalysisTypeRow
  key={analysis.id}
  analysis={analysis}
  onDelete={onDelete}
  onView={onView}
  onEdit={onEdit}

/>
      ))}

    </div>
  );
}

export default AnalysisTypeTable;