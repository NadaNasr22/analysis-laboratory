function EmployeeSearch({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="Search employee..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full mb-5 p-3 border rounded-lg"
    />
  );
}

export default EmployeeSearch;