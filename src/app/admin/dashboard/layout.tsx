import AdminDashboardSidebar from "@/app/components/AdminDashboard";
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <AdminDashboardSidebar />
      <main className="flex-1 p-6 bg-gray-50 min-h-screen">
        {children}
      </main>
    </div>
  );
}
