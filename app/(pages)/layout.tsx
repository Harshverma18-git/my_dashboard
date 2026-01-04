import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // ❌ min-h-screen ❌
    // ✅ h-screen (fixed height)
    <div className="flex h-screen w-full bg-[#0f172a] overflow-hidden">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Content Area */}
      <div className="flex flex-col flex-1 w-full overflow-hidden">
        
        {/* Header (fixed height) */}
        <Header />

        {/* ✅ ONLY THIS SCROLLS */}
        <main className="flex-1 w-full px-6 py-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
