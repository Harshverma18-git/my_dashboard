"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // 🔹 Fetch user
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) return;

      setEmail(data.user.email || "");
      setFullName(data.user.user_metadata?.full_name || "");
      setAvatarUrl(data.user.user_metadata?.avatar_url || null);
      setLoading(false);
    };

    getUser();
  }, []);

  // 🔹 Upload avatar
  const handleAvatarUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      setUploading(true);

      if (!e.target.files || e.target.files.length === 0) return;

      const file = e.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      const publicUrl = data.publicUrl;

      // Save URL in user metadata
      await supabase.auth.updateUser({
        data: { avatar_url: publicUrl },
      });

      setAvatarUrl(publicUrl);
    } catch (error) {
      alert("Image upload failed");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  // 🔹 Save name
  const handleSave = async () => {
    setSaving(true);
    await supabase.auth.updateUser({
      data: { full_name: fullName },
    });
    setSaving(false);
    alert("Profile updated ✅");
  };

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

