"use client";

import StatCard from "@/components/StatCard";
import ChartCard from "@/components/UserOrdersTable";
import CategoryCard from "@/components/CategoryCard";

export default function AnalyticsPage() {
  return (
    <div className="w-full text-white">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Analytics</h1>
        <p className="text-sm text-gray-400">
          Track your performance and statistics
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <StatCard title="Total Sales" value="₹ 12,450" />
        <StatCard title="Visitors" value="8,245" />
        <StatCard title="Conversion" value="3.4%" />
        <StatCard title="Growth" value="+12%" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <ChartCard rows={[]} />
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CategoryCard name="Marketing" percent={60} />
        <CategoryCard name="Sales" percent={80} />
        <CategoryCard name="Operations" percent={45} />
        <CategoryCard name="Development" percent={70} />
      </div>
    </div>
  );
}
