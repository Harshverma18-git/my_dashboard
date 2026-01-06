"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/src/lib/supabaseClient";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BarChart3,
  Settings,
  LogOut,
  Cone,
} from "lucide-react";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.replace("/login");
      else setUser(data.user);
    });
  }, []);

  if (!user) return null;

  // base styles
  const baseBtn =
    "w-full flex items-center gap-3 p-2 rounded-md font-semibold transition-all";

  // active / inactive logic
  const getBtnClass = (path: string) =>
    pathname.startsWith(path)
      ? `${baseBtn} bg-[#205992] text-white`
      : `${baseBtn} text-gray-300 hover:bg-[#205992] hover:text-white`;

  // icon color
  const getIconColor = (path: string) =>
    pathname.startsWith(path) ? "text-white" : "text-gray-400";

  return (
    <aside className="w-64 bg-[#020617] p-6 hidden md:flex flex-col justify-between h-screen">
      {/* Top */}
      <div>
        <h2 className="text-xl font-bold mb-10">Side Bar</h2>

        <nav className="space-y-2">
          <p className="text-sm text-gray-400 mb-2">Menu</p>

          {/* Dashboard */}
          <button
            className={getBtnClass("/dashboard")}
            onClick={() => router.push("/dashboard")}
          >
            <LayoutDashboard
              size={18}
              className={getIconColor("/dashboard")}
            />
            Dashboard
          </button>

          {/* Analytics */}
          <button
            className={getBtnClass("/analytics")}
            onClick={() => router.push("/analytics")}
          >
            <BarChart3
              size={18}
              className={getIconColor("/analytics")}
            />
            Analytics
          </button>

          {/* Settings */}
          <button
            className={getBtnClass("/settings")}
            onClick={() => router.push("/settings")}
          >
            <Settings
              size={18}
              className={getIconColor("/settings")}
            />
            Settings
          </button>
          {/* Settings */}
          <button
            className={getBtnClass("/rick-and-morty")}
            onClick={() => router.push("/rick-and-morty")}
          >
            <Cone
              size={18}
              className={getIconColor("/rick-and-morty")}
            />
            Rick and Morty
          </button>
        </nav>
      </div>

      {/* Bottom */}
      <div className="text-sm text-gray-400 bg-black p-3 rounded">
        <p className="truncate">{user.email}</p>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-400 hover:text-red-500 text-xs mt-2"
        >
          <LogOut size={14} /> Logout
        </button>
      </div>
    </aside>
  );
}
