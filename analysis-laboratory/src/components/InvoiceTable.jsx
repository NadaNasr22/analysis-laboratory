import { useState } from "react";
import {
  FaEye,
  FaEdit,
  FaPrint,
  FaTrash,
} from "react-icons/fa";

import InvoiceModal from "./InvoiceModal";

import { useLanguage } from "../constants/useLanguage";
import { translations } from "../constants/translations";

function InvoiceTable({
  invoices,
  onDelete,
  onEdit,
  canDelete,
}) {

  const { language } = useLanguage();
  const t = translations[language];

  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handlePrint = (invoice) => {

    const printWindow = window.open("", "_blank");

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${t.invoice} #${invoice.id}</title>

          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 40px;
              color: #333;
            }

            h1 {
              text-align: center;
              margin-bottom: 30px;
            }

            .info {
              margin-bottom: 20px;
            }

            .info p {
              margin: 8px 0;
            }

            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }

            th, td {
              border: 1px solid #ddd;
              padding: 12px;
              text-align: left;
            }

            th {
              background: #f3f3f3;
            }
          </style>
        </head>

        <body>

          <h1>${t.invoice} #${invoice.id}</h1>

          <div class="info">

            <p>
              <strong>${t.patient}:</strong>
              ${invoice.patient}
            </p>

            <p>
              <strong>${t.date}:</strong>
              ${invoice.date}
            </p>

            <p>
              <strong>${t.status}:</strong>
              ${
                invoice.status === "Paid"
                  ? t.paid
                  : invoice.status === "Pending"
                  ? t.pending
                  : t.cancelled
              }
            </p>

          </div>

          <table>

            <thead>
              <tr>
                <th>${t.analysis}</th>
                <th>${t.price}</th>
              </tr>
            </thead>

            <tbody>

              ${
                invoice.tests
                  ?.map(
                    (test) => `
                      <tr>
                        <td>${test.name}</td>
                        <td>${test.price} EGP</td>
                      </tr>
                    `
                  )
                  .join("") || ""
              }

            </tbody>

          </table>

          <br><br>

          <h2>
            ${t.total}: ${invoice.total} EGP
          </h2>

          <br><br><br>

          <p style="text-align:center;color:gray">
            ${t.thankYouInvoice}
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

              <th className="text-left p-4 text-gray-700 dark:text-gray-200">
                {t.invoiceId}
              </th>

              <th className="text-left p-4 text-gray-700 dark:text-gray-200">
                {t.patient}
              </th>

              <th className="text-left p-4 text-gray-700 dark:text-gray-200">
                {t.date}
              </th>

              <th className="text-left p-4 text-gray-700 dark:text-gray-200">
                {t.amount}
              </th>

              <th className="text-left p-4 text-gray-700 dark:text-gray-200">
                {t.status}
              </th>

              <th className="text-left p-4 text-gray-700 dark:text-gray-200">
                {t.actions}
              </th>

            </tr>

          </thead>

          <tbody>

            {invoices.map((invoice) => (

              <tr
                key={invoice.id}
                className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
              >

                <td className="p-4 text-gray-700 dark:text-gray-200">
                  #{invoice.id}
                </td>

                <td className="p-4 text-gray-700 dark:text-gray-200">
                  {invoice.patient}
                </td>

                <td className="p-4 text-gray-700 dark:text-gray-200">
                  {invoice.date}
                </td>

                <td className="p-4 text-gray-700 dark:text-gray-200">
                  {invoice.total} EGP
                </td>

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
                    {invoice.status === "Paid"
                      ? t.paid
                      : invoice.status === "Pending"
                      ? t.pending
                      : t.cancelled}
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
                      title={t.view}
                    >
                      <FaEye />
                    </button>

                    <button
                      onClick={() => onEdit(invoice)}
                      className="text-green-600 hover:text-green-800 transition"
                      title={t.editInvoice}
                    >
                      <FaEdit size={18} />
                    </button>

                    <button
                      onClick={() => handlePrint(invoice)}
                      className="text-purple-600 hover:text-purple-800"
                      title={t.printInvoice}
                    >
                      <FaPrint />
                    </button>

                    {canDelete && (
                      <button
                        onClick={() => onDelete(invoice.id)}
                        className="text-red-600 hover:text-red-800 transition"
                        title={t.deleteInvoice}
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
