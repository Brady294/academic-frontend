export default function SupportPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold">
          Support Center
        </h1>

        <p className="mt-3 text-gray-500">
          The Support Center is currently under development.
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
          <li>• Submit support tickets</li>
          <li>• Track ticket progress</li>
          <li>• Chat with our support team</li>
          <li>• Browse frequently asked questions</li>
          <li>• Access help guides and tutorials</li>
          <li>• Receive technical assistance</li>
        </ul>
      </div>
    </div>
  );
}