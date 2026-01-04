type Row = {
  user_id: string;
  full_name: string;
  email: string;
  phone?: string;
  role?: string;
  has_access?: boolean;
};

export default function UserOrdersTable({ rows }: { rows: Row[] }) {
  return (
    <div className="bg-[#020617] rounded-xl overflow-hidden">
      {/* ================= HEADER ================= */}
      <div className="grid grid-cols-6 bg-[#205992] text-black font-semibold px-4 py-3 text-sm">
        <div>Name</div>
        <div>Email</div>
        <div>Phone No</div>
        <div>Role</div>
        <div>Is Access</div>
        <div className="text-center">Action</div>
      </div>

      {/* ================= ROWS ================= */}
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

            {/* Email */}
            <div className="text-gray-200">{row.email}</div>

            {/* Phone */}
            <div className="text-gray-200">
              {row.phone ?? "-"}
            </div>

            {/* Role */}
            <div className="text-gray-200">
              {row.role ?? "-"}
            </div>

            {/* Access */}
            <div
              className={`font-semibold ${
                row.has_access
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {row.has_access ? "Access" : "Denied"}
            </div>

            {/* Action */}
            <div className="flex justify-center">
              {row.has_access ? (
                <button className="bg-[#7c6cff] hover:bg-[#6b5cf5] p-2 rounded-lg">
                  ✏️
                </button>
              ) : (
                <button className="bg-[#2dd4bf] hover:bg-[#14b8a6] p-2 rounded-lg text-black">
                  ➕
                </button>
              )}
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
  );
}
