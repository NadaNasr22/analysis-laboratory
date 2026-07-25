import EmployeeRow from "./EmployeeRow";

function EmployeeTable({
  employees,
  onDelete,
  onView,
  onEdit,
}) {
  return (
    <div className="bg-white dark:bg-gray-800 dark:text-white rounded-xl shadow overflow-hidden">

      <div className="grid grid-cols-5 font-bold p-3 bg-white dark:bg-gray-800 dark:text-white bg-gray-100">
        <div>Name</div>
        <div>Position</div>
        <div>Phone</div>
        <div>Salary</div>
        <div className="text-right">Actions</div>
      </div>
{employees.length > 0 ? (
  employees.map((employee) => (
    <EmployeeRow
      key={employee.id}
      employee={employee}
      onDelete={onDelete}
      onView={onView}
      onEdit={onEdit}
    />
  ))
) : (
  <div className="p-10 text-center text-gray-500">
    No employees found.
  </div>
)}

    </div>
  );
}

export default EmployeeTable;