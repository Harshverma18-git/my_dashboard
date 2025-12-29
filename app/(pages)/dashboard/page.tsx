"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import StatCard from "@/components/StatCard";
import ChartCard from "@/components/ChartCard";
import CategoryCard from "@/components/CategoryCard";
import { LogOut } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.replace("/login");
      } else {
        setUser(data.user);
      }
    });
  }, []);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#020617] p-6 hidden md:block">
        <h2 className="text-xl font-bold mb-10">Side Bar</h2>

        <nav className="space-y-4">
          <p className="text-sm text-gray-400">Menu</p>
          <button className="w-full text-left  text-white p-2 rounded-md font-semibold hover:bg-[#205992]">
            Dashboard
          </button>
          <button className="w-full text-left  text-white p-2 rounded-md font-semibold hover:bg-[#205992]">
            Analytics
          </button>
          <button className="w-full text-left  text-white p-2 rounded-md font-semibold hover:bg-[#205992]">
            Settings
          </button>
        </nav>

        <div className="absolute bottom-6 text-sm text-gray-400 bg-black p-2 rounded w-50">
          {user.email}
          <button onClick={handleLogout} className="flex items-center gap-1 text-red-400 hover:text-red-500 text-xs">
          <LogOut size={14} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 ">
          <h1 className="text-2xl font-semibold">
            Welcome to your dashboard
          </h1>
          <input
            placeholder="Search"
            className="bg-[#020617] border border-gray-700 rounded px-3 py-2 text-sm"
          />
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <StatCard title="Revenue" value="₹ 4725.05" />
          <StatCard title="Orders" value="₹ 1282" />
          <StatCard title="Users" value="₹ 1282" />
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          <ChartCard />
          <CategoryCard name="Category name" percent={45} />
          <CategoryCard name="Category name" percent={80} />
        </div>
      </main>
    </div>
  );
}
