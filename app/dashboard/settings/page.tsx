"use client";

export default function SettingsPage() {
  return (
    <div className="max-w-5xl mx-auto">

      <h1 className="text-3xl font-bold mb-8">
        Settings
      </h1>

      <div className="space-y-6">

        <div className="bg-white border rounded-xl shadow p-6">

          <h2 className="text-xl font-semibold mb-4">
            Notifications
          </h2>

          <label className="flex items-center justify-between py-3">

            <span>Email Notifications</span>

            <input type="checkbox" defaultChecked />

          </label>

          <label className="flex items-center justify-between py-3">

            <span>Order Updates</span>

            <input type="checkbox" defaultChecked />

          </label>

        </div>

        <div className="bg-white border rounded-xl shadow p-6">

          <h2 className="text-xl font-semibold mb-4">
            Appearance
          </h2>

          <select className="border rounded-lg p-3 w-60">

            <option>Light Mode</option>

            <option>Dark Mode</option>

            <option>System Default</option>

          </select>

        </div>

        <div className="bg-white border rounded-xl shadow p-6">

          <h2 className="text-xl font-semibold mb-4">
            Security
          </h2>

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg">
            Change Password
          </button>

        </div>

        <div className="bg-white border rounded-xl shadow p-6 border-red-200">

          <h2 className="text-xl font-semibold text-red-600 mb-4">
            Danger Zone
          </h2>

          <button className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg">
            Delete Account
          </button>

        </div>

      </div>

    </div>
  );
}