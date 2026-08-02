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

  useEffect(() => {
    saveInvoices(invoices);
  }, [invoices]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);

  // ==================== Add / Edit Invoice ====================

  const handleAddInvoice = (invoiceData) => {
    if (editingInvoice) {
      setInvoices((prev) =>
        prev.map((invoice) =>
          invoice.id === invoiceData.id
            ? invoiceData
            : invoice
        )
      );
    } else {
      setInvoices((prev) => [
        invoiceData,
        ...prev,
      ]);

      // Update patient data
      const patients = getPatients();

      const updatedPatients = patients.map((patient) => {
        if (patient.id === invoiceData.patientId) {
          return {
            ...patient,
            total: invoiceData.total,
            paid: invoiceData.paid,
            status: invoiceData.status,
            analyses: invoiceData.analyses,
          };
        }

        return patient;
      });

      savePatients(updatedPatients);
    }

    setEditingInvoice(null);
  };

  // ==================== Filter ====================

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.patient
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      invoice.id
        .toString()
        .includes(search);

    const matchesStatus =
      statusFilter === "All" ||
      invoice.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // ==================== Statistics ====================

  const totalInvoices = invoices.length;

  const paidInvoices = invoices.filter(
    (invoice) => invoice.status === "Paid"
  ).length;

  const pendingInvoices = invoices.filter(
    (invoice) => invoice.status === "Pending"
  ).length;

  const totalRevenue = invoices
    .filter((invoice) => invoice.status === "Paid")
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

    setInvoices((prev) =>
      prev.filter((invoice) => invoice.id !== id)
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
        min-h-screen
        px-3 sm:px-4 lg:px-6
        py-5 sm:py-6 lg:py-8

        bg-gray-100
        dark:bg-gray-900

        text-gray-900
        dark:text-white

        transition-colors
        duration-300

        overflow-x-hidden
      "
    >

      {/* ==================== Header ==================== */}

      <div className="mb-6">

        <h1
          className="
            text-xl sm:text-2xl lg:text-3xl
            font-bold
            text-gray-900
            dark:text-white
          "
        >
          Employee Invoices
        </h1>

        <p
          className="
            text-sm sm:text-base
            text-gray-500
            dark:text-gray-400
            mt-2
          "
        >
          Create, update and print patient invoices
        </p>

      </div>

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

          border
          border-gray-200
          dark:border-gray-700

          rounded-2xl
          shadow-sm

          p-4

          flex
          flex-col
          lg:flex-row

          gap-4

          lg:items-center
          lg:justify-between

          transition-colors
          duration-300
        "
      >

        {/* Search */}

        <input
          type="text"
          placeholder="Search by patient or invoice ID..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="
            border
            border-gray-300
            dark:border-gray-600

            rounded-xl

            px-4
            py-2.5

            w-full
            lg:w-80

            outline-none

            bg-white
            dark:bg-gray-700

            text-gray-900
            dark:text-white

            placeholder-gray-400
            dark:placeholder-gray-400

            focus:ring-2
            focus:ring-blue-500

            transition-colors
          "
        />

        {/* Filter + Button */}

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

          {/* Status */}

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="
              border
              border-gray-300
              dark:border-gray-600

              rounded-xl

              px-4
              py-2.5

              w-full
              sm:w-auto

              bg-white
              dark:bg-gray-700

              text-gray-900
              dark:text-white

              outline-none

              focus:ring-2
              focus:ring-blue-500

              transition-colors
            "
          >
            <option value="All">All</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">
              Cancelled
            </option>
          </select>

          {/* Create Invoice */}

          <button
            onClick={() => setIsAddOpen(true)}
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

              whitespace-nowrap
            "
          >
            + Create Invoice
          </button>

        </div>

      </div>

      {/* ==================== Invoice Table ==================== */}

      <div
        className="
          mt-6
          w-full
          overflow-hidden

          bg-white
          dark:bg-gray-800

          border
          border-gray-200
          dark:border-gray-700

          rounded-2xl
          shadow-sm

          transition-colors
          duration-300
        "
      >

        <InvoiceTable
          invoices={filteredInvoices}
          onDelete={handleDeleteInvoice}
          onEdit={handleEditInvoice}
          canDelete={false}
        />

      </div>

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
