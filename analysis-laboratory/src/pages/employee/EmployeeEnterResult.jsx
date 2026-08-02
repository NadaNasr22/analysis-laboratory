import { useState } from "react";
import {
  FaSave,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

import {
  saveResults,
  getResults,
} from "../../data/resultStorage";

import {
  getPatients,
  savePatients,
} from "../../data/patientStorage";

import { getAnalysisTypes } from "../../data/analysisTypesStorage";
import { translations } from "../../constants/translations";
import { useLanguage } from "../../constants/useLanguage";

function EmployeeEnterResult() {
  const { language } = useLanguage();
  const t = translations[language];

  const isArabic = language === "ar";

  const patients = getPatients();
  const analysisTypes = getAnalysisTypes();

  const [patientId, setPatientId] = useState("");
  const [analysisId, setAnalysisId] = useState("");

  const [tests, setTests] = useState([]);

  const testsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const [saveMessage, setSaveMessage] = useState("");

  // ==================== Selected Analysis ====================

  const selectedAnalysis = analysisTypes.find(
    (item) => String(item.id) === String(analysisId)
  );

  // ==================== Pagination ====================

  const totalPages = Math.ceil(
    tests.length / testsPerPage
  );

  const startIndex =
    (currentPage - 1) * testsPerPage;

  const currentTests = tests.slice(
    startIndex,
    startIndex + testsPerPage
  );

  // ==================== Select Analysis ====================

  const handleAnalysisChange = (e) => {
    const value = e.target.value;

    setAnalysisId(value);
    setCurrentPage(1);
    setSaveMessage("");

    if (!value) {
      setTests([]);
      return;
    }

    const selected = analysisTypes.find(
      (item) => String(item.id) === String(value)
    );

    if (!selected || !selected.fields) {
      setTests([]);
      return;
    }

    const generatedTests = selected.fields.map(
      (field) => ({
        name: field.name,
        result: "",
        unit: field.unit || "",
        range: field.reference || "",
      })
    );

    setTests(generatedTests);
  };

  // ==================== Update Result ====================

  const updateResult = (index, value) => {
    const realIndex = startIndex + index;

    setTests((prevTests) =>
      prevTests.map((test, i) =>
        i === realIndex
          ? {
              ...test,
              result: value,
            }
          : test
      )
    );
  };

  // ==================== Save Result ====================

  const handleSave = () => {
    setSaveMessage("");

    // Check patient
    if (!patientId) {
      setSaveMessage(
        isArabic
          ? "من فضلك اختر المريض أولاً."
          : "Please select a patient first."
      );

      return;
    }

    // Check analysis
    if (!analysisId) {
      setSaveMessage(
        isArabic
          ? "من فضلك اختر التحليل أولاً."
          : "Please select an analysis first."
      );

      return;
    }

    // Check tests
    if (!tests.length) {
      setSaveMessage(
        isArabic
          ? "هذا التحليل لا يحتوي على اختبارات."
          : "This analysis has no tests."
      );

      return;
    }

    // Check every result
    const hasEmptyResult = tests.some(
      (test) =>
        test.result === "" ||
        test.result === null ||
        test.result === undefined
    );

    if (hasEmptyResult) {
      setSaveMessage(
        isArabic
          ? "من فضلك أدخل نتيجة جميع الاختبارات قبل الحفظ."
          : "Please enter all test results before saving."
      );

      return;
    }

    // Find patient
    const selectedPatient = patients.find(
      (item) =>
        String(item.id) === String(patientId)
    );

    if (!selectedPatient) {
      setSaveMessage(
        isArabic
          ? "المريض غير موجود."
          : "Patient not found."
      );

      return;
    }

    // Find analysis
    const selected = analysisTypes.find(
      (item) =>
        String(item.id) === String(analysisId)
    );

    if (!selected) {
      setSaveMessage(
        isArabic
          ? "التحليل غير موجود."
          : "Analysis not found."
      );

      return;
    }

    // ==================== Get Old Results ====================

    const oldResults = getResults();

    // Create simple unique ID without Date.now()
    const newResultId =
      oldResults.length > 0
        ? Math.max(
            ...oldResults.map(
              (result) =>
                Number(result.id) || 0
            )
          ) + 1
        : 1;

    // ==================== New Result ====================

    const newResult = {
      id: newResultId,

      patientId: selectedPatient.id,
      patientName: selectedPatient.name,

      analysisId: selected.id,
      analysisName: selected.name,

      tests: tests.map((test) => ({
        name: test.name,
        result: test.result,
        unit: test.unit,
        range: test.range,
      })),

      status: "Completed",
    };

    // ==================== Save Result ====================

    saveResults([
      ...oldResults,
      newResult,
    ]);

    // ==================== Update Patient ====================

const currentPatients = getPatients();

const updatedPatients = currentPatients.map(
  (patient) => {
    if (
      String(patient.id) !==
      String(selectedPatient.id)
    ) {
      return patient;
    }

    const oldAnalyses =
      Array.isArray(patient.analyses)
        ? patient.analyses
        : [];

    const analysisAlreadyExists =
      oldAnalyses.some((analysis) => {
        if (typeof analysis === "string") {
          return analysis === selected.name;
        }

        if (
          analysis &&
          typeof analysis === "object"
        ) {
          return (
            String(analysis.analysisId) ===
            String(selected.id)
          );
        }

        return false;
      });

    return {
      ...patient,

      analyses: analysisAlreadyExists
        ? oldAnalyses
        : [
            ...oldAnalyses,
            selected.name,
          ],
    };
  }
);

savePatients(updatedPatients);

    // ==================== Success Message ====================

    setSaveMessage(
      isArabic
        ? "تم حفظ نتيجة التحليل بنجاح."
        : "Laboratory result saved successfully."
    );

    // ==================== Reset Form ====================

    setPatientId("");
    setAnalysisId("");
    setTests([]);
    setCurrentPage(1);
  };

  // ==================== Translation ====================

  const getAnalysisName = (name) => {
    const translatedNames = {
      "Complete Blood Count":
        "صورة دم كاملة",

      "Blood Sugar":
        "تحليل سكر الدم",

      "Urine Analysis":
        "تحليل البول",
    };

    return isArabic
      ? translatedNames[name] || name
      : name;
  };

  const getTestName = (name) => {
    const translatedTests = {
      Hemoglobin: "الهيموجلوبين",
      RBC: "كرات الدم الحمراء",
      WBC: "كرات الدم البيضاء",
      Platelets: "الصفائح الدموية",
      MCV: "متوسط حجم كرات الدم الحمراء",
      MCH: "متوسط هيموجلوبين الكرية",
      MCHC: "متوسط تركيز الهيموجلوبين",

      "Blood Sugar": "سكر الدم",

      Color: "اللون",
      Appearance: "المظهر",
      Protein: "البروتين",
      Glucose: "الجلوكوز",
    };

    return isArabic
      ? translatedTests[name] || name
      : name;
  };

  // ==================== Render ====================

  return (
    <div
      dir={isArabic ? "rtl" : "ltr"}
      className="
        min-h-screen
        bg-gray-50 dark:bg-gray-900
        text-gray-800 dark:text-white
        p-4 sm:p-6 lg:p-8
        overflow-x-hidden
      "
    >
      {/* ==================== Header ==================== */}

      <div
        className={`mb-6 ${
          isArabic
            ? "text-right"
            : "text-left"
        }`}
      >
        <h1 className="text-2xl sm:text-3xl font-bold">
          {t.enterLaboratoryResult ||
            (isArabic
              ? "إدخال نتيجة التحليل"
              : "Enter Laboratory Result")}
        </h1>

        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-2">
          {t.enterLaboratoryResultDescription ||
            (isArabic
              ? "قم بإدخال نتيجة التحليل الخاصة بالمريض"
              : "Enter the laboratory result for the patient")}
        </p>
      </div>

      {/* ==================== Save Message ==================== */}

      {saveMessage && (
        <div
          className={`
            mb-4
            px-4 py-3
            rounded-xl
            text-sm
            font-medium
            ${
              saveMessage.includes(
                isArabic
                  ? "تم حفظ"
                  : "successfully"
              )
                ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300"
                : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300"
            }
          `}
        >
          {saveMessage}
        </div>
      )}

      {/* ==================== Main Card ==================== */}

      <div
        className="
          bg-white dark:bg-gray-800
          border border-gray-200 dark:border-gray-700
          rounded-2xl
          shadow-sm
          p-4 sm:p-6
        "
      >
        {/* ==================== Patient + Analysis ==================== */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">

          {/* ==================== Patient ==================== */}

          <div>
            <label className="block text-sm font-medium mb-2">
              {t.patientName ||
                (isArabic
                  ? "اسم المريض"
                  : "Patient Name")}
            </label>

            <select
              value={patientId}
              onChange={(e) =>
                setPatientId(e.target.value)
              }
              className="
                w-full
                px-4 py-3
                rounded-xl
                border border-gray-300 dark:border-gray-600
                bg-white dark:bg-gray-700
                text-gray-800 dark:text-white
                outline-none
                focus:ring-2 focus:ring-blue-500
              "
            >
              <option value="">
                {t.selectPatient ||
                  (isArabic
                    ? "اختر المريض"
                    : "Select Patient")}
              </option>

              {patients.length > 0 ? (
                patients.map((patient) => (
                  <option
                    key={patient.id}
                    value={patient.id}
                  >
                    {patient.name}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  {isArabic
                    ? "لا يوجد مرضى مسجلون"
                    : "No registered patients"}
                </option>
              )}
            </select>

            {/* Selected Patient */}

            {patientId && (
              <div
                className="
                  mt-3
                  px-4 py-3
                  rounded-xl
                  bg-blue-50 dark:bg-blue-900/20
                  border border-blue-100 dark:border-blue-800
                "
              >
                {(() => {
                  const selectedPatient =
                    patients.find(
                      (item) =>
                        String(item.id) ===
                        String(patientId)
                    );

                  if (!selectedPatient) {
                    return null;
                  }

                  return (
                    <div>
                      <p className="font-semibold text-blue-700 dark:text-blue-300">
                        {selectedPatient.name}
                      </p>

                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {selectedPatient.gender ||
                          "-"}{" "}
                        •{" "}
                        {selectedPatient.age ||
                          "-"}{" "}
                        {isArabic
                          ? "سنة"
                          : "Years"}
                      </p>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>

          {/* ==================== Analysis ==================== */}

          <div>
            <label className="block text-sm font-medium mb-2">
              {t.analysis ||
                (isArabic
                  ? "التحليل"
                  : "Analysis")}
            </label>

            <select
              value={analysisId}
              onChange={handleAnalysisChange}
              className="
                w-full
                px-4 py-3
                rounded-xl
                border border-gray-300 dark:border-gray-600
                bg-white dark:bg-gray-700
                text-gray-800 dark:text-white
                outline-none
                focus:ring-2 focus:ring-blue-500
              "
            >
              <option value="">
                {t.selectAnalysis ||
                  (isArabic
                    ? "اختر التحليل"
                    : "Select Analysis")}
              </option>

              {analysisTypes.map((item) => (
                <option
                  key={item.id}
                  value={item.id}
                >
                  {getAnalysisName(item.name)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ==================== Tests Header ==================== */}

        <div
          className="
            flex flex-col
            sm:flex-row
            sm:items-center
            sm:justify-between
            gap-3
            mb-4
          "
        >
          <div
            className={
              isArabic
                ? "text-right"
                : "text-left"
            }
          >
            <h2 className="text-lg sm:text-xl font-bold">
              {t.tests ||
                (isArabic
                  ? "التحاليل"
                  : "Tests")}
            </h2>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {selectedAnalysis
                ? isArabic
                  ? `أدخل نتائج ${getAnalysisName(
                      selectedAnalysis.name
                    )}`
                  : `Enter ${selectedAnalysis.name} results`
                : t.enterTestResults ||
                  (isArabic
                    ? "اختر التحليل أولاً"
                    : "Select an analysis first")}
            </p>
          </div>
        </div>

        {/* ==================== Table Header ==================== */}

        {tests.length > 0 && (
          <div
            className="
              hidden md:grid
              grid-cols-4
              gap-3
              px-2
              mb-2
            "
          >
            <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
              {t.testName ||
                (isArabic
                  ? "اسم الاختبار"
                  : "Test Name")}
            </span>

            <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
              {t.result ||
                (isArabic
                  ? "النتيجة"
                  : "Result")}
            </span>

            <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
              {t.unit ||
                (isArabic
                  ? "الوحدة"
                  : "Unit")}
            </span>

            <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
              {t.referenceRange ||
                (isArabic
                  ? "المعدل الطبيعي"
                  : "Reference Range")}
            </span>
          </div>
        )}

        {/* ==================== Tests ==================== */}

        <div className="space-y-3">
          {currentTests.map(
            (test, index) => (
              <div
                key={startIndex + index}
                className="
                  grid
                  grid-cols-1
                  md:grid-cols-4
                  gap-3
                  p-4
                  bg-gray-50 dark:bg-gray-700/50
                  border border-gray-200 dark:border-gray-600
                  rounded-xl
                "
              >
                {/* Test Name */}

                <div>
                  <label className="md:hidden block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                    {t.testName ||
                      (isArabic
                        ? "اسم الاختبار"
                        : "Test Name")}
                  </label>

                  <div
                    className="
                      w-full
                      border border-gray-300 dark:border-gray-600
                      bg-gray-100 dark:bg-gray-800
                      rounded-lg
                      px-3 py-2.5
                    "
                  >
                    {getTestName(test.name)}
                  </div>
                </div>

                {/* Result */}

                <div>
                  <label className="md:hidden block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                    {t.result ||
                      (isArabic
                        ? "النتيجة"
                        : "Result")}
                  </label>

                  <input
                    type="text"
                    placeholder={
                      t.enterResult ||
                      (isArabic
                        ? "أدخل النتيجة"
                        : "Enter result")
                    }
                    value={test.result}
                    onChange={(e) =>
                      updateResult(
                        index,
                        e.target.value
                      )
                    }
                    className="
                      w-full
                      border border-gray-300 dark:border-gray-600
                      bg-white dark:bg-gray-800
                      rounded-lg
                      px-3 py-2.5
                      outline-none
                      focus:ring-2 focus:ring-blue-500
                    "
                  />
                </div>

                {/* Unit */}

                <div>
                  <label className="md:hidden block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                    {t.unit ||
                      (isArabic
                        ? "الوحدة"
                        : "Unit")}
                  </label>

                  <div
                    className="
                      w-full
                      border border-gray-300 dark:border-gray-600
                      bg-gray-100 dark:bg-gray-800
                      rounded-lg
                      px-3 py-2.5
                      text-gray-600 dark:text-gray-300
                    "
                  >
                    {test.unit || "-"}
                  </div>
                </div>

                {/* Reference Range */}

                <div>
                  <label className="md:hidden block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                    {t.referenceRange ||
                      (isArabic
                        ? "المعدل الطبيعي"
                        : "Reference Range")}
                  </label>

                  <div
                    className="
                      w-full
                      border border-gray-300 dark:border-gray-600
                      bg-gray-100 dark:bg-gray-800
                      rounded-lg
                      px-3 py-2.5
                      text-gray-600 dark:text-gray-300
                    "
                  >
                    {test.range || "-"}
                  </div>
                </div>
              </div>
            )
          )}
        </div>

        {/* ==================== No Tests ==================== */}

        {!tests.length && (
          <div
            className="
              text-center
              py-10
              text-gray-400 dark:text-gray-500
            "
          >
            {isArabic
              ? "اختر التحليل لعرض الاختبارات"
              : "Select an analysis to display its tests"}
          </div>
        )}

        {/* ==================== Pagination ==================== */}

        {totalPages > 1 && (
          <div
            className={`
              flex
              items-center
              gap-1.5
              mt-5
              ${
                isArabic
                  ? "justify-start"
                  : "justify-end"
              }
            `}
          >
            {/* Previous */}

            <button
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage(
                  (prev) => prev - 1
                )
              }
              className="
                flex items-center gap-1
                px-2.5 py-1.5
                text-xs
                rounded-lg
                border border-gray-300 dark:border-gray-600
                disabled:opacity-40
                hover:bg-gray-100 dark:hover:bg-gray-700
              "
            >
              {isArabic ? (
                <FaChevronRight size={10} />
              ) : (
                <FaChevronLeft size={10} />
              )}

              <span>
                {t.previous ||
                  (isArabic
                    ? "السابق"
                    : "Previous")}
              </span>
            </button>

            {/* Numbers */}

            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            ).map((page) => (
              <button
                key={page}
                onClick={() =>
                  setCurrentPage(page)
                }
                className={`
                  w-7 h-7
                  text-xs
                  rounded-lg
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

            {/* Next */}

            <button
              disabled={
                currentPage === totalPages
              }
              onClick={() =>
                setCurrentPage(
                  (prev) => prev + 1
                )
              }
              className="
                flex items-center gap-1
                px-2.5 py-1.5
                text-xs
                rounded-lg
                border border-gray-300 dark:border-gray-600
                disabled:opacity-40
                hover:bg-gray-100 dark:hover:bg-gray-700
              "
            >
              <span>
                {t.next ||
                  (isArabic
                    ? "التالي"
                    : "Next")}
              </span>

              {isArabic ? (
                <FaChevronLeft size={10} />
              ) : (
                <FaChevronRight size={10} />
              )}
            </button>
          </div>
        )}

        {/* ==================== Save ==================== */}

        <div
          className={`
            flex
            ${
              isArabic
                ? "justify-start"
                : "justify-end"
            }
            mt-6
            pt-5
            border-t border-gray-200 dark:border-gray-700
          `}
        >
          <button
            onClick={handleSave}
            className="
              w-full sm:w-auto
              flex items-center justify-center gap-2
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-6 py-3
              rounded-xl
              font-medium
              transition
            "
          >
            <FaSave />

            {t.saveResult ||
              (isArabic
                ? "حفظ النتيجة"
                : "Save Result")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmployeeEnterResult;


