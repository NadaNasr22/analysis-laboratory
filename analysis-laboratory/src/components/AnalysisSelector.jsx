import { useState } from "react";
import { getAnalysisTypes } from "../data/analysisStorage";
import { useLanguage } from "../constants/useLanguage";
import { translations } from "../constants/translations";

function AnalysisSelector({
  selectedAnalysis,
  setSelectedAnalysis,
  handleAddAnalysis,
}) {
  const { language } = useLanguage();
  const t = translations[language];

  const isArabic = language === "ar";

  const analysisTypes = getAnalysisTypes();

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const totalPages = Math.ceil(
    analysisTypes.length / itemsPerPage
  );

  const startIndex =
    (currentPage - 1) * itemsPerPage;

  const currentAnalyses = analysisTypes.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="mt-4">

      {/* Label */}
      <label className="block font-semibold mb-2">
        {t.analysis ||
          (isArabic ? "التحليل" : "Analysis")}
      </label>

      {/* Select + Add */}
      <div className="flex flex-col sm:flex-row gap-3">

        <select
          value={selectedAnalysis}
          onChange={(e) =>
            setSelectedAnalysis(e.target.value)
          }
          className="
            flex-1
            border
            border-gray-300
            dark:border-gray-600
            rounded-lg
            p-3
            bg-white
            dark:bg-gray-700
            dark:text-white
            outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        >

          <option value="">
            {t.selectAnalysis ||
              (isArabic
                ? "اختر التحليل"
                : "Select Analysis")}
          </option>

          {currentAnalyses.map((analysis) => (
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
          disabled={!selectedAnalysis}
          className="
            bg-blue-600
            hover:bg-blue-700
            disabled:opacity-50
            disabled:cursor-not-allowed
            text-white
            px-6
            py-3
            rounded-lg
            transition
          "
        >
          {t.add ||
            (isArabic ? "إضافة" : "Add")}
        </button>

      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div
          className="
            flex
            items-center
            justify-center
            gap-2
            mt-3
          "
        >

          {Array.from(
            { length: totalPages },
            (_, index) => index + 1
          ).map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => {
                setCurrentPage(page);
                setSelectedAnalysis("");
              }}
              className={`
                w-8
                h-8
                rounded-lg
                text-sm
                transition
                ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                }
              `}
            >
              {page}
            </button>
          ))}

        </div>
      )}

    </div>
  );
}

export default AnalysisSelector;


