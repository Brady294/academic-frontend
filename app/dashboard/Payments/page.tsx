export default function PaymentsPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold">Payments</h1>

        <p className="mt-3 text-gray-500">
          Payment management is currently under development.
        </p>
      </div>

      <div className="rounded-3xl border border-dashed bg-white p-12 text-center">
        <h2 className="text-xl font-semibold">
          Coming Soon
        </h2>

        <p className="mt-3 text-gray-500">
          Soon you'll be able to:
        </p>

        <ul className="mt-6 space-y-2 text-gray-600">
          <li>• View invoices</li>
          <li>• Pay for orders</li>
          <li>• Download receipts</li>
          <li>• View payment history</li>
          <li>• Save payment methods</li>
        </ul>
      </div>
    </div>
  );
}