import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

function AnalysisTypeRow({
  analysis,
  onDelete,
  onView,
  onEdit,

}){
  return (
    <div className="grid grid-cols-5 p-4 border-b items-center">

      <div>{analysis.name}</div>

      <div>{analysis.category}</div>

      <div>${analysis.price}</div>

      <div>{analysis.duration}</div>

      <div className="flex justify-end gap-3">

<button onClick={() => onView(analysis)}>
            <FaEye className="text-blue-500" />
        </button>

       <button onClick={() => onEdit(analysis)}>
  <FaEdit className="text-yellow-500 hover:text-yellow-600" />
</button>

        <button onClick={() => onDelete(analysis.id)}>
          <FaTrash className="text-red-500" />
        </button>

      </div>

    </div>
  );
}

export default AnalysisTypeRow;