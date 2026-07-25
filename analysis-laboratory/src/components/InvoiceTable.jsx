import { useState } from "react";
import { FaEye, FaEdit, FaPrint, FaTrash } from "react-icons/fa";
import InvoiceModal from "./InvoiceModal";

function InvoiceTable({
  invoices,
  onDelete,
  onEdit,
  canDelete,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
const handlePrint = (invoice) => {
  const printWindow = window.open("", "_blank");

  printWindow.document.write(`
    <html>
      <head>
        <title>Invoice #${invoice.id}</title>

        <style>
          body{
            font-family:Arial;
            padding:40px;
          }

          h1{
            color:#2563eb;
          }

          table{
            width:100%;
            border-collapse:collapse;
            margin-top:20px;
          }

          th,td{
            border:1px solid #ddd;
            padding:10px;
            text-align:left;
          }

          th{
            background:#f3f4f6;
          }

          .total{
            margin-top:20px;
            text-align:right;
            font-size:22px;
            font-weight:bold;
          }
        </style>

      </head>

      <body>

        <h1>Analysis Laboratory</h1>
        <hr>

<p><strong>Status:</strong> ${invoice.status}</p>

<p><strong>Invoice Date:</strong> ${invoice.date}</p>

<hr>
        <h2>Invoice #${invoice.id}</h2>

        <p><strong>Patient:</strong> ${invoice.patient}</p>

        <p><strong>Phone:</strong> ${invoice.phone}</p>

        <p><strong>Date:</strong> ${invoice.date}</p>

        <table>

          <thead>

            <tr>
              <th>Analysis</th>
              <th>Price</th>
            </tr>

          </thead>

          <tbody>

            ${invoice.tests
              .map(
                (test) => `
                <tr>
                  <td>${test.name}</td>
                  <td>${test.price} EGP</td>
                </tr>
              `
              )
              .join("")}

          </tbody>

        </table>

        <br>

<table>
  <tr>
    <th>Subtotal</th>
    <td>${
      invoice.tests.reduce(
        (sum, test) => sum + test.price,
        0
      )
    } EGP</td>
  </tr>

  <tr>
    <th>Discount</th>
    <td>${invoice.discount} EGP</td>
  </tr>

  <tr>
    <th>Total</th>
    <td><strong>${invoice.total} EGP</strong></td>
  </tr>
</table>

        <h3>Discount : ${invoice.discount} EGP</h3>

        <div class="total">
          Total : ${invoice.total} EGP
        </div>
<br><br><br>

<p style="text-align:center;color:gray">
Thank you for choosing Analysis Laboratory ❤️
</p>
      </body>

    </html>
  `);

printWindow.document.close();

printWindow.onload = () => {
  printWindow.print();
};
};
  return (
   <div className="
  w-full
  bg-white 
  dark:bg-gray-800 
  dark:text-white 
  rounded-xl 
  shadow 
  mt-6 
  overflow-hidden 
  transition-all
  ">
    
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[700px]">
<thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
            <th className="text-left p-4 text-gray-700 dark:text-gray-200">Invoice ID</th>
            <th className="text-left p-4 text-gray-700 dark:text-gray-200">Patient</th>
            <th className="text-left p-4 text-gray-700 dark:text-gray-200">Date</th>
            <th className="text-left p-4 text-gray-700 dark:text-gray-200">Amount</th>
            <th className="text-left p-4 text-gray-700 dark:text-gray-200">Status</th>
            <th className="text-left p-4 text-gray-700 dark:text-gray-200">Actions</th>
          </tr>
        </thead>

        <tbody>
          {invoices.map((invoice) => (
            <tr
              key={invoice.id}
className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"            >
              <td className="p-4 text-gray-700 dark:text-gray-200">#{invoice.id}</td>

              <td className="p-4 text-gray-700 dark:text-gray-200">{invoice.patient}</td>

              <td className="p-4 text-gray-700 dark:text-gray-200">{invoice.date}</td>

              <td className="p-4 text-gray-700 dark:text-gray-200">{invoice.total} EGP</td>

              <td className="p-4 text-gray-700 dark:text-gray-200">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    invoice.status === "Paid"
                      ? "bg-green-100 text-green-700"
                      : invoice.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {invoice.status}
                </span>
              </td>

              <td className="p-4">
<div className="flex gap-3 justify-start lg:justify-center">
                    <button
                    onClick={() => {
                      setSelectedInvoice(invoice);
                      setIsOpen(true);
                    }}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEye />
                  </button>

                 <button
  onClick={() => onEdit(invoice)}
  className="text-green-600 hover:text-green-800 transition"
  title="Edit Invoice"
>
  <FaEdit size={18} />
</button>

                 <button
  onClick={() => handlePrint(invoice)}
  className="text-purple-600 hover:text-purple-800"
  title="Print Invoice"
>
  <FaPrint />
</button>
{canDelete && (
  <button
    onClick={() => onDelete(invoice.id)}
    className="text-red-600 hover:text-red-800 transition"
    title="Delete Invoice"
  >
    <FaTrash size={18} />
  </button>
)}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
</div>
      <InvoiceModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        invoice={selectedInvoice}
      />
    </div>
  );
}

export default InvoiceTable;