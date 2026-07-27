"use client";

import { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  Globe,
  GraduationCap,
  ShieldCheck,
  Calendar,
  User,
  MapPin,
  Clock,
  CheckCircle2,
  Camera,
  Save,
} from "lucide-react";

import profileService from "@/services/profileService";
import { Profile } from "@/types/profile";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [profile, setProfile] =
    useState<Profile | null>(null);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    country: "",
    timezone: "",
    university: "",
    academic_level: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      setLoading(true);

      const data =
        await profileService.getProfile();

      setProfile(data);

      setForm({
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        phone: data.phone || "",
        country: data.country || "",
        timezone: data.timezone || "",
        university: data.university || "",
        academic_level:
          data.academic_level || "",
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function saveProfile() {
    try {
      setSaving(true);

      const updated =
        await profileService.updateProfile(
          form
        );

      setProfile(updated);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        Loading profile...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        Profile not found.
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div className="rounded-3xl border bg-white p-8 shadow-sm">

        <div className="flex flex-col gap-8 lg:flex-row lg:items-center">

          <div className="relative">

            <img
              src={
                profile.avatar ||
                "https://ui-avatars.com/api/?name=" +
                  encodeURIComponent(
                    profile.name
                  )
              }
              alt=""
              className="h-36 w-36 rounded-full object-cover border-4 border-blue-100"
            />

            <button
              className="absolute bottom-1 right-1 rounded-full bg-blue-600 p-3 text-white"
            >
              <Camera size={18} />
            </button>

          </div>

          <div className="flex-1">

            <div className="flex items-center gap-3">

              <h1 className="text-4xl font-bold">
                {profile.name}
              </h1>

              {profile.is_verified && (
                <CheckCircle2
                  className="text-green-600"
                  size={26}
                />
              )}

            </div>

            <p className="mt-2 text-gray-500">
              Student Dashboard
            </p>

            <div className="mt-6 flex flex-wrap gap-5">

              <div className="flex items-center gap-2 text-gray-600">

                <Mail size={18} />

                {profile.email}

              </div>

              <div className="flex items-center gap-2 text-gray-600">

                <Calendar size={18} />

                Joined{" "}
                {new Date(
                  profile.created_at
                ).toLocaleDateString()}

              </div>

            </div>

          </div>

        </div>

      </div>

      <div className="grid gap-8 xl:grid-cols-3">

        <div className="xl:col-span-2 space-y-8">

          <div className="rounded-3xl border bg-white p-8 shadow-sm">

            <h2 className="mb-8 text-2xl font-bold">
              Personal Information
            </h2>

            <div className="grid gap-6 md:grid-cols-2">

              <div>

                <label className="mb-2 block font-medium">
                  First Name
                </label>

                <input
                  className="w-full rounded-xl border p-4"
                  name="first_name"
                  value={form.first_name}
                  onChange={handleChange}
                />

              </div>

              <div>

                <label className="mb-2 block font-medium">
                  Last Name
                </label>

                <input
                  className="w-full rounded-xl border p-4"
                  name="last_name"
                  value={form.last_name}
                  onChange={handleChange}
                />

              </div>

              <div>

                <label className="mb-2 block font-medium">
                  Phone
                </label>

                <input
                  className="w-full rounded-xl border p-4"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                />

              </div>

              <div>

                <label className="mb-2 block font-medium">
                  Country
                </label>

                <input
                  className="w-full rounded-xl border p-4"
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                />

              </div>

              <div>

                <label className="mb-2 block font-medium">
                  Timezone
                </label>

                <input
                  className="w-full rounded-xl border p-4"
                  name="timezone"
                  value={form.timezone}
                  onChange={handleChange}
                />

              </div>

            </div>

          </div>

          <div className="rounded-3xl border bg-white p-8 shadow-sm">

            <h2 className="mb-8 text-2xl font-bold">
              Academic Information
            </h2>

            <div className="grid gap-6 md:grid-cols-2">

              <div>

                <label className="mb-2 block font-medium">
                  University
                </label>

                <input
                  className="w-full rounded-xl border p-4"
                  name="university"
                  value={form.university}
                  onChange={handleChange}
                />

              </div>

              <div>

                <label className="mb-2 block font-medium">
                  Academic Level
                </label>

                <select
                  className="w-full rounded-xl border p-4"
                  name="academic_level"
                  value={
                    form.academic_level
                  }
                  onChange={handleChange}
                >
                  <option value="">
                    Select
                  </option>

                  <option>
                    High School
                  </option>

                  <option>
                    College
                  </option>

                  <option>
                    Undergraduate
                  </option>

                  <option>
                    Masters
                  </option>

                  <option>PhD</option>

                </select>

              </div>

            </div>

          </div>

        </div>

        <div className="space-y-8">

          <div className="rounded-3xl border bg-white p-8 shadow-sm">

            <h2 className="mb-6 text-xl font-bold">
              Account Status
            </h2>

            <div className="space-y-5">

              <div className="flex justify-between">

                <span>Email</span>

                <span>{profile.email}</span>

              </div>

              <div className="flex justify-between">

                <span>Verification</span>

                <span className="font-semibold text-green-600">

                  {profile.is_verified
                    ? "Verified"
                    : "Pending"}

                </span>

              </div>

            </div>

          </div>

          <div className="rounded-3xl border bg-white p-8 shadow-sm">

            <h2 className="mb-6 text-xl font-bold">
              Statistics
            </h2>

            <div className="space-y-5">

              <div className="flex justify-between">

                <span>Orders</span>

                <span>0</span>

              </div>

              <div className="flex justify-between">

                <span>Completed</span>

                <span>0</span>

              </div>

              <div className="flex justify-between">

                <span>Files Uploaded</span>

                <span>0</span>

              </div>

            </div>

          </div>

          <button
            onClick={saveProfile}
            disabled={saving}
            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-600 py-4 text-white font-semibold hover:bg-blue-700"
          >

            <Save size={18} />

            {saving
              ? "Saving..."
              : "Save Changes"}

          </button>

        </div>

      </div>

    </div>
  );
}