import { FaEye, FaTrash, FaEdit } from "react-icons/fa";
function AnalysisResultRow({
  item,
  getStatus,
  onView,
    onDelete,
      onEdit,


}) {

  const status = getStatus(
    item.result,
    item.min,
    item.max
  );

  const statusColor =
    status === "Normal"
      ? "bg-green-100 text-green-700"
      : status === "High"
      ? "bg-red-100 text-red-700"
      : "bg-yellow-100 text-yellow-700";

  return (
    <div className="grid grid-cols-7 items-center p-4 border-b
border-gray-200 dark:border-gray-700
bg-white dark:bg-gray-800
hover:bg-gray-50 dark:hover:bg-gray-700
text-gray-900 dark:text-white
transition">

      <div className="font-medium">
        {item.patient}
      </div>

      <div>{item.analysis}</div>

      <div className="font-bold">
        {item.result} {item.unit}
      </div>

      <div>
        {item.min} - {item.max}
      </div>

      <div>
        <span
          className={`px-3 py-1 rounded-full text-sm ${statusColor}`}
        >
          {status}
        </span>
      </div>

      <div>{item.date}</div>

      <div className="text-center">

       <button onClick={() => onView(item)}>
  <FaEye className="text-blue-600 hover:scale-110 transition  mr-5" />
</button>
<button onClick={() => onEdit(item)}>
  <FaEdit className="text-yellow-500 hover:scale-110 transition mr-5" />
</button>
<button onClick={() => onDelete(item)}>
  <FaTrash className="text-red-600 hover:scale-110 transition mr-5" />
</button>

      </div>

    </div>
  );
}

export default AnalysisResultRow;