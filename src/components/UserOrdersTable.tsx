type Row = {
  user_id: string;
  full_name: string;
  workspace_name: string;
  amount: number;
  role?: string;
  status?: string;
};

export default function UserOrdersTable({ rows }: { rows: Row[] }) {
  return (
    <div className="bg-[#020617] rounded-xl overflow-hidden">
      
      {/* ================= HEADER (FIXED) ================= */}
      <div className="grid grid-cols-6 bg-[#205992] text-black font-semibold px-4 py-3 text-sm sticky top-0 z-10">
        <div>Name</div>
        <div>Workspace Name</div>
        <div>Amount</div>
        <div>Role</div>
        <div>Status</div>
      </div>

      {/* ================= SCROLLABLE ROWS ================= */}
      <div className="max-h-100 overflow-y-auto">
        {rows.map((row, index) => {
          const initials = row.full_name
            ?.split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();

          return (
            <div
              key={index}
              className="grid grid-cols-6 items-center px-4 py-4 text-sm border-b border-[#1f2937] hover:bg-[#020617]/80"
            >
              {/* Name + Avatar */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#2563eb] flex items-center justify-center text-xs font-bold">
                  {initials}
                </div>
                <span className="font-medium">{row.full_name}</span>
              </div>

              {/* Workspace name */}
              <div className="text-gray-200">
                {row.workspace_name ?? "N/A"}
              </div>

              {/* Amount */}
              <div className="text-gray-200">
                ₹ {row.amount ?? "N/A"}
              </div>

              {/* Role */}
              <div className="text-gray-200">
                {row.role ?? "N/A"}
              </div>
              
              {/* Status */}
              <div className="text-gray-200">
                {row.status ?? "N/A"}
              </div>
            </div>
          );
        })}

        {/* Empty State */}
        {rows.length === 0 && (
          <div className="text-center text-gray-400 py-6">
            No records found
          </div>
        )}
      </div>
    </div>
  );
}
