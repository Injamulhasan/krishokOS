"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Edit,
  X,
  Save,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

interface ProfileClientProps {
  user: {
    id: string;
    name: string;
    email: string;
    phone?: string;
  };
  farm?: {
    district: string;
    upazila: string;
    union: string;
  } | null;
}

export default function ProfileClient({ user, farm }: ProfileClientProps) {
  const router = useRouter();

  // State for active profile values
  const [profile, setProfile] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone || "",
  });

  // Modal control and edit form state
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ ...profile });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Form input validation
  const validateForm = () => {
    if (!editForm.name.trim()) return "Full name is required";
    if (!editForm.email.trim()) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(editForm.email)) return "Invalid email address";
    return null;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editForm),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to update profile");
      }

      // Update state with saved user details
      setProfile({
        name: data.user.name,
        email: data.user.email,
        phone: data.user.phone || "",
      });

      setSuccessMsg("Your profile has been updated successfully.");
      setIsEditing(false);

      // Trigger server components refresh
      router.refresh();

      // Auto-dismiss success notification
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  // Format farm location
  const formatLocation = () => {
    if (!farm) return "Bangladesh (Farm profile not set up)";
    const parts = [];
    if (farm.union) parts.push(farm.union);
    if (farm.upazila) parts.push(farm.upazila);
    if (farm.district) parts.push(farm.district);
    return parts.join(", ");
  };

  return (
    <div className="min-h-screen bg-[#F3F9F4] pb-12">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => router.push("/dashboard")}
            className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition"
            aria-label="Back to Dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900 leading-tight">User Profile</h1>
            <p className="text-xs text-gray-500 font-medium">Manage your account information</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 mt-8">
        {/* Success Alert */}
        {successMsg && (
          <div className="mb-6 flex items-center gap-3 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-xl shadow-sm animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
            <p className="text-sm font-semibold">{successMsg}</p>
          </div>
        )}

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-gray-100">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center shadow-inner shrink-0">
                <User className="w-10 h-10 text-white" />
              </div>
              <div className="space-y-1">
                <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                  {profile.name}
                </h2>
                <p className="text-sm text-gray-500 font-medium">{profile.email}</p>
              </div>
            </div>

            <button
              onClick={() => {
                setEditForm({ ...profile });
                setError(null);
                setIsEditing(true);
              }}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-green-600 text-green-600 font-bold rounded-xl hover:bg-green-50/50 transition cursor-pointer"
            >
              <Edit className="w-4 h-4" />
              Edit Profile
            </button>
          </div>

          {/* Profile Information Details */}
          <div className="mt-8">
            <h3 className="text-base font-bold text-gray-900 mb-6 uppercase tracking-wider">
              Personal Information
            </h3>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Full Name */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center shrink-0">
                  <User className="w-5 h-5 text-gray-500" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs text-gray-400 font-semibold block">Full Name</span>
                  <span className="text-sm font-bold text-gray-800 block">
                    {profile.name}
                  </span>
                </div>
              </div>

              {/* Email Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-gray-500" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs text-gray-400 font-semibold block">Email Address</span>
                  <span className="text-sm font-bold text-gray-800 block break-all">
                    {profile.email}
                  </span>
                </div>
              </div>

              {/* Phone Number */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-gray-500" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs text-gray-400 font-semibold block">Phone Number</span>
                  <span className="text-sm font-bold text-gray-800 block">
                    {profile.phone || "Not provided"}
                  </span>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-gray-500" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs text-gray-400 font-semibold block">Location</span>
                  <span className="text-sm font-bold text-gray-800 block capitalize">
                    {formatLocation()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Edit Profile Modal Dialog */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => !isLoading && setIsEditing(false)}
          />

          {/* Modal Box */}
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transform transition-all animate-scaleUp">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Edit Profile</h3>
              <button
                disabled={isLoading}
                onClick={() => setIsEditing(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSave}>
              <div className="p-6 space-y-4">
                {/* Form Error Alert */}
                {error && (
                  <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-800 p-3 rounded-xl">
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                    <p className="text-xs font-semibold">{error}</p>
                  </div>
                )}

                {/* Name Input */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="edit-name"
                    className="text-xs font-bold text-gray-600 uppercase tracking-wide"
                  >
                    Full Name
                  </label>
                  <input
                    id="edit-name"
                    type="text"
                    required
                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:border-green-600 focus:ring-1 focus:ring-green-600 outline-none transition font-semibold text-gray-800"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email Input */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="edit-email"
                    className="text-xs font-bold text-gray-600 uppercase tracking-wide"
                  >
                    Email Address
                  </label>
                  <input
                    id="edit-email"
                    type="email"
                    required
                    value={editForm.email}
                    onChange={(e) =>
                      setEditForm((prev) => ({ ...prev, email: e.target.value }))
                    }
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:border-green-600 focus:ring-1 focus:ring-green-600 outline-none transition font-semibold text-gray-800"
                    placeholder="Enter your email address"
                  />
                </div>

                {/* Phone Input */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="edit-phone"
                    className="text-xs font-bold text-gray-600 uppercase tracking-wide"
                  >
                    Phone Number (Optional)
                  </label>
                  <input
                    id="edit-phone"
                    type="text"
                    value={editForm.phone}
                    onChange={(e) =>
                      setEditForm((prev) => ({ ...prev, phone: e.target.value }))
                    }
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:border-green-600 focus:ring-1 focus:ring-green-600 outline-none transition font-semibold text-gray-800"
                    placeholder="e.g. +880 17XXXXXXXX"
                  />
                </div>
              </div>

              {/* Modal Actions */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-sm font-semibold text-gray-500 hover:text-gray-800 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex items-center gap-2 px-5 py-2 text-sm font-bold text-white bg-green-600 hover:bg-green-700 disabled:bg-green-400 rounded-xl transition cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
