import { FaTrash } from "react-icons/fa";
import { useLanguage } from "../constants/useLanguage";
import { translations } from "../constants/translations";

function SelectedTests({ tests, removeTest }) {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="mt-6">
      <h3 className="font-semibold mb-3">
        {t.selectedAnalysis}
      </h3>

      {tests.length === 0 ? (
        <p className="text-gray-500">
          {t.noAnalysisSelected}
        </p>
      ) : (
        <div className="space-y-2">
          {tests.map((test) => (
            <div
              key={test.id}
              className="flex justify-between items-center border rounded-lg p-3"
            >
              <div>
                <p className="font-medium">
                  {test.name}
                </p>

                <p className="text-gray-500 text-sm">
                  {test.price} EGP
                </p>
              </div>

              <button
                type="button"
                onClick={() => removeTest(test.id)}
                className="text-red-600 hover:text-red-800"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SelectedTests;