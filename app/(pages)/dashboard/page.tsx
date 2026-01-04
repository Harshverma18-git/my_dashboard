"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

import StatCard from "@/components/StatCard";
import UserOrdersTable from "@/components/UserOrdersTable";
import CategoryCard from "@/components/CategoryCard";

type DashboardCounts = {
  total_revenue: number;
  total_orders: number;
  total_users: number;
};

export default function DashboardPage() {
  const router = useRouter();

  const [loadingCounts, setLoadingCounts] = useState(true);
  const [counts, setCounts] = useState<DashboardCounts | null>(null);

  const [loadingTable, setLoadingTable] = useState(true);
  const [rows, setRows] = useState<any[]>([]);

  /* 🔌 FETCH STAT CARDS DATA */
  useEffect(() => {
    const fetchDashboardCounts = async () => {
      const { data, error } = await supabase.rpc("get_dashboard_counts");

      if (error) {
        console.error("Dashboard count error:", error);
      } else {
        setCounts(data[0]);
      }

      setLoadingCounts(false);
    };

    fetchDashboardCounts();
  }, []);

  /* 🔌 FETCH TABLE DATA */
  useEffect(() => {
    const fetchTableData = async () => {
      const { data, error } = await supabase.rpc(
        "get_user_workspace_orders"
      );

      if (error) {
        console.error("Table data error:", error);
      } else {
        setRows(data);
      }

      setLoadingTable(false);
    };

    fetchTableData();
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex">
      <main className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">
            Welcome to your dashboard
          </h1>

          <input
            placeholder="Search"
            className="bg-[#020617] border border-gray-700 rounded px-3 py-2 text-sm outline-none"
          />
        </div>

        {/* ================= STATS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <StatCard
            title="Revenue"
            value={
              loadingCounts
                ? "Loading..."
                : `₹ ${counts?.total_revenue.toFixed(2)}`
            }
          />

          <StatCard
            title="Orders"
            value={loadingCounts ? "Loading..." : counts?.total_orders}
          />

          <StatCard
            title="Users"
            value={loadingCounts ? "Loading..." : counts?.total_users}
          />
        </div>

        {/* ================= TABLE (REPLACED DONUT) ================= */}
        <div className="mb-6">
          {loadingTable ? (
            <p className="text-gray-400">Loading orders...</p>
          ) : (
            <UserOrdersTable rows={rows} />
          )}
        </div>

        {/* ================= CATEGORY ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CategoryCard name="Category name" percent={45} />
          <CategoryCard name="Category name" percent={80} />
        </div>
      </main>
    </div>
  );
}
