function InvoiceSummary({ tests, discount }) {
  const subtotal = tests.reduce(
  (sum, test) => sum + Number(test.price),
  0
);

  const total = subtotal - Number(discount || 0);

  return (
    <div className="mt-6 bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 rounded-xl p-4">
<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Invoice Summary
      </h3>

<div className="flex justify-between mb-2 text-gray-700 dark:text-gray-300">
          <span>Subtotal</span>
        <span>{subtotal} EGP</span>
      </div>

<div className="flex justify-between mb-2 text-gray-700 dark:text-gray-300">
          <span>Discount</span>
        <span>{discount || 0} EGP</span>
      </div>

<hr className="my-3 border-gray-300 dark:border-gray-600" />
      <div className="flex justify-between text-xl font-bold text-blue-600 dark:text-blue-400">
        <span>Total</span>
        <span>{total} EGP</span>
      </div>
    </div>
  );
}

export default InvoiceSummary;