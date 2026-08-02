import { useState } from "react";

import {
  getAnalysisTypes,
} from "../data/analysisStorage";

import {
  getPatients,
} from "../data/patientStorage";

import {
  useLanguage,
} from "../constants/useLanguage";

import {
  translations,
} from "../constants/translations";

import AnalysisSelector from "./AnalysisSelector";
import SelectedTests from "./SelectedTests";
import InvoiceSummary from "./InvoiceSummary";


function AddInvoiceModal({
  isOpen,
  onClose,
  onAddInvoice,
  editingInvoice,
}) {
  const { language } = useLanguage();

  const t = translations[language];

  const isArabic = language === "ar";

  const patients = getPatients();
  const analysisList = getAnalysisTypes();

  // ==================== Form State ====================

  const [formData, setFormData] = useState({
    patient: "",
    patientId: "",
    phone: "",
    tests: [],
    discount: "",
    status: "Pending",
  });

  const [selectedAnalysis, setSelectedAnalysis] =
    useState("");

  // ==================== Reset ====================

  const resetForm = () => {
    setFormData({
      patient: "",
      patientId: "",
      phone: "",
      tests: [],
      discount: "",
      status: "Pending",
    });

    setSelectedAnalysis("");
  };

  // ==================== Handle Patient ====================

  const handlePatientChange = (e) => {
    const patientId = e.target.value;

    const selectedPatient =
      patients.find(
        (patient) =>
          String(patient.id) ===
          String(patientId)
      );

    if (!selectedPatient) {
      setFormData((prev) => ({
        ...prev,
        patient: "",
        patientId: "",
        phone: "",
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      patient:
        selectedPatient.name || "",
      patientId:
        selectedPatient.id,
      phone:
        selectedPatient.phone || "",
    }));
  };

  // ==================== Add Analysis ====================

  const handleAddAnalysis = () => {
    if (!selectedAnalysis) {
      return;
    }

    const analysis =
      analysisList.find(
        (item) =>
          String(item.id) ===
          String(selectedAnalysis)
      );

    if (!analysis) {
      return;
    }

    const exists =
      formData.tests.some(
        (test) =>
          String(test.id) ===
          String(analysis.id)
      );

    if (exists) {
      alert(
        t.analysisAlreadyAdded ||
          (isArabic
            ? "هذا التحليل تمت إضافته بالفعل."
            : "This analysis has already been added.")
      );

      return;
    }

    const newTest = {
      id: analysis.id,
      name: analysis.name,
      price: Number(
        analysis.price || 0
      ),
    };

    setFormData((prev) => ({
      ...prev,

      tests: [
        ...prev.tests,
        newTest,
      ],
    }));

    setSelectedAnalysis("");
  };

  // ==================== Remove Analysis ====================

  const removeTest = (id) => {
    setFormData((prev) => ({
      ...prev,

      tests: prev.tests.filter(
        (test) =>
          String(test.id) !==
          String(id)
      ),
    }));
  };

  // ==================== Submit ====================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.patient) {
      alert(
        t.selectPatient ||
          (isArabic
            ? "من فضلك اختر المريض."
            : "Please select a patient.")
      );

      return;
    }

    if (!formData.phone) {
      alert(
        t.phone ||
          (isArabic
            ? "رقم الهاتف مطلوب."
            : "Phone number is required.")
      );

      return;
    }

    if (
      !formData.tests ||
      formData.tests.length === 0
    ) {
      alert(
        t.completeAllFields ||
          (isArabic
            ? "من فضلك أضف تحليلًا واحدًا على الأقل."
            : "Please add at least one analysis.")
      );

      return;
    }

    // ==================== Calculate Total ====================

    const subtotal =
      formData.tests.reduce(
        (sum, test) =>
          sum +
          Number(test.price || 0),
        0
      );

    const discount =
      Number(
        formData.discount || 0
      );

    const total = Math.max(
      0,
      subtotal - discount
    );

    // ==================== Invoice ====================

    const invoiceData = {
      id: editingInvoice
        ? editingInvoice.id
        : Date.now(),

      patient:
        formData.patient,

      patientId:
        formData.patientId,

      phone:
        formData.phone,

      date: editingInvoice
        ? editingInvoice.date
        : new Date().toLocaleDateString(),

      status:
        formData.status,

      tests:
        formData.tests,

      discount,

      total,

      paid: editingInvoice
        ? Number(
            editingInvoice.paid || 0
          )
        : 0,

      analyses:
        formData.tests.map(
          (test) => test.name
        ),
    };

    // ==================== Send Invoice ====================

    onAddInvoice(invoiceData);

    // ==================== Reset ====================

    resetForm();

    // ==================== Close ====================

    onClose();
  };

  // ==================== Close ====================

  const handleClose = () => {
    resetForm();
    onClose();
  };

  // ==================== Modal ====================

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        bg-black/50
        flex
        justify-center
        items-center
        z-50
        overflow-y-auto
        p-4
      "
    >

      <div
        className="
          bg-white
          dark:bg-gray-800
          dark:text-white
          w-full
          max-w-2xl
          max-h-[90vh]
          overflow-y-auto
          rounded-xl
          shadow-xl
          p-6
        "
      >

        {/* ==================== Header ==================== */}

        <div
          className="
            flex
            justify-between
            items-center
            mb-6
          "
        >

          <h2 className="text-2xl font-bold">
            {editingInvoice
              ? t.editInvoice ||
                (isArabic
                  ? "تعديل الفاتورة"
                  : "Edit Invoice")
              : t.newInvoice ||
                (isArabic
                  ? "فاتورة جديدة"
                  : "New Invoice")}
          </h2>

          <button
            type="button"
            onClick={handleClose}
            className="
              text-2xl
              text-gray-700
              dark:text-white
              hover:text-red-500
              transition
            "
          >
            ✖
          </button>

        </div>

        {/* ==================== Form ==================== */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* ==================== Patient ==================== */}

          <div>

            <label className="block mb-2 font-medium">
              {t.patientName ||
                (isArabic
                  ? "اسم المريض"
                  : "Patient Name")}
            </label>

            <select
              value={
                formData.patientId
              }
              onChange={
                handlePatientChange
              }
              className="
                w-full
                border
                dark:border-gray-600
                dark:bg-gray-700
                dark:text-white
                rounded-lg
                p-3
                outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            >

              <option value="">
                {t.selectPatient ||
                  (isArabic
                    ? "اختر المريض"
                    : "Select Patient")}
              </option>

              {patients.map(
                (patient) => (
                  <option
                    key={patient.id}
                    value={patient.id}
                  >
                    {patient.name}
                  </option>
                )
              )}

            </select>

          </div>

          {/* ==================== Phone ==================== */}

          <div>

            <label className="block mb-2 font-medium">
              {t.phone ||
                (isArabic
                  ? "رقم الهاتف"
                  : "Phone")}
            </label>

            <input
              type="text"
              placeholder={
                t.phone ||
                (isArabic
                  ? "رقم الهاتف"
                  : "Phone")
              }
              value={
                formData.phone
              }
              readOnly
              className="
                w-full
                border
                dark:border-gray-600
                bg-gray-100
                dark:bg-gray-700
                dark:text-white
                rounded-lg
                p-3
                cursor-not-allowed
              "
            />

          </div>

          {/* ==================== Analysis ==================== */}

          <AnalysisSelector
            selectedAnalysis={
              selectedAnalysis
            }
            setSelectedAnalysis={
              setSelectedAnalysis
            }
            handleAddAnalysis={
              handleAddAnalysis
            }
          />

          {/* ==================== Selected Tests ==================== */}

          <SelectedTests
            tests={formData.tests}
            removeTest={removeTest}
          />

          {/* ==================== Discount ==================== */}

          <input
            type="number"
            min="0"
            placeholder={
              t.discount ||
              (isArabic
                ? "الخصم"
                : "Discount")
            }
            value={
              formData.discount
            }
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                discount:
                  e.target.value,
              }))
            }
            className="
              w-full
              border
              dark:border-gray-600
              dark:bg-gray-700
              dark:text-white
              rounded-lg
              p-3
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />

          {/* ==================== Status ==================== */}

          <select
            value={
              formData.status
            }
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                status:
                  e.target.value,
              }))
            }
            className="
              w-full
              border
              dark:border-gray-600
              dark:bg-gray-700
              dark:text-white
              rounded-lg
              p-3
            "
          >

            <option value="Pending">
              {t.pending ||
                (isArabic
                  ? "معلق"
                  : "Pending")}
            </option>

            <option value="Paid">
              {t.paid ||
                (isArabic
                  ? "مدفوع"
                  : "Paid")}
            </option>

            <option value="Cancelled">
              {t.cancelled ||
                (isArabic
                  ? "ملغي"
                  : "Cancelled")}
            </option>

          </select>

          {/* ==================== Summary ==================== */}

          <InvoiceSummary
            tests={formData.tests}
            discount={
              formData.discount
            }
          />

          {/* ==================== Buttons ==================== */}

          <div
            className="
              flex
              flex-col-reverse
              sm:flex-row
              justify-end
              gap-3
              pt-4
            "
          >

            <button
              type="button"
              onClick={handleClose}
              className="
                px-5
                py-2
                border
                border-gray-300
                dark:border-gray-600
                rounded-lg
                hover:bg-gray-100
                dark:hover:bg-gray-700
                transition
              "
            >
              {t.cancel ||
                (isArabic
                  ? "إلغاء"
                  : "Cancel")}
            </button>

            <button
              type="submit"
              className="
                px-5
                py-2
                bg-blue-600
                hover:bg-blue-700
                text-white
                rounded-lg
                transition
              "
            >
              {editingInvoice
                ? t.update ||
                  (isArabic
                    ? "تحديث"
                    : "Update")
                : t.save ||
                  (isArabic
                    ? "حفظ"
                    : "Save")}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddInvoiceModal;


