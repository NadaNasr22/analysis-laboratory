import StatCard from "../../components/StatCard";
import InvoiceTable from "../../components/InvoiceTable";
import { useState } from "react";
import initialInvoices from "../../data/invoices";
import AddInvoiceModal from "../../components/AddInvoiceModal";
function Invoices() {
  const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] = useState("All");
const [isAddOpen, setIsAddOpen] = useState(false);
const [invoices, setInvoices] = useState(initialInvoices);
const [editingInvoice, setEditingInvoice] = useState(null);
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
  }

  setEditingInvoice(null);
};
const filteredInvoices = invoices.filter((invoice) => {
  const matchesSearch =
    invoice.patient.toLowerCase().includes(search.toLowerCase()) ||
    invoice.id.toString().includes(search);

  const matchesStatus =
    statusFilter === "All" || invoice.status === statusFilter;

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
  .reduce((sum, invoice) => sum + invoice.total, 0);



  const handleDeleteInvoice = (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this invoice?"
  );

  if (!confirmDelete) return;

  setInvoices((prev) =>
    prev.filter((invoice) => invoice.id !== id)
  );
};


const handleEditInvoice = (invoice) => {
  setEditingInvoice(invoice);
  setIsAddOpen(true);
};
  return (
<div className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 dark:text-white min-h-screen overflow-x-hidden transition-all">
<h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
        Invoices</h1>
<p className="text-gray-500 dark:text-gray-400 mt-2">
          Manage all laboratory invoices
      </p>

      {/* Statistics */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
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
{/* Search & Filter */}
<div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow p-4 flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 transition-all">
 <input
  type="text"
  placeholder="Search by patient or invoice ID..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
className="w-full lg:w-80 border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"></input>
<div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
<select
  value={statusFilter}
  onChange={(e) => setStatusFilter(e.target.value)}
className="w-full sm:w-auto border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-4 py-2">      <option>All</option>
      <option>Paid</option>
      <option>Pending</option>
      <option>Cancelled</option>
    </select>

   <button
  onClick={() => setIsAddOpen(true)}
className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg">
  + New Invoice
</button>

  </div>

</div>
<div className="hidden lg:block">
  <InvoiceTable
    invoices={filteredInvoices}
    onDelete={handleDeleteInvoice}
    onEdit={handleEditInvoice}
    canDelete={true}
  />
  </div>
<div className="lg:hidden space-y-4 mt-6">

{filteredInvoices.length === 0 ? (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 text-center">
    No invoices found
  </div>
) : (
  filteredInvoices.map((invoice)=>(
    
    <div
      key={invoice.id}
      className="bg-white dark:bg-gray-800 rounded-xl shadow p-4"
    >

    <div className="space-y-2 text-sm">

      <p>
        <span className="font-semibold">Invoice ID:</span>{" "}
        {invoice.id}
      </p>

      <p>
        <span className="font-semibold">Patient:</span>{" "}
        {invoice.patient}
      </p>

      <p>
        <span className="font-semibold">Total:</span>{" "}
        {invoice.total} EGP
      </p>

      <p>
        <span className="font-semibold">Date:</span>{" "}
        {invoice.date}
      </p>


      <span
        className={`
        inline-block px-3 py-1 rounded-full text-white text-xs
        ${
          invoice.status === "Paid"
          ? "bg-green-500"
          : invoice.status === "Pending"
          ? "bg-yellow-500"
          : "bg-red-500"
        }
        `}
      >
        {invoice.status}
      </span>


      <div className="flex justify-end gap-2 mt-4">

        <button
          onClick={()=>handleEditInvoice(invoice)}
          className="bg-yellow-500 text-white p-2 rounded-md"
        >
          ✏️
        </button>


        <button
          onClick={()=>handleDeleteInvoice(invoice.id)}
          className="bg-red-500 text-white p-2 rounded-md"
        >
          🗑️
        </button>

      </div>


    </div>

    </div>
  ))
)}

</div>
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

export default Invoices;