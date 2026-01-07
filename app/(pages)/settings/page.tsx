"use client";
import { useSettings } from "@/src/customHooks/useSetting";

export default function SettingsPage() {
  const {
    fullName,
    setFullName,
    email,
    avatarUrl,
    uploading,
    loading,
    saving,
    handleAvatarUpload,
    handleSave,
  } = useSettings();

  if (loading) return <p className="text-gray-400">Loading...</p>;

  return (
    <div className="w-full text-white max-w-4xl">
      <h1 className="text-2xl font-semibold mb-6">Settings</h1>

      <div className="bg-[#020617] border border-gray-800 rounded-xl p-6">
        {/* Avatar */}
        <div className="flex items-center gap-6 mb-6">
          <div className="w-20 h-20 rounded-full bg-gray-700 overflow-hidden">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-sm text-gray-300">
                No Image
              </div>
            )}
          </div>

          <label className="cursor-pointer text-sm bg-[#205992] px-4 py-2 rounded">
            {uploading ? "Uploading..." : "Upload Photo"}
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              hidden
            />
          </label>
        </div>

        {/* Profile Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full Name"
            className="bg-[#0f172a] border border-gray-700 rounded p-3"
          />

          <input
            value={email}
            disabled
            className="bg-[#0f172a] border border-gray-700 rounded p-3 text-gray-400"
          />
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="mt-4 bg-[#205992] px-4 py-2 rounded disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}