import { translations } from "../../constants/translations";
import { useLanguage } from "../../constants/useLanguage";

function AddEmployee() {
  const { language } = useLanguage();

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        {translations[language].addEmployee}
      </h1>

      <form className="bg-white shadow rounded-xl p-6 space-y-5">

        <div>
          <label className="block mb-2 font-medium">
            {translations[language].fullName}
          </label>

          <input
            type="text"
            className="w-full border rounded-lg p-3"
            placeholder={translations[language].enterEmployeeName}
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            {translations[language].phone}
          </label>

          <input
            type="text"
            className="w-full border rounded-lg p-3"
            placeholder={translations[language].phoneNumber}
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            {translations[language].position}
          </label>

          <select className="w-full border rounded-lg p-3">

            <option>
              {translations[language].labTechnician}
            </option>

            <option>
              {translations[language].receptionist}
            </option>

            <option>
              {translations[language].doctor}
            </option>

          </select>

        </div>

        <div>
          <label className="block mb-2 font-medium">
            {translations[language].salary}
          </label>

          <input
            type="number"
            className="w-full border rounded-lg p-3"
            placeholder={translations[language].salary}
          />
        </div>

        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          {translations[language].saveEmployee}
        </button>

      </form>

    </div>
  );
}

export default AddEmployee;
