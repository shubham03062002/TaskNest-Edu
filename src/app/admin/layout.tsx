import "../globals.css"; // if needed
import AdminNavbar from "../components/AdminNavbar";
import Footer from "../components/Footer";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <AdminNavbar />
      <main className="pt-20 px-4 bg-gray-50 min-h-screen">{children}</main>
      <Footer />
    </div>
  );
}
