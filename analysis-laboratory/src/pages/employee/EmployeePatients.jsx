import StatCard from "../../components/StatCard";
import InvoiceTable from "../../components/InvoiceTable";

import {
  getInvoices,
  saveInvoices,
} from "../../data/invoiceStorage";

import AddInvoiceModal from "../../components/AddInvoiceModal";

import {
  getPatients,
  savePatients,
} from "../../data/patientStorage";

import { useState, useEffect } from "react";

function EmployeeInvoices() {
  const defaultInvoices = getInvoices();

  const [invoices, setInvoices] = useState(() => {
    return defaultInvoices.length > 0
      ? defaultInvoices
      : [];
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);

  // ==================== Save Invoices ====================

  useEffect(() => {
    saveInvoices(invoices);
  }, [invoices]);

  // ==================== Add / Edit Invoice ====================

  const handleAddInvoice = (invoiceData) => {
    // ==================== Edit Invoice ====================

    if (editingInvoice) {
      setInvoices((prevInvoices) =>
        prevInvoices.map((invoice) =>
          invoice.id === invoiceData.id
            ? invoiceData
            : invoice
        )
      );

      // Update patient after editing invoice
      updatePatientFromInvoice(invoiceData);

      setEditingInvoice(null);
      return;
    }

    // ==================== New Invoice ====================

    setInvoices((prevInvoices) => [
      invoiceData,
      ...prevInvoices,
    ]);

    // Update patient with invoice information
    updatePatientFromInvoice(invoiceData);

    setEditingInvoice(null);
  };

  // ==================== Update Patient ====================

  const updatePatientFromInvoice = (invoiceData) => {
    const patients = getPatients();

    const updatedPatients = patients.map((patient) => {
      if (
        String(patient.id) !==
        String(invoiceData.patientId)
      ) {
        return patient;
      }

      // Existing analyses
      const oldAnalyses = Array.isArray(
        patient.analyses
      )
        ? patient.analyses
        : [];

      // Analyses coming from invoice
      const newAnalyses = Array.isArray(
        invoiceData.analyses
      )
        ? invoiceData.analyses
        : [];

      // Merge old + new without duplicates
      const mergedAnalyses = [
        ...oldAnalyses,
        ...newAnalyses.filter(
          (newAnalysis) =>
            !oldAnalyses.includes(newAnalysis)
        ),
      ];

      return {
        ...patient,

        // Payment information
        total: invoiceData.total,

        paid: invoiceData.paid,

        status: invoiceData.status,

        // Analysis information
        analyses: mergedAnalyses,
      };
    });

    savePatients(updatedPatients);
  };

  // ==================== Filter ====================

  const filteredInvoices = invoices.filter((invoice) => {
    const patientName =
      invoice.patient || "";

    const invoiceId =
      invoice.id?.toString() || "";

    const matchesSearch =
      patientName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      invoiceId.includes(search);

    const matchesStatus =
      statusFilter === "All" ||
      invoice.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // ==================== Statistics ====================

  const totalInvoices = invoices.length;

  const paidInvoices = invoices.filter(
    (invoice) =>
      invoice.status === "Paid"
  ).length;

  const pendingInvoices = invoices.filter(
    (invoice) =>
      invoice.status === "Pending"
  ).length;

  const totalRevenue = invoices
    .filter(
      (invoice) =>
        invoice.status === "Paid"
    )
    .reduce(
      (sum, invoice) =>
        sum + Number(invoice.total || 0),
      0
    );

  // ==================== Delete ====================

  const handleDeleteInvoice = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this invoice?"
    );

    if (!confirmDelete) return;

    setInvoices((prevInvoices) =>
      prevInvoices.filter(
        (invoice) =>
          invoice.id !== id
      )
    );
  };

  // ==================== Edit ====================

  const handleEditInvoice = (invoice) => {
    setEditingInvoice(invoice);
    setIsAddOpen(true);
  };

  // ==================== Render ====================

  return (
    <div
      className="
        w-full
        max-w-full
        px-3 sm:px-4 lg:px-6
        py-4
        bg-gray-50
        dark:bg-gray-900
        min-h-screen
        overflow-hidden
      "
    >

      {/* ==================== Header ==================== */}

      <h1
        className="
          text-xl sm:text-2xl lg:text-3xl
          font-bold
          text-gray-800
          dark:text-white
        "
      >
        Employee Invoices
      </h1>

      <p className="text-gray-500 dark:text-gray-400 mt-2">
        Create, update and print patient invoices
      </p>

      {/* ==================== Statistics ==================== */}

      <div
        className="
          w-full
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-4
          gap-4
          mt-6
        "
      >
        <StatCard
          title="Total Invoices"
          value={totalInvoices}
          icon="🧾"
        />

        <StatCard
          title="Paid"
          value={paidInvoices}
          icon="✅"
        />

        <StatCard
          title="Pending"
          value={pendingInvoices}
          icon="⏳"
        />

        <StatCard
          title="Revenue"
          value={`${totalRevenue} EGP`}
          icon="💰"
        />
      </div>

      {/* ==================== Search & Filter ==================== */}

      <div
        className="
          mt-6
          bg-white
          dark:bg-gray-800
          rounded-2xl
          shadow-sm
          p-4
          flex
          flex-col
          lg:flex-row
          gap-4
          lg:items-center
          lg:justify-between
        "
      >

        <input
          type="text"
          placeholder="Search by patient or invoice ID..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="
            border
            dark:border-gray-600
            dark:bg-gray-700
            dark:text-white
            rounded-xl
            px-4
            py-2.5
            w-full
            lg:w-80
            outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        />

        <div
          className="
            flex
            flex-col
            sm:flex-row
            gap-3
            w-full
            lg:w-auto
          "
        >

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="
              border
              dark:border-gray-600
              dark:bg-gray-700
              dark:text-white
              rounded-xl
              px-4
              py-2.5
              w-full
              sm:w-auto
            "
          >
            <option>All</option>
            <option>Paid</option>
            <option>Pending</option>
            <option>Cancelled</option>
          </select>

          <button
            onClick={() => {
              setEditingInvoice(null);
              setIsAddOpen(true);
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
              w-full
              sm:w-auto
            "
          >
            + Create Invoice
          </button>

        </div>
      </div>

      {/* ==================== Invoice Table ==================== */}

      <InvoiceTable
        invoices={filteredInvoices}
        onDelete={handleDeleteInvoice}
        onEdit={handleEditInvoice}
        canDelete={false}
      />

      {/* ==================== Add Invoice Modal ==================== */}

      <AddInvoiceModal
        isOpen={isAddOpen}
        onClose={() => {
          setIsAddOpen(false);
          setEditingInvoice(null);
        }}
        onAddInvoice={handleAddInvoice}
        editingInvoice={editingInvoice}
      />

    </div>
  );
}

export default EmployeeInvoices;


