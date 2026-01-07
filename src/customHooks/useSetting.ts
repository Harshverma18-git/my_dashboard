"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/src/lib/supabaseClient";

export function useSettings() {
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

    return {
    loading,
    saving,
    fullName,
    setFullName,
    email,
    avatarUrl,
    uploading,
    handleAvatarUpload,
    handleSave,
    };
}