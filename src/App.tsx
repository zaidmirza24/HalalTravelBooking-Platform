import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ApiProvider } from './contexts/ApiContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Home } from './pages/Home';
import { SearchResults } from './pages/SearchResults';
import { PackageDetail } from './pages/PackageDetail';
import { BookingFlow } from './pages/BookingFlow';
import { UserDashboard } from './pages/UserDashboard';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { AdminLayout } from './admin/components/layout/AdminLayout';
import { AdminDashboard } from './admin/pages/AdminDashboard';
import { BookingsManagement } from './admin/pages/BookingsManagement';
import { HotelsManagement } from './admin/pages/HotelsManagement';
import { UsersManagement } from './admin/pages/UsersManagement';
import { VendorLayout } from './vendor/components/layout/VendorLayout';
import { VendorDashboard } from './vendor/pages/VendorDashboard';
import { VendorHotels } from './vendor/pages/VendorHotels';
import { VendorBookings } from './vendor/pages/VendorBookings';

function App() {
  return (
    <ApiProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-white">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={
              <>
                <Navigation />
                <Home />
                <Footer />
                <MobileBottomNav activePage="home" />
              </>
            } />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/package/:id" element={<PackageDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected User Routes */}
            <Route path="/booking" element={
              <ProtectedRoute>
                <BookingFlow />
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            } />

            {/* Protected Admin Routes */}
            <Route path="/admin/*" element={
              <ProtectedRoute requiredRole="admin">
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="bookings" element={<BookingsManagement />} />
              <Route path="hotels" element={<HotelsManagement />} />
              <Route path="users" element={<UsersManagement />} />
              {/* More admin routes will be added here */}
            </Route>

            {/* Protected Vendor Routes */}
            <Route path="/vendor/*" element={
              <ProtectedRoute requiredRole="vendor">
                <VendorLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Navigate to="/vendor/dashboard" replace />} />
              <Route path="dashboard" element={<VendorDashboard />} />
              <Route path="hotels" element={<VendorHotels />} />
              <Route path="bookings" element={<VendorBookings />} />
              {/* More vendor routes will be added here */}
            </Route>
          </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ApiProvider>
  );
}

export default App;