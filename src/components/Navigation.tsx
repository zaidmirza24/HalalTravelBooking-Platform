import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, Globe, DollarSign } from 'lucide-react';
import { Button } from './Button';

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C11.5 7 7 11.5 2 12c5 .5 9.5 5 10 10 .5-5 5-9.5 10-10-5-.5-9.5-5-10-10z"/>
              </svg>
            </div>
            <span className="font-bold text-xl text-neutral-900">HalalTravel</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <Link to="/" className="text-neutral-700 hover:text-emerald-600 transition-colors">Home</Link>
            <Link to="/search" className="text-neutral-700 hover:text-emerald-600 transition-colors">Destinations</Link>
            <Link to="/search" className="text-neutral-700 hover:text-emerald-600 transition-colors">Packages</Link>
            <a href="#umrah" className="text-neutral-700 hover:text-emerald-600 transition-colors">Umrah</a>
            <a href="#hotels" className="text-neutral-700 hover:text-emerald-600 transition-colors">Hotels</a>
            <a href="#about" className="text-neutral-700 hover:text-emerald-600 transition-colors">About</a>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <button className="flex items-center gap-1 text-neutral-700 hover:text-emerald-600 transition-colors">
              <Globe className="w-4 h-4" />
              <span className="text-sm">EN</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            <button className="flex items-center gap-1 text-neutral-700 hover:text-emerald-600 transition-colors">
              <DollarSign className="w-4 h-4" />
              <span className="text-sm">USD</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            <Link to="/login">
              <Button variant="ghost" size="small">Login</Button>
            </Link>
            <Link to="/register">
              <Button variant="primary" size="small">Sign Up</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-neutral-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="container-custom py-4 flex flex-col gap-4">
            <Link to="/" className="text-neutral-700 py-2">Home</Link>
            <Link to="/search" className="text-neutral-700 py-2">Destinations</Link>
            <Link to="/search" className="text-neutral-700 py-2">Packages</Link>
            <a href="#umrah" className="text-neutral-700 py-2">Umrah</a>
            <a href="#hotels" className="text-neutral-700 py-2">Hotels</a>
            <a href="#about" className="text-neutral-700 py-2">About</a>
            <div className="flex items-center gap-4 pt-4 border-t">
              <Link to="/login" className="flex-1">
                <Button variant="ghost" size="small" className="w-full">Login</Button>
              </Link>
              <Link to="/register" className="flex-1">
                <Button variant="primary" size="small" className="w-full">Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
