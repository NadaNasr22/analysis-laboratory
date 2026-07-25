function InvoiceModal({ isOpen, onClose, invoice }) {
    if (!invoice) return null;
      if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">

      <div className="bg-white dark:bg-gray-800 dark:text-white w-[550px] rounded-2xl shadow-2xl p-6">

        <div className="flex justify-between items-center mb-6">
<h2 className="text-2xl font-bold text-gray-900 dark:text-white">
             Invoice #{invoice.id}
          </h2>

          <button
            onClick={onClose}
className="text-2xl text-gray-500 dark:text-gray-300 hover:text-red-500 transition"          >
            ✖
          </button>
        </div>

       <div className="space-y-2">

  <p className="text-gray-700 dark:text-gray-300">
    <strong>Patient:</strong> {invoice.patient}
  </p>

  <p className="text-gray-700 dark:text-gray-300">
    <strong>Phone:</strong> {invoice.phone}
  </p>

  <p className="text-gray-700 dark:text-gray-300">
    <strong>Date:</strong> {invoice.date}
  </p>

  <p className="text-gray-700 dark:text-gray-300">
    <strong>Status:</strong> {invoice.status}
  </p>

</div>

        <hr className="my-5" />

       <div className="space-y-3">

  {invoice.tests.map((test, index) => (

    <div
      key={index}
      className="flex justify-between"
    >
      <span>{test.name}</span>

      <span>{test.price} EGP</span>

    </div>

  ))}

</div>
<hr className="my-5 border-gray-300 dark:border-gray-600" />
        <div className="flex justify-between text-lg font-bold">
  <span>Discount</span>

          <span>Total</span>

<span>{invoice.total} EGP</span>
        </div>

      </div>

    </div>
  );
}

export default InvoiceModal;