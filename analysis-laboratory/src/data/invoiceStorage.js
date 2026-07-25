import initialInvoices from "./invoices";

export const getInvoices = () => {
  const savedInvoices = localStorage.getItem("invoices");

  if (savedInvoices) {
    return JSON.parse(savedInvoices);
  }

  return initialInvoices;
};

export const saveInvoices = (invoices) => {
  localStorage.setItem(
    "invoices",
    JSON.stringify(invoices)
  );
};