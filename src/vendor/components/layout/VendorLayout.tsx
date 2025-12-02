import { Outlet } from 'react-router-dom';
import { VendorSidebar } from './VendorSidebar';
import { VendorHeader } from './VendorHeader';

export function VendorLayout() {
  return (
    <div className="flex h-screen bg-neutral-50">
      <VendorSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <VendorHeader />
        <main className="flex-1 overflow-y-auto">
          <div className="container-custom py-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
