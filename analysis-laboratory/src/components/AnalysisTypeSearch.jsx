function AnalysisTypeSearch({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="Search analysis..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
className="w-full p-3 border dark:border-gray-600 bg-white 
dark:bg-gray-800 text-gray-900 dark:text-white 
rounded-xl mt-6 mb-6 outline-none focus:ring-2 
focus:ring-blue-500 transition"    />
  );
}

export default AnalysisTypeSearch;