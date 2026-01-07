"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/src/lib/supabaseClient";

type DashboardCounts = {
  total_revenue: number;
  total_orders: number;
  total_users: number;
};

export function useDashboard() {
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
        setCounts(data?.[0] ?? null);
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
        setRows(data ?? []);
      }

      setLoadingTable(false);
    };

    fetchTableData();
  }, []);

  return {
    counts,
    rows,
    loadingCounts,
    loadingTable,
  };
}
