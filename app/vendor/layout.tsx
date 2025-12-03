import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { VendorSidebar } from '@/components/vendor/components/layout/VendorSidebar';
import { VendorHeader } from '@/components/vendor/components/layout/VendorHeader';

export default function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute requiredRole="vendor">
      <div className="flex h-screen bg-neutral-50 overflow-hidden">
        <VendorSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <VendorHeader />
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
