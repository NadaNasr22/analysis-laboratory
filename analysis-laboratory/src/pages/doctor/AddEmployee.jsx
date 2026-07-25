function AddEmployee() {
  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Add Employee
      </h1>

      <form className="bg-white shadow rounded-xl p-6 space-y-5">

        <div>
          <label className="block mb-2 font-medium">
            Full Name
          </label>

          <input
            type="text"
            className="w-full border rounded-lg p-3"
            placeholder="Enter employee name"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Phone
          </label>

          <input
            type="text"
            className="w-full border rounded-lg p-3"
            placeholder="Phone number"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Position
          </label>

          <select className="w-full border rounded-lg p-3">

            <option>Lab Technician</option>

            <option>Receptionist</option>

            <option>Doctor</option>

          </select>

        </div>

        <div>
          <label className="block mb-2 font-medium">
            Salary
          </label>

          <input
            type="number"
            className="w-full border rounded-lg p-3"
            placeholder="Salary"
          />
        </div>

        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Save Employee
        </button>

      </form>

    </div>
  );
}

export default AddEmployee;