import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { AdminSidebar } from '@/components/admin/components/layout/AdminSidebar';
import { AdminHeader } from '@/components/admin/components/layout/AdminHeader';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute requiredRole="admin">
      <div className="flex h-screen bg-neutral-50 overflow-hidden">
        <AdminSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto">
            <div className="container-custom py-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
