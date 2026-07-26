"use client";

export default function ProfilePage() {
  return (
    <div className="max-w-5xl mx-auto">

      <h1 className="text-3xl font-bold mb-8">
        My Profile
      </h1>

      <div className="bg-white rounded-xl border shadow p-8">

        <div className="flex items-center gap-6">

          <div className="w-24 h-24 rounded-full bg-red-600 flex items-center justify-center text-white text-3xl font-bold">
            U
          </div>

          <div>

            <h2 className="text-2xl font-semibold">
              Student Account
            </h2>

            <p className="text-gray-500">
              Manage your personal information.
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-10">

          <div>
            <label className="block text-sm font-medium mb-2">
              Full Name
            </label>

            <input
              className="w-full border rounded-lg p-3"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Email
            </label>

            <input
              disabled
              className="w-full border rounded-lg p-3 bg-gray-100"
              placeholder="Email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Phone
            </label>

            <input
              className="w-full border rounded-lg p-3"
              placeholder="+254..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Country
            </label>

            <input
              className="w-full border rounded-lg p-3"
              placeholder="Country"
            />
          </div>

        </div>

        <button className="mt-8 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg">
          Save Changes
        </button>

      </div>

    </div>
  );
}