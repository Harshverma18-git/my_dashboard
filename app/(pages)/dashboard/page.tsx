"use client";

import StatCard from "@/src/components/StatCard";
import UserOrdersTable from "@/src/components/UserOrdersTable";
import CategoryCard from "@/src/components/CategoryCard";
import { useDashboard } from "@/src/customHooks/useDashboard";

export default function DashboardPage() {
  const {counts, rows, loadingCounts, loadingTable} = useDashboard();

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
          <CategoryCard name="Categories" percent={45} />
          <CategoryCard name="Orders" percent={80} />
        </div>
      </main>
    </div>
  );
}
