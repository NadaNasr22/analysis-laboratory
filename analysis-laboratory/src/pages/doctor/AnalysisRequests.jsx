import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  getRequests,
  saveRequests,
} from "../../data/analysisRequestsStorage";

import { useLanguage } from "../../constants/useLanguage";
import { translations } from "../../constants/translations";

import { getPatients } from "../../data/patientStorage";

import {
  getAnalysisTypes,
} from "../../data/analysisTypesStorage";

import {
  getInvoices,
  saveInvoices,
} from "../../data/invoiceStorage";

function AnalysisRequests() {
  const location = useLocation();
  const navigate = useNavigate();

  const { language } = useLanguage();
  const t = translations[language];

  // ================= PATIENT FROM REQUEST =================

  const patientFromRequest =
    location.state?.patient || null;

  // ================= REQUESTS =================

  const [requests, setRequests] = useState(
    getRequests()
  );

  // ================= STEPS =================

  const [step, setStep] = useState(1);

  // ================= REQUEST PAGINATION =================

  const [currentPage, setCurrentPage] = useState(1);

  const requestsPerPage = 5;

  // ================= SELECTED TESTS =================

  const [selectedTests, setSelectedTests] =
    useState([]);

  const [testPage, setTestPage] = useState(1);

  const testsPerPage = 5;

  // ================= PRIORITY / NOTE =================

  const [priority, setPriority] =
    useState("Normal");

  const [note, setNote] = useState("");

  // ================= PATIENTS =================

  const [patients] = useState(
    getPatients()
  );

  // IMPORTANT:
  // This page reads analysis types from
  // the same storage used by the Doctor Analysis Types page.

  const analysisList = getAnalysisTypes();

  const [selectedPatient, setSelectedPatient] =
    useState(patientFromRequest);

  // ================= NEW PATIENT MODAL =================

  const [showPatientModal, setShowPatientModal] =
    useState(false);

  const [newPatientName, setNewPatientName] =
    useState("");

  const [newPatientAge, setNewPatientAge] =
    useState("");

  const [newPatientGender, setNewPatientGender] =
    useState("Male");

  const [newPatientPhone, setNewPatientPhone] =
    useState("");

  // ================= SEARCH =================

  const [searchPatient, setSearchPatient] =
    useState("");

  const filteredPatients =
    patients.filter((patient) =>
      patient.name
        ?.toLowerCase()
        .includes(
          searchPatient.toLowerCase()
        )
    );

  // ================= PATIENT REQUESTS =================

  const patientRequests =
    selectedPatient
      ? requests.filter(
          (request) =>
            String(request.patientId) ===
              String(selectedPatient.id) ||
            String(request.patient?.id) ===
              String(selectedPatient.id)
        )
      : [];

  // ================= ADD NEW PATIENT =================

  const addNewPatient = () => {
    if (
      !newPatientName ||
      !newPatientAge
    ) {
      return;
    }

    const newPatient = {
      id: Date.now(),
      name: newPatientName,
      age: Number(newPatientAge),
      gender: newPatientGender,
      phone: newPatientPhone,
      address: "",
      email: "",
      bloodType: "",
      total: 0,
      paid: 0,
      status: "Pending",
      analyses: [],
    };

    const currentPatients =
      getPatients();

    const updatedPatients = [
      ...currentPatients,
      newPatient,
    ];

    localStorage.setItem(
      "patients",
      JSON.stringify(
        updatedPatients
      )
    );

    setSelectedPatient(
      newPatient
    );

    setNewPatientName("");
    setNewPatientAge("");
    setNewPatientGender("Male");
    setNewPatientPhone("");

    setShowPatientModal(false);
  };

  // ================= TOGGLE TEST =================

  const toggleTest = (test) => {
    const exists =
      selectedTests.some(
        (item) =>
          String(item.id) ===
          String(test.id)
      );

    if (exists) {
      setSelectedTests(
        (prev) =>
          prev.filter(
            (item) =>
              String(item.id) !==
              String(test.id)
          )
      );
    } else {
      setSelectedTests(
        (prev) => [
          ...prev,
          test,
        ]
      );
    }
  };

  // ================= CREATE REQUEST =================

  const createRequest = () => {
    if (!selectedPatient) {
      alert(
        t.selectPatientFirst ||
          "Please select a patient first."
      );

      return;
    }

    if (
      selectedTests.length === 0
    ) {
      alert(
        t.selectAtLeastOneTest ||
          "Please select at least one test."
      );

      return;
    }

    const requestId =
      Date.now();

    // ================= REQUEST =================

    const newRequest = {
      id: requestId,

      patientId:
        selectedPatient.id,

      patient:
        selectedPatient,

      tests:
        selectedTests,

      priority,

      note,

      status: "Pending",

      date:
        new Date().toLocaleDateString(),
    };

    const updatedRequests = [
      ...requests,
      newRequest,
    ];

    saveRequests(
      updatedRequests
    );

    setRequests(
      updatedRequests
    );

    // ================= INVOICE =================

    const invoices =
      getInvoices();

    const total =
      selectedTests.reduce(
        (sum, test) =>
          sum +
          Number(
            test.price || 0
          ),
        0
      );

    const newInvoice = {
      id: requestId,

      patientId:
        selectedPatient.id,

      patient:
        selectedPatient.name,

      phone:
        selectedPatient.phone,

      date:
        new Date().toLocaleDateString(),

      status: "Pending",

      tests:
        selectedTests.map(
          (test) => ({
            id: test.id,
            name: test.name,
            price: Number(
              test.price || 0
            ),
          })
        ),

      discount: 0,

      total,

      paid: 0,

      analyses:
        selectedTests.map(
          (test) =>
            test.name
        ),
    };

    saveInvoices([
      newInvoice,
      ...invoices,
    ]);

    // ================= SUCCESS =================

    setStep(4);
  };

  // ================= TEST PAGINATION =================

  const totalTestPages =
    Math.ceil(
      analysisList.length /
        testsPerPage
    );

  const testStartIndex =
    (testPage - 1) *
    testsPerPage;

  const currentTests =
    analysisList.slice(
      testStartIndex,
      testStartIndex +
        testsPerPage
    );

  // ================= REQUEST PAGINATION =================

  const totalPages =
    Math.ceil(
      requests.length /
        requestsPerPage
    );

  const indexOfLast =
    currentPage *
    requestsPerPage;

  const indexOfFirst =
    indexOfLast -
    requestsPerPage;

  const currentRequests =
    requests.slice(
      indexOfFirst,
      indexOfLast
    );

  // ================= COMPLETE REQUEST =================

  const completeRequest = (
    id
  ) => {
    const updatedRequests =
      requests.map(
        (request) =>
          request.id === id
            ? {
                ...request,
                status:
                  "Completed",
              }
            : request
      );

    setRequests(
      updatedRequests
    );

    saveRequests(
      updatedRequests
    );
  };

  return (
<div
  className="
    w-full
    px-4 sm:px-6
    pt-20
    pb-6
  "
>
      {/* =====================================================
          STEP 1 - PATIENT
      ====================================================== */}

      {step === 1 && (
        <>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              {t.analysisRequest}
            </h1>

            <p className="text-gray-500 mt-2">
              {t.configureAnalysis}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">

            {/* STEPS */}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

              {[
                [
                  1,
                  t.patientSelection,
                ],
                [
                  2,
                  t.testPanel,
                ],
                [
                  3,
                  t.resultsReview,
                ],
                [
                  4,
                  t.complete,
                ],
              ].map(
                ([
                  number,
                  title,
                ]) => (
                  <div
                    key={number}
                  >
                    <p
                      className={`text-sm font-semibold ${
                        step ===
                        number
                          ? "text-blue-600"
                          : "text-gray-400"
                      }`}
                    >
                      {title}
                    </p>

                    <div
                      className={`h-1 rounded-full mt-3 ${
                        step >=
                        number
                          ? "bg-blue-600"
                          : "bg-gray-200"
                      }`}
                    />
                  </div>
                )
              )}

            </div>

            {/* PATIENT SELECT */}

            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 mt-10">

              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                {t.selectPatient}
              </h2>

              <p className="text-gray-500 text-sm mt-1">
                {t.searchDatabase}
              </p>

              <div className="flex flex-col md:flex-row gap-4 mt-6">

                <input
                  type="text"
                  placeholder={
                    t.searchPatient
                  }
                  value={
                    searchPatient
                  }
                  onChange={(e) =>
                    setSearchPatient(
                      e.target.value
                    )
                  }
                  className="flex-1 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 bg-white dark:bg-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                  onClick={() =>
                    setShowPatientModal(
                      true
                    )
                  }
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition"
                >
                  +{" "}
                  {t.newPatient}
                </button>

              </div>
            </div>

            {/* PATIENTS */}

            <div className="space-y-3 mt-6">

              {filteredPatients.map(
                (patient) => (
                  <div
                    key={
                      patient.id
                    }
                    onClick={() =>
                      setSelectedPatient(
                        patient
                      )
                    }
                    className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-xl border transition cursor-pointer ${
                      selectedPatient?.id ===
                      patient.id
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700"
                    }`}
                  >

                    <div className="flex items-center gap-4">

                      <div
                        className={`w-11 h-11 rounded-full flex items-center justify-center font-bold ${
                          selectedPatient?.id ===
                          patient.id
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {patient.name
                          ?.charAt(
                            0
                          )
                          ?.toUpperCase()}
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-800 dark:text-white">
                          {
                            patient.name
                          }
                        </h3>

                        <p className="text-sm text-gray-500">
                          {
                            patient.gender
                          }{" "}
                          •{" "}
                          {
                            patient.age
                          }{" "}
                          {language ===
                          "ar"
                            ? "سنة"
                            : "Years"}
                        </p>
                      </div>

                    </div>

                    <div className="text-gray-400 text-xl">
                      ›
                    </div>

                  </div>
                )
              )}

            </div>

            {/* PATIENT REQUESTS */}

            {selectedPatient && (
              <div className="mt-6 bg-gray-50 dark:bg-gray-900/40 rounded-2xl border border-gray-200 dark:border-gray-700 p-5">

                <div className="flex items-center justify-between mb-4">

                  <div>
                    <h3 className="text-lg font-bold dark:text-white">
                      {t.patientRequests ||
                        "Patient Requests"}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {
                        selectedPatient.name
                      }
                    </p>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                    {
                      patientRequests.length
                    }
                  </span>

                </div>

                {patientRequests.length ===
                0 ? (
                  <p className="text-center py-6 text-gray-500">
                    {t.noPreviousRequests ||
                      "No previous analysis requests."}
                  </p>
                ) : (
                  <div className="space-y-3">

                    {patientRequests.map(
                      (
                        request
                      ) => (
                        <div
                          key={
                            request.id
                          }
                          className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl p-4"
                        >

                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                            <div>

                              <p className="font-semibold dark:text-white">
                                {
                                  request
                                    .tests
                                    ?.length ||
                                  0
                                }{" "}
                                {language ===
                                "ar"
                                  ? "تحاليل"
                                  : "Tests"}
                              </p>

                              <p className="text-sm text-gray-500 mt-1">
                                {
                                  request.date
                                }
                              </p>

                            </div>

                            <span
                              className={`w-fit px-3 py-1 rounded-full text-sm ${
                                request.status ===
                                "Completed"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {request.status ===
                              "Completed"
                                ? language ===
                                  "ar"
                                  ? "مكتمل"
                                  : "Completed"
                                : t.pending ||
                                  "Pending"}
                            </span>

                          </div>

                          <div className="flex flex-wrap gap-2 mt-4">

                            {request.tests?.map(
                              (
                                test
                              ) => (
                                <span
                                  key={
                                    test.id
                                  }
                                  className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 text-sm dark:text-gray-200"
                                >
                                  {
                                    test.short ||
                                    test.name
                                  }
                                </span>
                              )
                            )}

                          </div>

                        </div>
                      )
                    )}

                  </div>
                )}

              </div>
            )}

            {/* NEXT */}

            <div className="flex justify-end mt-8">

              <button
                onClick={() => {
                  if (
                    !selectedPatient
                  ) {
                    alert(
                      t.selectPatientFirst
                    );

                    return;
                  }

                  setStep(2);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl"
              >
                {
                  t.nextStep
                }{" "}
                →
              </button>

            </div>

          </div>
        </>
      )}

      {/* =====================================================
          STEP 2 - ANALYSIS TESTS
      ====================================================== */}

      {step === 2 && (
        <div className="space-y-6">

          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">

            <h1 className="text-3xl font-bold dark:text-white">
              {
                t.selectAnalysisTests
              }
            </h1>

            <p className="text-gray-500 mt-2">
              {
                t.chooseAnalyses
              }
            </p>

          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

            <div className="xl:col-span-8">

              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">

                <h2 className="text-xl font-bold dark:text-white mb-6">
                  {
                    t.availableTests
                  }
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  {currentTests.map(
                    (test) => {
                      const selected =
                        selectedTests.some(
                          (item) =>
                            String(
                              item.id
                            ) ===
                            String(
                              test.id
                            )
                        );

                      return (
                        <div
                          key={
                            test.id
                          }
                          onClick={() =>
                            toggleTest(
                              test
                            )
                          }
                          className={`cursor-pointer rounded-2xl border p-5 transition-all duration-300 hover:shadow-lg ${
                            selected
                              ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                              : "border-gray-200 dark:border-gray-700 hover:border-blue-400"
                          }`}
                        >

                          <div className="flex items-start justify-between">

                            <div className="flex items-center gap-4">

                              <div
                                className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${
                                  selected
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-100 dark:bg-gray-700"
                                }`}
                              >
                                🧪
                              </div>

                              <div>

                                <h3 className="font-bold dark:text-white">
                                  {
                                    test.short ||
                                    test.name
                                  }
                                </h3>

                                <p className="text-sm text-gray-500 mt-1">
                                  {
                                    test.name
                                  }
                                </p>

                              </div>

                            </div>

                            {selected && (
                              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                                ✓
                              </div>
                            )}

                          </div>

                          <div className="flex items-center justify-between mt-6">

                            <span className="text-xs px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                              {
                                test.category
                              }
                            </span>

                            <span className="font-bold text-blue-600 text-lg">
                              $
                              {
                                test.price
                              }
                            </span>

                          </div>

                        </div>
                      );
                    }
                  )}

                </div>

                {/* TEST PAGINATION */}

                {totalTestPages >
                  1 && (
                  <div className="flex justify-start items-center gap-1 mt-6 flex-wrap">

                    <button
                      disabled={
                        testPage ===
                        1
                      }
                      onClick={() =>
                        setTestPage(
                          (
                            prev
                          ) =>
                            prev -
                            1
                        )
                      }
                      className="px-3 py-1 border rounded-lg disabled:opacity-50"
                    >
                      {
                        t.prev
                      }
                    </button>

                    {Array.from(
                      {
                        length:
                          totalTestPages,
                      },
                      (
                        _,
                        index
                      ) => (
                        <button
                          key={
                            index
                          }
                          onClick={() =>
                            setTestPage(
                              index +
                                1
                            )
                          }
                          className={`px-3 py-1 rounded-lg border ${
                            testPage ===
                            index +
                              1
                              ? "bg-blue-600 text-white"
                              : ""
                          }`}
                        >
                          {
                            index +
                            1
                          }
                        </button>
                      )
                    )}

                    <button
                      disabled={
                        testPage ===
                        totalTestPages
                      }
                      onClick={() =>
                        setTestPage(
                          (
                            prev
                          ) =>
                            prev +
                            1
                        )
                      }
                      className="px-3 py-1 border rounded-lg disabled:opacity-50"
                    >
                      {
                        t.next
                      }
                    </button>

                  </div>
                )}

              </div>

            </div>

            {/* SELECTED TESTS */}

            <div className="xl:col-span-4">

              <div className="sticky top-24 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">

                <h2 className="text-xl font-bold dark:text-white">
                  {
                    t.selectedTests
                  }
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  {
                    selectedTests.length
                  }{" "}
                  {
                    selectedTests.length ===
                    1
                      ? t.testSelected
                      : t.testsSelected
                  }
                </p>

                <div className="space-y-3 mt-6">

                  {selectedTests.length ===
                  0 ? (
                    <div className="rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 py-10 text-center">

                      <div className="text-5xl mb-3">
                        🧪
                      </div>

                      <p className="text-gray-400">
                        {
                          t.noTestsSelected
                        }
                      </p>

                    </div>
                  ) : (
                    selectedTests.map(
                      (
                        test
                      ) => (
                        <div
                          key={
                            test.id
                          }
                          className="flex items-center justify-between rounded-xl border border-gray-200 dark:border-gray-700 p-4"
                        >

                          <div>

                            <h4 className="font-semibold dark:text-white">
                              {
                                test.short ||
                                test.name
                              }
                            </h4>

                            <p className="text-sm text-gray-500">
                              {
                                test.name
                              }
                            </p>

                          </div>

                          <span className="font-bold text-blue-600">
                            $
                            {
                              test.price
                            }
                          </span>

                        </div>
                      )
                    )
                  )}

                </div>

                <div className="mt-6 rounded-xl bg-blue-50 dark:bg-blue-900/20 p-5">

                  <div className="flex items-center justify-between">

                    <span className="font-semibold dark:text-white">
                      {
                        t.total
                      }
                    </span>

                    <span className="text-2xl font-bold text-blue-600">
                      $
                      {selectedTests.reduce(
                        (
                          sum,
                          item
                        ) =>
                          sum +
                          Number(
                            item.price ||
                              0
                          ),
                        0
                      )}
                    </span>

                  </div>

                </div>

                <div className="flex gap-3 mt-6">

                  <button
                    onClick={() =>
                      setStep(1)
                    }
                    className="flex-1 border border-gray-300 dark:border-gray-600 rounded-xl py-3"
                  >
                    ←{" "}
                    {
                      t.back
                    }
                  </button>

                  <button
                    onClick={() => {
                      if (
                        selectedTests.length ===
                        0
                      ) {
                        alert(
                          t.selectAtLeastOneTest
                        );

                        return;
                      }

                      setStep(3);
                    }}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3"
                  >
                    {
                      t.continue
                    }{" "}
                    →
                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>
      )}

      {/* =====================================================
          STEP 3 - REVIEW
      ====================================================== */}

      {step === 3 && (
        <div className="space-y-6">

          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">

            <h2 className="text-2xl font-bold dark:text-white">
              {
                t.reviewRequest
              }
            </h2>

            <p className="text-gray-500 mt-2">
              {
                t.reviewInformation
              }
            </p>

          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">

            <h3 className="font-bold text-lg dark:text-white mb-4">
              {
                t.selectedPatient
              }
            </h3>

            <p className="font-semibold dark:text-white">
              {
                selectedPatient?.name
              }
            </p>

            <p className="text-gray-500">
              {
                selectedPatient?.gender
              }{" "}
              •{" "}
              {
                selectedPatient?.age
              }{" "}
              {language ===
              "ar"
                ? "سنة"
                : "Years"}
            </p>

          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">

            <h3 className="font-bold text-lg dark:text-white mb-4">
              {
                t.selectedAnalysis
              }
            </h3>

            <div className="space-y-3">

              {selectedTests.map(
                (test) => (
                  <div
                    key={
                      test.id
                    }
                    className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-3"
                  >

                    <div>
                      <p className="font-semibold dark:text-white">
                        {
                          test.name
                        }
                      </p>

                      <p className="text-sm text-gray-500">
                        {
                          test.category
                        }
                      </p>
                    </div>

                    <span className="font-bold text-blue-600">
                      $
                      {
                        test.price
                      }
                    </span>

                  </div>
                )
              )}

            </div>

            <div className="flex justify-between mt-6 text-xl font-bold dark:text-white">

              <span>
                {
                  t.total
                }
              </span>

              <span className="text-blue-600">
                $
                {selectedTests.reduce(
                  (
                    sum,
                    item
                  ) =>
                    sum +
                    Number(
                      item.price ||
                        0
                    ),
                  0
                )}
              </span>

            </div>

          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">

            <h3 className="font-bold mb-3 dark:text-white">
              {
                t.priority
              }
            </h3>

            <select
              value={
                priority
              }
              onChange={(e) =>
                setPriority(
                  e.target.value
                )
              }
              className="w-full border rounded-xl p-3 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
            >

              <option value="Normal">
                {
                  t.normal
                }
              </option>

              <option value="Urgent">
                {
                  t.urgent
                }
              </option>

              <option value="Critical">
                {
                  t.critical
                }
              </option>

            </select>

            <h3 className="font-bold mt-6 mb-3 dark:text-white">
              {
                t.clinicalNotes
              }
            </h3>

            <textarea
              rows={5}
              value={note}
              onChange={(e) =>
                setNote(
                  e.target.value
                )
              }
              className="w-full border rounded-xl p-3 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
              placeholder={
                t.writeNotes
              }
            />

          </div>

          <div className="flex flex-col-reverse sm:flex-row gap-4 justify-between">

            <button
              onClick={() =>
                setStep(2)
              }
              className="border px-6 py-3 rounded-xl"
            >
              ←{" "}
              {
                t.back
              }
            </button>

            <button
              onClick={
                createRequest
              }
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl"
            >
              {
                t.createRequest
              }
            </button>

          </div>

        </div>
      )}

      {/* =====================================================
          STEP 4 - SUCCESS
      ====================================================== */}

      {step === 4 && (
        <div className="w-full max-w-5xl mx-auto text-center py-20 px-4">

          <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto">

            <div className="text-5xl text-green-600">
              ✓
            </div>

          </div>

          <h1 className="text-4xl font-bold mt-8 text-gray-800 dark:text-white">
            {
              t.requestCreated
            }
          </h1>

          <p className="text-gray-500 mt-4">
            {
              t.requestRegistered
            }
          </p>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow border border-gray-200 dark:border-gray-700 mt-10 p-8 text-left">

            <h2 className="font-bold text-xl mb-5">
              {
                t.summary
              }
            </h2>

            <p>
              <b>
                {
                  t.patient
                }{" "}
                :
              </b>{" "}
              {
                selectedPatient?.name
              }
            </p>

            <p className="mt-2">
              <b>
                {
                  t.tests
                }{" "}
                :
              </b>{" "}
              {
                selectedTests.length
              }
            </p>

            <p className="mt-2">
              <b>
                {
                  t.priority
                }{" "}
                :
              </b>{" "}
              {
                priority ===
                "Normal"
                  ? t.normal
                  : priority ===
                    "Urgent"
                  ? t.urgent
                  : t.critical
              }
            </p>

            <p className="mt-2">
              <b>
                {
                  t.status
                }{" "}
                :
              </b>

              <span className="ml-2 px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm">
                {
                  t.pending
                }
              </span>
            </p>

          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">

            <button
              onClick={() => {
                setStep(1);
                setSelectedPatient(
                  null
                );
                setSelectedTests(
                  []
                );
                setPriority(
                  "Normal"
                );
                setNote("");
                setTestPage(1);
              }}
              className="border px-6 py-3 rounded-xl"
            >
              {
                t.createAnother
              }
            </button>

            <button
              onClick={() =>
                navigate(
                  "/doctor/analysis-requests"
                )
              }
              className="bg-blue-600 text-white px-6 py-3 rounded-xl"
            >
              {
                t.viewRequests
              }
            </button>

          </div>

        </div>
      )}

      {/* =====================================================
          RECENT REQUESTS
      ====================================================== */}

      <div className="mt-14">

        <div className="mb-6">

          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {
              t.recentAnalysisRequests
            }
          </h2>

          <p className="text-gray-500 mt-1">
            {
              t.viewManageRequests
            }
          </p>

        </div>

        <div className="hidden md:block bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">

          <table className="w-full">

            <thead className="bg-gray-50 dark:bg-gray-900">

              <tr>

                <th className="text-left px-6 py-4">
                  {
                    t.patient
                  }
                </th>

                <th className="text-left px-6 py-4">
                  {
                    t.tests
                  }
                </th>

                <th className="text-left px-6 py-4">
                  {
                    t.priority
                  }
                </th>

                <th className="text-left px-6 py-4">
                  {
                    t.status
                  }
                </th>

                <th className="text-left px-6 py-4">
                  {
                    t.date
                  }
                </th>

                <th className="text-center px-6 py-4">
                  {
                    t.action
                  }
                </th>

              </tr>

            </thead>

            <tbody>

              {currentRequests.map(
                (request) => (
                  <tr
                    key={
                      request.id
                    }
                    className="border-t dark:border-gray-700"
                  >

                    <td className="px-6 py-4">
                      {
                        request
                          .patient
                          ?.name ||
                        request.patient
                      }
                    </td>

                    <td className="px-6 py-4">
                      {
                        request
                          .tests
                          ?.length ||
                        0
                      }
                    </td>

                    <td className="px-6 py-4">
                      {
                        request.priority ===
                        "Normal"
                          ? t.normal
                          : request.priority ===
                            "Urgent"
                          ? t.urgent
                          : request.priority ===
                            "Critical"
                          ? t.critical
                          : request.priority
                      }
                    </td>

                    <td className="px-6 py-4">
                      {
                        request.status ===
                        "Pending"
                          ? t.pending
                          : request.status ===
                            "Completed"
                          ? language ===
                            "ar"
                            ? "مكتمل"
                            : "Completed"
                          : request.status
                      }
                    </td>

                    <td className="px-6 py-4">
                      {
                        request.date
                      }
                    </td>

                    <td className="px-6 py-4 text-center">

                      {request.status !==
                        "Completed" && (
                        <button
                          onClick={() =>
                            completeRequest(
                              request.id
                            )
                          }
                          className="text-green-600 hover:underline"
                        >
                          {
                            t.completeRequest
                          }
                        </button>
                      )}

                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* =====================================================
          NEW PATIENT MODAL
      ====================================================== */}

      {showPatientModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">

          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md p-5 sm:p-6 shadow-xl">

            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
              {
                t.addNewPatient
              }
            </h2>

            <div className="space-y-4">

              <input
                type="text"
                placeholder={
                  t.patientName
                }
                value={
                  newPatientName
                }
                onChange={(e) =>
                  setNewPatientName(
                    e.target.value
                  )
                }
                className="w-full border rounded-xl px-4 py-3 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
              />

              <input
                type="number"
                placeholder={
                  t.age
                }
                value={
                  newPatientAge
                }
                onChange={(e) =>
                  setNewPatientAge(
                    e.target.value
                  )
                }
                className="w-full border rounded-xl px-4 py-3 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
              />

              <select
                value={
                  newPatientGender
                }
                onChange={(e) =>
                  setNewPatientGender(
                    e.target.value
                  )
                }
                className="w-full border rounded-xl px-4 py-3 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
              >

                <option value="Male">
                  {
                    t.male
                  }
                </option>

                <option value="Female">
                  {
                    t.female
                  }
                </option>

              </select>

              <input
                type="text"
                placeholder={
                  t.phoneNumber
                }
                value={
                  newPatientPhone
                }
                onChange={(e) =>
                  setNewPatientPhone(
                    e.target.value
                  )
                }
                className="w-full border rounded-xl px-4 py-3 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
              />

            </div>

            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-8">

              <button
                onClick={() =>
                  setShowPatientModal(
                    false
                  )
                }
                className="w-full sm:w-auto px-5 py-2 rounded-xl border"
              >
                {
                  t.cancel
                }
              </button>

              <button
                onClick={
                  addNewPatient
                }
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl"
              >
                {
                  t.savePatient
                }
              </button>

            </div>

          </div>

        </div>
      )}

      {/* =====================================================
          REQUEST PAGINATION
      ====================================================== */}

      {totalPages > 1 && (
        <div className="flex justify-end items-center gap-1 mt-4 flex-wrap">

          <button
            onClick={() =>
              setCurrentPage(
                (prev) =>
                  prev - 1
              )
            }
            disabled={
              currentPage === 1
            }
            className="px-2 py-1 text-sm rounded-md border disabled:opacity-50"
          >
            {
              t.prev
            }
          </button>

          {Array.from(
            {
              length:
                totalPages,
            },
            (_, index) => (
              <button
                key={index}
                onClick={() =>
                  setCurrentPage(
                    index + 1
                  )
                }
                className={`w-8 h-8 text-sm rounded-md ${
                  currentPage ===
                  index + 1
                    ? "bg-blue-600 text-white"
                    : "border hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {
                  index + 1
                }
              </button>
            )
          )}

          <button
            onClick={() =>
              setCurrentPage(
                (prev) =>
                  prev + 1
              )
            }
            disabled={
              currentPage ===
              totalPages
            }
            className="px-2 py-1 text-sm rounded-md border disabled:opacity-50"
          >
            {
              t.next
            }
          </button>

        </div>
      )}

    </div>
  );
}

export default AnalysisRequests;


