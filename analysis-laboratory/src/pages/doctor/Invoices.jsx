import StatCard from "../../components/StatCard";
import InvoiceTable from "../../components/InvoiceTable";
import { useState } from "react";
import {
  getInvoices,
  saveInvoices,
} from "../../data/invoiceStorage";
import AddInvoiceModal from "../../components/AddInvoiceModal";
import { useLanguage } from "../../constants/useLanguage";
import { translations } from "../../constants/translations";

function Invoices() {

  const { language } = useLanguage();
  const t = translations[language];

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [invoices, setInvoices] = useState(getInvoices());
  const [editingInvoice, setEditingInvoice] = useState(null);

  const handleAddInvoice = (invoiceData) => {

    let updatedInvoices;

    if (editingInvoice) {

      updatedInvoices = invoices.map((invoice) =>
        invoice.id === invoiceData.id
          ? invoiceData
          : invoice
      );

    } else {

      updatedInvoices = [
        invoiceData,
        ...invoices,
      ];

    }

    setInvoices(updatedInvoices);
    saveInvoices(updatedInvoices);

    setEditingInvoice(null);
  };

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
      (sum, invoice) => sum + invoice.total,
      0
    );

  const handleDeleteInvoice = (id) => {

    const confirmDelete = window.confirm(
      t.confirmDeleteInvoice
    );

    if (!confirmDelete) return;

    const updatedInvoices = invoices.filter(
      (invoice) => invoice.id !== id
    );

    setInvoices(updatedInvoices);
    saveInvoices(updatedInvoices);
  };

  const handleEditInvoice = (invoice) => {
    setEditingInvoice(invoice);
    setIsAddOpen(true);
  };

  const [currentPage, setCurrentPage] = useState(1);

  const invoicesPerPage = 5;

  const indexOfLastInvoice =
    currentPage * invoicesPerPage;

  const indexOfFirstInvoice =
    indexOfLastInvoice - invoicesPerPage;

  const currentInvoices =
    filteredInvoices.slice(
      indexOfFirstInvoice,
      indexOfLastInvoice
    );

  const totalPages = Math.ceil(
    filteredInvoices.length / invoicesPerPage
  );

  return (
<div
  className="
    p-4 sm:p-6
    pt-20 sm:pt-22
    overflow-x-hidden
    bg-gray-50
    dark:bg-gray-900
    dark:text-white
    min-h-screen
    transition-all
  "
>
      {/* Header */}

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
        {t.invoicePageTitle}
      </h1>

      <p className="text-gray-500 dark:text-gray-400 mt-2">
        {t.manageInvoices}
      </p>


      {/* Statistics */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">

        <StatCard
          title={t.totalInvoices}
          value={totalInvoices}
          icon="🧾"
        />

        <StatCard
          title={t.paid}
          value={paidInvoices}
          icon="✅"
        />

        <StatCard
          title={t.pending}
          value={pendingInvoices}
          icon="⏳"
        />

        <StatCard
          title={t.revenue}
          value={`${totalRevenue} EGP`}
          icon="💰"
        />

      </div>


      {/* Search & Filter */}

      <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow p-4 flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 transition-all">

        <input
          type="text"
          placeholder={t.searchInvoice}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full lg:w-80 border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-auto border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-4 py-2"
          >
            <option value="All">{t.all}</option>
            <option value="Paid">{t.paid}</option>
            <option value="Pending">{t.pending}</option>
            <option value="Cancelled">{t.cancelled}</option>
          </select>


          <button
            onClick={() => setIsAddOpen(true)}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
          >
            + {t.newInvoice}
          </button>

        </div>

      </div>


      {/* Desktop Table */}

      <div className="hidden lg:block">

        <InvoiceTable
          invoices={currentInvoices}
          onDelete={handleDeleteInvoice}
          onEdit={handleEditInvoice}
          canDelete={true}
        />

      </div>


      {/* Mobile Cards */}

      <div className="lg:hidden space-y-4 mt-6">

        {filteredInvoices.length === 0 ? (

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 text-center">
            {t.noInvoicesFound}
          </div>

        ) : (

          currentInvoices.map((invoice) => (

            <div
              key={invoice.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow p-4"
            >

              <div className="space-y-2 text-sm">

                <p>
                  <span className="font-semibold">
                    {t.invoiceId}:
                  </span>{" "}
                  {invoice.id}
                </p>

                <p>
                  <span className="font-semibold">
                    {t.patient}:
                  </span>{" "}
                  {invoice.patient}
                </p>

                <p>
                  <span className="font-semibold">
                    {t.total}:
                  </span>{" "}
                  {invoice.total} EGP
                </p>

                <p>
                  <span className="font-semibold">
                    {t.date}:
                  </span>{" "}
                  {invoice.date}
                </p>


                <span
                  className={`
                    inline-block px-3 py-1 rounded-full
                    text-white text-xs
                    ${
                      invoice.status === "Paid"
                        ? "bg-green-500"
                        : invoice.status === "Pending"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }
                  `}
                >
                  {invoice.status === "Paid"
                    ? t.paid
                    : invoice.status === "Pending"
                    ? t.pending
                    : t.cancelled}
                </span>


                <div className="flex justify-end gap-2 mt-4">

                  <button
                    onClick={() =>
                      handleEditInvoice(invoice)
                    }
                    className="bg-yellow-500 text-white p-2 rounded-md"
                    title={t.edit}
                  >
                    ✏️
                  </button>

                  <button
                    onClick={() =>
                      handleDeleteInvoice(invoice.id)
                    }
                    className="bg-red-500 text-white p-2 rounded-md"
                    title={t.delete}
                  >
                    🗑️
                  </button>

                </div>

              </div>

            </div>

          ))
        )}

      </div>


      {/* Add / Edit Invoice Modal */}

      <AddInvoiceModal
        isOpen={isAddOpen}
        onClose={() => {
          setIsAddOpen(false);
          setEditingInvoice(null);
        }}
        onAddInvoice={handleAddInvoice}
        editingInvoice={editingInvoice}
      />


      {/* Pagination */}

      <div className="flex justify-end items-center gap-2 mt-6">

        <button
          disabled={currentPage === 1}
          onClick={() =>
            setCurrentPage(currentPage - 1)
          }
          className="px-2 py-1 text-sm border rounded-lg disabled:opacity-50"
        >
          {t.prev}
        </button>


        {[...Array(totalPages)].map((_, index) => (

          <button
            key={index}
            onClick={() =>
              setCurrentPage(index + 1)
            }
            className={`w-8 h-8 text-sm rounded-lg border ${
              currentPage === index + 1
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white dark:bg-gray-800"
            }`}
          >
            {index + 1}
          </button>

        ))}


        <button
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage(currentPage + 1)
          }
          className="px-2 py-1 text-sm border rounded-lg disabled:opacity-50"
        >
          {t.next}
        </button>

      </div>

    </div>
  );
}

export default Invoices;
