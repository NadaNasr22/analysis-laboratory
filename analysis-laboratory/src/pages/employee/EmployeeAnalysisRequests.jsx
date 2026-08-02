import { useState } from "react";
import { FaSave, FaChevronLeft, FaChevronRight } from "react-icons/fa";

import {
  getResults,
  saveResults,
} from "../../data/analysisResultsStorage";

import {
  getRequests,
  saveRequests,
} from "../../data/analysisRequestsStorage";

import { getPatients } from "../../data/patientStorage";

import { translations } from "../../constants/translations";
import { useLanguage } from "../../constants/useLanguage";

function EmployeeEnterResult() {
  const { language } = useLanguage();
  const t = translations[language];

  // =========================
  // LOAD DATA
  // =========================
const [patients] = useState(() => getPatients());
const [requests, setRequests] = useState(() => getRequests());

  // =========================
  // SELECTED DATA
  // =========================

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const [resultValues, setResultValues] = useState({});
  const [notes, setNotes] = useState("");

  // =========================
  // PAGINATION
  // =========================

  const [currentPage, setCurrentPage] = useState(1);

  const patientsPerPage = 5;

  const totalPages = Math.ceil(
    patients.length / patientsPerPage
  );

  const startIndex =
    (currentPage - 1) * patientsPerPage;

  const currentPatients = patients.slice(
    startIndex,
    startIndex + patientsPerPage
  );

  // =========================
  // PATIENT REQUESTS
  // =========================

  const patientRequests = selectedPatient
    ? requests.filter((request) => {
        const requestPatientId =
          typeof request.patient === "object"
            ? request.patient?.id
            : null;

        const requestPatientName =
          typeof request.patient === "string"
            ? request.patient
            : request.patient?.name;

        return (
          requestPatientId === selectedPatient.id ||
          requestPatientName === selectedPatient.name
        );
      })
    : [];

  // =========================
  // SELECT PATIENT
  // =========================

  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient);
    setSelectedRequest(null);
    setResultValues({});
    setNotes("");
  };

  // =========================
  // SELECT REQUEST
  // =========================

  const handleSelectRequest = (request) => {
    setSelectedRequest(request);
    setResultValues({});
    setNotes("");
  };

  // =========================
  // RESULT CHANGE
  // =========================

  const handleResultChange = (testId, value) => {
    setResultValues((prev) => ({
      ...prev,
      [testId]: value,
    }));
  };

  // =========================
  // SAVE RESULT
  // =========================

  const handleSaveResult = () => {
    if (!selectedPatient) {
      alert(
        t.selectPatientFirst ||
          "Please select a patient first."
      );
      return;
    }

    if (!selectedRequest) {
      alert(
        t.selectRequest ||
          "Please select an analysis request first."
      );
      return;
    }

    const hasEmptyResult =
      selectedRequest.tests?.some(
        (test) =>
          !resultValues[test.id] ||
          String(resultValues[test.id]).trim() === ""
      );

    if (hasEmptyResult) {
      alert(
        t.enterAllResults ||
          "Please enter all analysis results."
      );
      return;
    }

    // =========================
    // CREATE RESULT
    // =========================

    const newResult = {
      id: `${selectedRequest.id}-${Date.now()}`,
      requestId: selectedRequest.id,

      patientId: selectedPatient.id,
      patient: selectedPatient,

      tests: selectedRequest.tests.map((test) => ({
        ...test,
        result: resultValues[test.id],
      })),

      notes,

      date: new Date().toLocaleDateString(),

      status: "Completed",
    };

    const currentResults = getResults();

    const updatedResults = [
      ...currentResults,
      newResult,
    ];

    saveResults(updatedResults);

    // =========================
    // UPDATE REQUEST
    // =========================

    const currentRequests = getRequests();

    const updatedRequests = currentRequests.map(
      (request) =>
        request.id === selectedRequest.id
          ? {
              ...request,
              status: "Completed",
            }
          : request
    );

    saveRequests(updatedRequests);
    setRequests(updatedRequests);

    alert(
      t.resultSaved ||
        "Analysis result saved successfully."
    );

    // Reset selected request
    setSelectedRequest(null);
    setResultValues({});
    setNotes("");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white p-4 sm:p-6 lg:p-8">

      {/* ================= HEADER ================= */}

      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">
          {t.enterLaboratoryResult ||
            "Enter Laboratory Result"}
        </h1>

        <p className="text-gray-500 dark:text-gray-400 mt-2">
          {t.enterPatientResults ||
            "Select a patient and enter the laboratory analysis results."}
        </p>
      </div>

      {/* ================= PATIENT LIST ================= */}

      {!selectedPatient && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-5 sm:p-6">

          <div className="mb-6">
            <h2 className="text-xl font-bold">
              {t.selectPatient || "Select Patient"}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {t.selectPatientToEnterResult ||
                "Select a patient to view their analysis requests."}
            </p>
          </div>

          <div className="space-y-3">

            {currentPatients.length > 0 ? (
              currentPatients.map((patient) => (
                <button
                  key={patient.id}
                  onClick={() =>
                    handleSelectPatient(patient)
                  }
                  className="w-full flex items-center justify-between gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition text-left"
                >

                  <div className="flex items-center gap-4">

                    <div className="w-11 h-11 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center font-bold">
                      {patient.name?.charAt(0)}
                    </div>

                    <div>
                      <h3 className="font-semibold">
                        {patient.name}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {patient.gender || "-"} •{" "}
                        {patient.age || "-"}{" "}
                        {language === "ar"
                          ? "سنة"
                          : "Years"}
                      </p>
                    </div>

                  </div>

                  <span className="text-gray-400 text-xl">
                    ›
                  </span>

                </button>
              ))
            ) : (
              <div className="text-center py-10 text-gray-500">
                {t.noPatientsFound ||
                  "No patients found."}
              </div>
            )}

          </div>

          {/* ================= PAGINATION ================= */}

          {totalPages > 1 && (
            <div className="flex justify-end items-center gap-2 mt-6">

              <button
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage(
                    (prev) => prev - 1
                  )
                }
                className="w-8 h-8 rounded-lg border flex items-center justify-center disabled:opacity-40"
              >
                <FaChevronLeft size={12} />
              </button>

              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              ).map((page) => (
                <button
                  key={page}
                  onClick={() =>
                    setCurrentPage(page)
                  }
                  className={`w-8 h-8 rounded-lg text-sm ${
                    currentPage === page
                      ? "bg-blue-600 text-white"
                      : "border hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                disabled={
                  currentPage === totalPages
                }
                onClick={() =>
                  setCurrentPage(
                    (prev) => prev + 1
                  )
                }
                className="w-8 h-8 rounded-lg border flex items-center justify-center disabled:opacity-40"
              >
                <FaChevronRight size={12} />
              </button>

            </div>
          )}

        </div>
      )}

      {/* ================= PATIENT REQUESTS ================= */}

      {selectedPatient && !selectedRequest && (
        <div className="space-y-6">

          {/* Patient Header */}

          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 sm:p-6">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

              <div>
                <p className="text-sm text-gray-500">
                  {t.selectedPatient ||
                    "Selected Patient"}
                </p>

                <h2 className="text-2xl font-bold mt-1">
                  {selectedPatient.name}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  {selectedPatient.gender || "-"} •{" "}
                  {selectedPatient.age || "-"}{" "}
                  {language === "ar"
                    ? "سنة"
                    : "Years"}
                </p>
              </div>

              <button
                onClick={() => {
                  setSelectedPatient(null);
                  setSelectedRequest(null);
                }}
                className="px-4 py-2 rounded-xl border hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                ←{" "}
                {t.changePatient ||
                  "Change Patient"}
              </button>

            </div>

          </div>

          {/* Requests */}

          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 sm:p-6">

            <h2 className="text-xl font-bold mb-2">
              {t.analysisRequests ||
                "Analysis Requests"}
            </h2>

            <p className="text-sm text-gray-500 mb-6">
              {t.patientRequests ||
                "Analysis requests already registered for this patient."}
            </p>

            {patientRequests.length > 0 ? (
              <div className="space-y-3">

                {patientRequests.map((request) => {

                  const alreadyCompleted =
                    request.status === "Completed";

                  return (
                    <button
                      key={request.id}
                      disabled={alreadyCompleted}
                      onClick={() =>
                        handleSelectRequest(
                          request
                        )
                      }
                      className={`w-full text-left p-4 rounded-xl border transition ${
                        alreadyCompleted
                          ? "opacity-60 cursor-not-allowed bg-gray-50 dark:bg-gray-900"
                          : "hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                      }`}
                    >

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                        <div>
                          <h3 className="font-semibold">
                            {t.request ||
                              "Request"}{" "}
                            #{request.id}
                          </h3>

                          <p className="text-sm text-gray-500 mt-1">
                            {request.tests?.length || 0}{" "}
                            {language === "ar"
                              ? "تحاليل"
                              : "tests"}{" "}
                            •{" "}
                            {request.date}
                          </p>
                        </div>

                        <span
                          className={`w-fit px-3 py-1 rounded-full text-sm ${
                            alreadyCompleted
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {alreadyCompleted
                            ? t.completed ||
                              "Completed"
                            : t.pending ||
                              "Pending"}
                        </span>

                      </div>

                    </button>
                  );
                })}

              </div>
            ) : (
              <div className="text-center py-12">

                <div className="text-5xl mb-4">
                  🧪
                </div>

                <p className="text-gray-500">
                  {t.noRequestsForPatient ||
                    "No analysis requests found for this patient."}
                </p>

              </div>
            )}

          </div>

        </div>
      )}

      {/* ================= ENTER RESULT ================= */}

      {selectedPatient && selectedRequest && (
        <div className="space-y-6">

          {/* Patient */}

          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 sm:p-6">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

              <div>
                <p className="text-sm text-gray-500">
                  {t.patient || "Patient"}
                </p>

                <h2 className="text-2xl font-bold mt-1">
                  {selectedPatient.name}
                </h2>
              </div>

              <button
                onClick={() =>
                  setSelectedRequest(null)
                }
                className="px-4 py-2 rounded-xl border hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                ←{" "}
                {t.backToRequests ||
                  "Back to Requests"}
              </button>

            </div>

          </div>

          {/* Tests */}

          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 sm:p-6">

            <h2 className="text-xl font-bold mb-6">
              {t.enterResults ||
                "Enter Results"}
            </h2>

            <div className="space-y-4">

              {selectedRequest.tests?.map(
                (test) => (
                  <div
                    key={test.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-xl p-4"
                  >

                    <div className="mb-3">
                      <h3 className="font-semibold">
                        {test.name}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {test.category}
                      </p>
                    </div>

                    <input
                      type="text"
                      value={
                        resultValues[test.id] || ""
                      }
                      onChange={(e) =>
                        handleResultChange(
                          test.id,
                          e.target.value
                        )
                      }
                      placeholder={
                        t.enterResult ||
                        "Enter result..."
                      }
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                  </div>
                )
              )}

            </div>

          </div>

          {/* Notes */}

          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 sm:p-6">

            <h2 className="font-bold mb-3">
              {t.notes || "Notes"}
            </h2>

            <textarea
              rows={4}
              value={notes}
              onChange={(e) =>
                setNotes(e.target.value)
              }
              placeholder={
                t.writeNotes ||
                "Write notes..."
              }
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* Save */}

          <div className="flex justify-end">

            <button
              onClick={handleSaveResult}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-xl font-medium transition"
            >
              <FaSave />

              {t.saveResult ||
                "Save Result"}
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default EmployeeEnterResult;
