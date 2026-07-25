import { FaTrash } from "react-icons/fa";

function SelectedTests({ tests, removeTest }) {
  return (
    <div className="mt-6">
      <h3 className="font-semibold mb-3">
        Selected Analysis
      </h3>

      {tests.length === 0 ? (
        <p className="text-gray-500">
          No analysis selected.
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