import StudentSidebar from "@/app/components/StudentSidebar";


export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    
      <div className="flex min-h-screen bg-gradient-to-br from-yellow-50 to-pink-50">
        <StudentSidebar />
        
        {/* Fix: wrap main in a div that grows next to sidebar */}
        <div className="flex-1 p-6">
          {children}
        </div>
      </div>
    </>
  );
}
