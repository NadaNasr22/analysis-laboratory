import {
  FaEye,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

function EmployeeRow({
  employee,
  onDelete,
  onView,
  onEdit,
}) {
  return (
    <div className="grid grid-cols-5 p-3 border-t items-center">

      <div>{employee.name}</div>

      <div>{employee.position}</div>

      <div>{employee.phone}</div>

      <div>${employee.salary}</div>

      <div className="flex justify-end gap-2">

        <button
          onClick={() => onView(employee)}
          className="bg-blue-500 text-white p-2 rounded"
        >
          <FaEye />
        </button>

        <button
          onClick={() => onEdit(employee)}
          className="bg-yellow-500 text-white p-2 rounded"
        >
          <FaEdit />
        </button>

        <button
          onClick={() => onDelete(employee.id)}
          className="bg-red-500 text-white p-2 rounded"
        >
          <FaTrash />
        </button>

      </div>

    </div>
  );
}

export default EmployeeRow;