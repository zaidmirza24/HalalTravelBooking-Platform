import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Home } from './pages/Home';
import { SearchResults } from './pages/SearchResults';
import { PackageDetail } from './pages/PackageDetail';
import { BookingFlow } from './pages/BookingFlow';
import { UserDashboard } from './pages/UserDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
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
          <Route path="/booking" element={<BookingFlow />} />
          <Route path="/dashboard" element={<UserDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;