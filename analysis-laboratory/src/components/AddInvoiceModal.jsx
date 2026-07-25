import { useState, useEffect } from "react";
import { analysisTypesData } from "../data/analysisTypes";
import { getPatients } from "../data/patientStorage";
import AnalysisSelector from "./AnalysisSelector";
import SelectedTests from "./SelectedTests";
import InvoiceSummary from "./InvoiceSummary";

function AddInvoiceModal({
  isOpen,
  onClose,
  onAddInvoice,
  editingInvoice,
}) {
  const [selectedAnalysis, setSelectedAnalysis] = useState("");

 const [formData, setFormData] = useState({
  patient: "",
  patientId: "",
  phone: "",
  tests: [],
  discount: "",
  status: "Pending",
});

const patients = getPatients();
useEffect(() => {
  if (editingInvoice) {
    setFormData({
      patient: editingInvoice.patient,
      patientId: editingInvoice.patientId || "",
      phone: editingInvoice.phone,
      tests: editingInvoice.tests,
      discount: editingInvoice.discount,
      status: editingInvoice.status,
    });
  } else {
    setFormData({
      patient: "",
      patientId: "",
      phone: "",
      tests: [],
      discount: "",
      status: "Pending",
    });
  }
}, [editingInvoice]);

  if (!isOpen) return null;

  const handleAddAnalysis = () => {
    if (!selectedAnalysis) return;

    const analysis = analysisTypesData.find(
      (item) => item.id === Number(selectedAnalysis)
    );

    if (!analysis) return;

    const exists = formData.tests.some(
      (test) => test.id === analysis.id
    );

    if (exists) {
      alert("Analysis already added");
      return;
    }

    setFormData({
      ...formData,
      tests: [
        ...formData.tests,
        {
          id: analysis.id,
          name: analysis.name,
          price: analysis.price,
        },
      ],
    });

    setSelectedAnalysis("");
  };

  const removeTest = (id) => {
    setFormData({
      ...formData,
      tests: formData.tests.filter(
        (test) => test.id !== id
      ),
    });
  };

  const subtotal = formData.tests.reduce(
    (sum, test) => sum + test.price,
    0
  );

  const total =
    subtotal - Number(formData.discount || 0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.patient ||
      !formData.phone ||
      formData.tests.length === 0
    ) {
      alert("Complete all fields.");
      return;
    }

 const invoiceData = {
  id: editingInvoice ? editingInvoice.id : Date.now(),
  patient: formData.patient,
  phone: formData.phone,
  date: editingInvoice
    ? editingInvoice.date
    : new Date().toLocaleDateString(),
  status: formData.status,
  tests: formData.tests,
  discount: Number(formData.discount),
  total,

  patientId: formData.patientId,
  paid: 0,
analyses: formData.tests.map((test) => test.name),
};

onAddInvoice(invoiceData);

setFormData({
  patient: "",
  patientId: "",
  phone: "",
  tests: [],
  discount: "",
  status: "Pending",
});

setSelectedAnalysis("");

onClose();
  };


  
    return (
<div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 overflow-y-auto p-4">
<div className="bg-white dark:bg-gray-800 dark:text-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl shadow-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
  {editingInvoice ? "Edit Invoice" : "Add New Invoice"}
</h2>

          <button
            onClick={onClose}
           className="text-2xl text-gray-700 dark:text-white hover:text-red-500 transition"
          >
            ✖
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
  <select
  value={formData.patient}
  onChange={(e) => {
    const selectedPatient = patients.find(
      (patient) => patient.name === e.target.value
    );

    setFormData({
      ...formData,
      patient: selectedPatient.name,
      patientId: selectedPatient.id,
      phone: selectedPatient.phone,
    });
  }}
  className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg p-3 mb-3"
>
  <option value="">Select Patient</option>

  {patients.map((patient) => (
    <option key={patient.id} value={patient.name}>
      {patient.name}
    </option>
  ))}
</select>

         <input
  type="text"
  placeholder="Phone"
  value={formData.phone}
  readOnly
className="w-full border dark:border-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-white rounded-lg p-3 cursor-not-allowed"
/>

          <AnalysisSelector
            selectedAnalysis={selectedAnalysis}
            setSelectedAnalysis={setSelectedAnalysis}
            handleAddAnalysis={handleAddAnalysis}
          />

          <SelectedTests
            tests={formData.tests}
            removeTest={removeTest}
          />

          <input
            type="number"
            placeholder="Discount"
            value={formData.discount}
            onChange={(e) =>
              setFormData({
                ...formData,
                discount: e.target.value,
              })
            }
         className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg p-3"
          />

          <select
            value={formData.status}
            onChange={(e) =>
              setFormData({
                ...formData,
                status: e.target.value,
              })
            }
className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg p-3"          >
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <InvoiceSummary
            tests={formData.tests}
            discount={formData.discount}
          />

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
className="px-5 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"            >
              Cancel
            </button>

            <button
              type="submit"
className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"            >
              Save Invoice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddInvoiceModal;