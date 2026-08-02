import { useState, useEffect } from "react";
import { useLanguage } from "../../constants/useLanguage";
import { translations } from "../../constants/translations";

import {
  getPatients,
  savePatients,
} from "../../data/patientStorage";

import {
  getResults,
} from "../../data/resultStorage";

import {
  HiOutlineEye,
  HiOutlinePencilSquare,
  HiOutlineTrash,
} from "react-icons/hi2";

function Patients() {
  const { language } = useLanguage();
  const t = translations[language];

  const [search, setSearch] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const patientsPerPage = 5;

  // Initial Patients
  const initialPatients = [
    {
      id: 1,
      name: "Ahmed Ali",
      age: 30,
      gender: "Male",
      address: "Cairo",
      phone: "01012345678",
      email: "ahmed@gmail.com",
      bloodType: "O+",
      total: 500,
      paid: 300,
      status: "Pending",
      analyses: [
        "CBC",
        "Blood Sugar",
        "Vitamin D Test",
      ],
    },

    {
      id: 2,
      name: "Sara Mohamed",
      age: 25,
      gender: "Female",
      address: "Mansoura",
      phone: "01198765432",
      email: "sara@gmail.com",
      bloodType: "A+",
      total: 800,
      paid: 800,
      status: "Completed",
      analyses: [
        "Urine Test",
        "Liver Function",
      ],
    },
  ];

  // Patients State
  const [patients, setPatients] = useState(() => {
    const savedPatients = getPatients();

    return savedPatients.length > 0
      ? savedPatients
      : initialPatients;
  });

  useEffect(() => {
    savePatients(patients);
  }, [patients]);

  // Form States
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);

  // Selected Patient
  const [selectedPatient, setSelectedPatient] = useState(null);

  // =========================
  // Get Patient Results
  // =========================

  const getPatientResults = (patientId) => {
    const allResults = getResults();

    return allResults.filter(
      (result) =>
        String(result.patientId) === String(patientId)
    );
  };

  // =========================
  // View Patient
  // =========================

  const viewPatient = (patient) => {
  setSelectedPatient(patient);
};

  // Add / Edit Patient
  const addPatient = () => {
    if (!name || !age) return;

    if (editingPatient) {
      setPatients(
        patients.map((patient) =>
          patient.id === editingPatient.id
            ? {
                ...patient,
                name,
                age,
                gender,
                phone,
                address,
              }
            : patient
        )
      );

      setEditingPatient(null);
    } else {
      setPatients([
        ...patients,
        {
          id: Date.now(),
          name,
          age,
          gender,
          phone,
          address,
          status: "Pending",
          analyses: [],
        },
      ]);
    }

    setName("");
    setAge("");
    setGender("");
    setPhone("");
    setAddress("");

    setShowModal(false);
  };

  // Delete Patient
  const deletePatient = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this patient?"
    );

    if (confirmDelete) {
      setPatients(
        patients.filter(
          (patient) => patient.id !== id
        )
      );
    }
  };

  // Edit Patient
  const editPatient = (patient) => {
    setEditingPatient(patient);

    setName(patient.name);
    setAge(patient.age);
    setGender(patient.gender);
    setPhone(patient.phone);
    setAddress(patient.address);

    setShowModal(true);
  };

  // Translate Gender
  const translateGender = (gender) => {
    if (language === "ar") {
      if (gender === "Male") return "ذكر";
      if (gender === "Female") return "أنثى";
    }

    return gender;
  };

  // Translate Status
  const translateStatus = (status) => {
    const statusMap = {
      Pending: t.pending,
      Completed: t.completed,
      Cancelled: t.cancelled,
    };

    return statusMap[status] || status;
  };

  // Search
  const filteredPatients = patients.filter((patient) =>
    patient.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(
    filteredPatients.length / patientsPerPage
  );

  const startIndex =
    (currentPage - 1) * patientsPerPage;

  const currentPatients = filteredPatients.slice(
    startIndex,
    startIndex + patientsPerPage
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8">

      {/* ========================= */}
      {/* Page Header */}
      {/* ========================= */}

<div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8 pt-4 sm:pt-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t.patients}
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {t.managePatients}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">

          {/* Search */}
          <div className="relative w-full sm:w-72">

            <input
              className="
                w-full
                border
                border-gray-300
                dark:border-gray-700
                dark:bg-gray-800
                dark:text-white
                rounded-xl
                px-4
                py-2.5
                text-sm
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
              placeholder={t.searchPatient}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />

          </div>

          {/* Add Patient */}
          <button
            onClick={() => {
              setEditingPatient(null);

              setName("");
              setAge("");
              setGender("");
              setPhone("");
              setAddress("");

              setShowModal(true);
            }}
            className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-5
              py-2.5
              rounded-xl
              font-medium
              transition
              shadow-sm
            "
          >
            + {t.addPatient}
          </button>

        </div>

      </div>

      {/* ========================= */}
      {/* Patients Table */}
      {/* ========================= */}

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 sm:p-6 overflow-x-auto">

        {/* Header */}
        <div
          className="
            grid
            grid-cols-[2fr_1fr_1fr_2fr_1fr_1fr]
            bg-gray-50
            dark:bg-gray-700
            rounded-xl
            px-6
            py-4
            text-sm
            font-semibold
            text-gray-600
            dark:text-gray-200
            min-w-[800px]
          "
        >

          <div>{t.name}</div>
          <div>{t.age}</div>
          <div>{t.gender}</div>
          <div>{t.phone}</div>
          <div>{t.status}</div>

          <div className="text-center">
            {t.actions}
          </div>

        </div>

        {/* Rows */}
        {currentPatients.map((p) => (

          <div
            key={p.id}
            className="
              grid
              grid-cols-[2fr_1fr_1fr_2fr_1fr_1fr]
              items-center
              px-6
              py-4
              border-b
              border-gray-200
              dark:border-gray-700
              hover:bg-gray-50
              dark:hover:bg-gray-700
              transition
              min-w-[800px]
            "
          >

            {/* Name */}
            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">
                {p.name.charAt(0).toUpperCase()}
              </div>

              <div>

                <p className="font-semibold text-gray-800 dark:text-white">
                  {p.name}
                </p>

                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {p.email || "-"}
                </p>

              </div>

            </div>

            {/* Age */}
            <div className="text-gray-800 dark:text-white">
              {p.age}
            </div>

            {/* Gender */}
            <div className="text-gray-800 dark:text-white">
              {translateGender(p.gender)}
            </div>

            {/* Phone */}
            <div className="text-gray-800 dark:text-white">
              {p.phone || "-"}
            </div>

            {/* Status */}
            <div>

              <span
                className={`
                  px-3
                  py-1
                  rounded-full
                  text-xs
                  font-medium
                  ${
                    p.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : p.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }
                `}
              >
                {translateStatus(p.status)}
              </span>

            </div>

            {/* Actions */}
            <div className="flex justify-center gap-2">

              {/* View */}
              <button
                onClick={() => viewPatient(p)}
                title={t.view}
                className="
                  bg-blue-500
                  hover:bg-blue-600
                  text-white
                  p-2
                  rounded-lg
                  transition
                "
              >
                <HiOutlineEye className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Edit */}
              <button
                onClick={() => editPatient(p)}
                title={t.edit}
                className="
                  bg-yellow-400
                  hover:bg-yellow-500
                  text-white
                  p-2
                  rounded-lg
                  transition
                "
              >
                <HiOutlinePencilSquare className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Delete */}
              <button
                onClick={() => deletePatient(p.id)}
                title={t.delete}
                className="
                  bg-red-500
                  hover:bg-red-600
                  text-white
                  p-2
                  rounded-lg
                  transition
                "
              >
                <HiOutlineTrash className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

            </div>

          </div>

        ))}

        {/* Pagination */}
        {filteredPatients.length > 0 && totalPages > 1 && (
          <div className="flex justify-end items-center gap-1 mt-5">

            <button
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.max(prev - 1, 1)
                )
              }
              disabled={currentPage === 1}
              className="
                px-2.5
                py-1.5
                text-xs
                rounded-md
                border
                dark:border-gray-600
                text-gray-600
                dark:text-gray-300
                disabled:opacity-40
                disabled:cursor-not-allowed
                hover:bg-gray-100
                dark:hover:bg-gray-700
                transition
              "
            >
              Prev
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
                className={`
                  w-7
                  h-7
                  text-xs
                  rounded-md
                  transition
                  ${
                    currentPage === page
                      ? "bg-blue-600 text-white"
                      : "border dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }
                `}
              >
                {page}
              </button>

            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(
                    prev + 1,
                    totalPages
                  )
                )
              }
              disabled={
                currentPage === totalPages
              }
              className="
                px-2.5
                py-1.5
                text-xs
                rounded-md
                border
                dark:border-gray-600
                text-gray-600
                dark:text-gray-300
                disabled:opacity-40
                disabled:cursor-not-allowed
                hover:bg-gray-100
                dark:hover:bg-gray-700
                transition
              "
            >
              Next
            </button>

          </div>
        )}

        {/* Empty State */}
        {filteredPatients.length === 0 && (

          <div className="text-center py-10 text-gray-500">

            <div className="text-4xl mb-3">
              👥
            </div>

            <p className="font-medium">
              {t.noPatientsFound}
            </p>

            <p className="text-sm mt-1">
              {t.tryAnotherSearch}
            </p>

          </div>

        )}

      </div>

      {/* ========================= */}
      {/* Add / Edit Modal */}
      {/* ========================= */}

      {showModal && (

        <div
          className="
            fixed
            inset-0
            bg-black/50
            backdrop-blur-sm
            flex
            items-center
            justify-center
            z-50
            p-4
          "
        >

          <div
            className="
              bg-white
              dark:bg-gray-800
              dark:text-white
              rounded-2xl
              shadow-xl
              p-5
              sm:p-6
              w-full
              max-w-md
            "
          >

            <div className="flex items-center justify-between mb-5">

              <h2 className="text-xl font-bold">
                {editingPatient
                  ? t.editPatient
                  : t.addPatient}
              </h2>

              <button
                onClick={() =>
                  setShowModal(false)
                }
                className="text-2xl text-gray-400 hover:text-red-500 transition"
              >
                ✕
              </button>

            </div>

            {/* Name */}
            <div className="mb-3">

              <label className="block text-sm font-medium mb-1">
                {t.name}
              </label>

              <input
                type="text"
                placeholder={t.name}
                className="
                  w-full
                  p-3
                  border
                  border-gray-300
                  dark:border-gray-600
                  dark:bg-gray-700
                  dark:text-white
                  rounded-xl
                  text-sm
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />

            </div>

            {/* Age */}
            <div className="mb-3">

              <label className="block text-sm font-medium mb-1">
                {t.age}
              </label>

              <input
                type="number"
                placeholder={t.age}
                className="
                  w-full
                  p-3
                  border
                  border-gray-300
                  dark:border-gray-600
                  dark:bg-gray-700
                  dark:text-white
                  rounded-xl
                  text-sm
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
                value={age}
                onChange={(e) =>
                  setAge(e.target.value)
                }
              />

            </div>

            {/* Gender */}
            <div className="mb-3">

              <label className="block text-sm font-medium mb-1">
                {t.gender}
              </label>

              <select
                className="
                  w-full
                  p-3
                  border
                  border-gray-300
                  dark:border-gray-600
                  dark:bg-gray-700
                  dark:text-white
                  rounded-xl
                  text-sm
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
                value={gender}
                onChange={(e) =>
                  setGender(e.target.value)
                }
              >

                <option value="">
                  {t.selectGender}
                </option>

                <option value="Male">
                  {t.male}
                </option>

                <option value="Female">
                  {t.female}
                </option>

              </select>

            </div>

            {/* Phone */}
            <div className="mb-3">

              <label className="block text-sm font-medium mb-1">
                {t.phone}
              </label>

              <input
                type="text"
                placeholder={t.phone}
                className="
                  w-full
                  p-3
                  border
                  border-gray-300
                  dark:border-gray-600
                  dark:bg-gray-700
                  dark:text-white
                  rounded-xl
                  text-sm
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
              />

            </div>

            {/* Address */}
            <div className="mb-5">

              <label className="block text-sm font-medium mb-1">
                {t.address}
              </label>

              <input
                type="text"
                placeholder={t.address}
                className="
                  w-full
                  p-3
                  border
                  border-gray-300
                  dark:border-gray-600
                  dark:bg-gray-700
                  dark:text-white
                  rounded-xl
                  text-sm
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
                value={address}
                onChange={(e) =>
                  setAddress(e.target.value)
                }
              />

            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3">

              <button
                onClick={() =>
                  setShowModal(false)
                }
                className="
                  px-4
                  py-2
                  bg-gray-200
                  hover:bg-gray-300
                  dark:bg-gray-700
                  dark:hover:bg-gray-600
                  rounded-xl
                  transition
                "
              >
                {t.cancel}
              </button>

              <button
                onClick={addPatient}
                className="
                  px-4
                  py-2
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  rounded-xl
                  transition
                "
              >
                {editingPatient
                  ? t.update
                  : t.save}
              </button>

            </div>

          </div>

        </div>
      )}

      {/* ========================= */}
      {/* Patient Details Modal */}
      {/* ========================= */}

      {selectedPatient && (() => {
        const patientResults =
          getPatientResults(selectedPatient.id);

        return (
          <div
            className="
              fixed
              inset-0
              bg-black/40
              backdrop-blur-sm
              flex
              items-center
              justify-center
              z-50
              p-4
            "
          >

            <div
              className="
                bg-white
                dark:bg-gray-800
                rounded-2xl
                p-5
                sm:p-6
                w-full
                max-w-4xl
                max-h-[90vh]
                overflow-y-auto
                shadow-2xl
              "
            >

              {/* Header */}
              <div className="flex items-start justify-between mb-6">

                <div>

                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {t.patientProfile}
                  </h2>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {t.completeMedicalPaymentInformation}
                  </p>

                </div>

                <button
                  onClick={() =>
                    setSelectedPatient(null)
                  }
                  className="text-2xl text-gray-400 hover:text-red-500 transition"
                >
                  ✕
                </button>

              </div>

              {/* Information Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

                {/* Patient Information */}
                <div
                  className="
                    bg-gray-50
                    dark:bg-gray-700
                    rounded-2xl
                    p-5
                    shadow-sm
                  "
                >

                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-5">
                    👤 {t.patientInformation}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                        {t.name}
                      </p>

                      <p className="font-semibold text-gray-800 dark:text-white">
                        {selectedPatient.name}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                        {t.age}
                      </p>

                      <p className="font-semibold text-gray-800 dark:text-white">
                        {selectedPatient.age}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                        {t.gender}
                      </p>

                      <p className="font-semibold text-gray-800 dark:text-white">
                        {translateGender(
                          selectedPatient.gender
                        )}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                        {t.phone}
                      </p>

                      <p className="font-semibold text-gray-800 dark:text-white">
                        {selectedPatient.phone || "-"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                        {t.address}
                      </p>

                      <p className="font-semibold text-gray-800 dark:text-white">
                        {selectedPatient.address || "-"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                        {t.email}
                      </p>

                      <p className="font-semibold text-gray-800 dark:text-white break-all">
                        {selectedPatient.email || "-"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                        {t.bloodType}
                      </p>

                      <p className="font-semibold text-gray-800 dark:text-white">
                        {selectedPatient.bloodType || "-"}
                      </p>
                    </div>

                  </div>

                </div>

                {/* Payment Information */}
                <div
                  className="
                    bg-gray-50
                    dark:bg-gray-700
                    rounded-2xl
                    p-5
                    shadow-sm
                  "
                >

                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-5">
                    💰 {t.paymentInformation}
                  </h3>

                  <div className="space-y-4">

                    <div className="flex justify-between gap-4">
                      <span className="text-gray-500 dark:text-gray-300">
                        {t.total}
                      </span>

                      <span className="font-semibold text-gray-900 dark:text-white">
                        {selectedPatient.total || 0} EGP
                      </span>
                    </div>

                    <div className="flex justify-between gap-4">
                      <span className="text-gray-500 dark:text-gray-300">
                        {t.paid}
                      </span>

                      <span className="font-semibold text-green-600">
                        {selectedPatient.paid || 0} EGP
                      </span>
                    </div>

                    <div className="flex justify-between gap-4">
                      <span className="text-gray-500 dark:text-gray-300">
                        {t.remaining}
                      </span>

                      <span className="font-semibold text-red-500">
                        {(selectedPatient.total || 0) -
                          (selectedPatient.paid || 0)}{" "}
                        EGP
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-2">

                      <span className="text-gray-500 dark:text-gray-300">
                        {t.status}
                      </span>

                      <span
                        className={`
                          px-3
                          py-1
                          rounded-full
                          text-white
                          text-sm
                          ${
                            selectedPatient.status ===
                            "Completed"
                              ? "bg-green-500"
                              : selectedPatient.status ===
                                "Pending"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }
                        `}
                      >
                        {translateStatus(
                          selectedPatient.status
                        )}
                      </span>

                    </div>

                  </div>

                </div>

                {/* Existing Analysis List */}
                <div
                  className="
                    bg-gray-50
                    dark:bg-gray-700
                    rounded-2xl
                    p-5
                    shadow-sm
                    lg:col-span-2
                  "
                >

                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    🧪 {t.analysisList}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">

                 {selectedPatient.analyses?.map(
  (analysis, index) => {

    const analysisName =
      typeof analysis === "string"
        ? analysis
        : analysis?.name || "-";

    return (
      <div
        key={index}
        className="
          bg-white
          dark:bg-gray-800
          rounded-xl
          p-3
          shadow-sm
          border
          border-gray-100
          dark:border-gray-700
          text-gray-800
          dark:text-white
        "
      >
        🧪{" "}
        {t.analysisNames?.[analysisName] ||
          analysisName}
      </div>
    );
  }
)}

                    {(!selectedPatient.analyses ||
                      selectedPatient.analyses.length ===
                        0) && (

                      <p className="text-gray-500 dark:text-gray-400">
                        {t.noAnalysis}
                      </p>

                    )}

                  </div>

                </div>

                {/* ========================= */}
                {/* Laboratory Results */}
                {/* ========================= */}

                <div
                  className="
                    bg-gray-50
                    dark:bg-gray-700
                    rounded-2xl
                    p-5
                    shadow-sm
                    lg:col-span-2
                  "
                >

                  <div className="flex items-center justify-between mb-5">

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        🧪{" "}
                        {language === "ar"
                          ? "نتائج التحاليل"
                          : "Laboratory Results"}
                      </h3>

                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {language === "ar"
                          ? "النتائج المسجلة لهذا المريض"
                          : "Laboratory results recorded for this patient"}
                      </p>
                    </div>

                    <span
                      className="
                        px-3
                        py-1
                        rounded-full
                        bg-blue-100
                        dark:bg-blue-900/30
                        text-blue-700
                        dark:text-blue-300
                        text-xs
                        font-semibold
                      "
                    >
                      {patientResults.length}{" "}
                      {language === "ar"
                        ? "نتيجة"
                        : "Results"}
                    </span>

                  </div>

                  {patientResults.length > 0 ? (

                    <div className="space-y-4">

                      {patientResults
                        .slice()
                        .reverse()
                        .map((result) => (

                          <div
                            key={result.id}
                            className="
                              bg-white
                              dark:bg-gray-800
                              rounded-xl
                              border
                              border-gray-200
                              dark:border-gray-600
                              p-4
                            "
                          >

                            {/* Result Header */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">

                              <div>

                                <h4 className="font-bold text-gray-900 dark:text-white">
  {result.analysisName || result.analysis || "-"}
</h4>  {result.date}


                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
  {result.date || "-"}
</p>

                              </div>

                              <span
                                className="
                                  self-start
                                  sm:self-auto
                                  px-3
                                  py-1
                                  rounded-full
                                  bg-green-100
                                  dark:bg-green-900/30
                                  text-green-700
                                  dark:text-green-300
                                  text-xs
                                  font-semibold
                                "
                              >
                                {language === "ar"
                                  ? "مكتمل"
                                  : result.status}
                              </span>

                            </div>

                            {/* Tests */}
                            <div className="space-y-2">

                              {result.tests?.map(
                                (test, index) => (

                                  <div
                                    key={index}
                                    className="
                                      grid
                                      grid-cols-1
                                      sm:grid-cols-4
                                      gap-2
                                      p-3
                                      rounded-lg
                                      bg-gray-50
                                      dark:bg-gray-700
                                    "
                                  >

                                    <div>
                                      <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {language === "ar"
                                          ? "الاختبار"
                                          : "Test"}
                                      </p>

                                      <p className="font-medium text-gray-800 dark:text-white">
                                        {test.name}
                                      </p>
                                    </div>

                                    <div>
                                      <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {language === "ar"
                                          ? "النتيجة"
                                          : "Result"}
                                      </p>

                                      <p className="font-bold text-blue-600 dark:text-blue-400">
                                        {test.result || "-"}
                                      </p>
                                    </div>

                                    <div>
                                      <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {language === "ar"
                                          ? "الوحدة"
                                          : "Unit"}
                                      </p>

                                      <p className="text-gray-800 dark:text-white">
                                        {test.unit || "-"}
                                      </p>
                                    </div>

                                    <div>
                                      <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {language === "ar"
                                          ? "المعدل الطبيعي"
                                          : "Reference Range"}
                                      </p>

                                      <p className="text-gray-800 dark:text-white">
                                        {test.range || "-"}
                                      </p>
                                    </div>

                                  </div>

                                )
                              )}

                            </div>

                          </div>

                        ))}

                    </div>

                  ) : (

                    <div
                      className="
                        text-center
                        py-8
                        text-gray-500
                        dark:text-gray-400
                        bg-white
                        dark:bg-gray-800
                        rounded-xl
                      "
                    >
                      <div className="text-3xl mb-2">
                        🧪
                      </div>

                      <p className="font-medium">
                        {language === "ar"
                          ? "لا توجد نتائج تحاليل لهذا المريض حتى الآن"
                          : "No laboratory results found for this patient yet"}
                      </p>

                      <p className="text-sm mt-1">
                        {language === "ar"
                          ? "ستظهر النتيجة هنا تلقائيًا بعد حفظها من صفحة إدخال النتائج"
                          : "Results will appear here automatically after being saved from the Enter Laboratory Result page"}
                      </p>

                    </div>

                  )}

                </div>

              </div>

              {/* Close */}
              <div className="flex justify-end mt-6">

                <button
                  onClick={() =>
                    setSelectedPatient(null)
                  }
                  className="
                    bg-red-500
                    hover:bg-red-600
                    text-white
                    px-5
                    py-2.5
                    rounded-xl
                    transition
                  "
                >
                  {t.close}
                </button>

              </div>

            </div>

          </div>
        );
      })()}

    </div>
  );
}

export default Patients;

