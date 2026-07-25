import { analysisTypesData } from "../data/analysisTypes";

function AnalysisSelector({
  selectedAnalysis,
  setSelectedAnalysis,
  handleAddAnalysis,
}) {
  return (
    <div className="mt-4">
      <label className="block font-semibold mb-2">
        Analysis
      </label>

      <div className="flex gap-3">
        <select
          value={selectedAnalysis}
          onChange={(e) =>
            setSelectedAnalysis(e.target.value)
          }
          className="flex-1 border rounded-lg p-3"
        >
          <option value="">Select Analysis</option>

          {analysisTypesData.map((analysis) => (
            <option
              key={analysis.id}
              value={analysis.id}
            >
              {analysis.name}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={handleAddAnalysis}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg"
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default AnalysisSelector;