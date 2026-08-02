import { useState } from "react";
import AnalysisTypeRow from "./AnalysisTypeRow";
import { useLanguage } from "../constants/useLanguage";
import { translations } from "../constants/translations";

function AnalysisTypeTable({
  analysisList,
  onDelete,
  onView,
  onEdit,
}) {

  const { language } = useLanguage();
  const t = translations[language];

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const totalPages = Math.ceil(
    analysisList.length / itemsPerPage
  );

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const currentAnalysis = analysisList.slice(
    indexOfFirst,
    indexOfLast
  );

  return (
    <div className="bg-white dark:bg-gray-800 dark:text-white rounded-xl shadow overflow-x-auto transition">

      <div className="grid min-w-[750px] grid-cols-[2fr_1.5fr_1fr_1fr_1.5fr] font-bold bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white p-4">

        <div>{t.name}</div>

        <div>{t.category}</div>

        <div>{t.price}</div>

        <div>{t.duration}</div>

        <div className="text-right">
          {t.actions}
        </div>

      </div>

      {currentAnalysis.map((analysis) => (

        <AnalysisTypeRow
          key={analysis.id}
          analysis={analysis}
          onDelete={onDelete}
          onView={onView}
          onEdit={onEdit}
        />

      ))}

      <div className="flex justify-end items-center p-4">

        <div className="flex items-center gap-1 mt-3 sm:mt-0">

          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-2 py-1 text-sm border rounded-md disabled:opacity-50"
          >
            {t.prev}
          </button>

          {[...Array(totalPages)].map((_, index) => (

            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-2 py-1 text-sm rounded-md border ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : ""
              }`}
            >
              {index + 1}
            </button>

          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-2 py-1 text-sm border rounded-md disabled:opacity-50"
          >
            {t.next}
          </button>

        </div>

      </div>

    </div>
  );
}

export default AnalysisTypeTable;
