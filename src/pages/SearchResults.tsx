import React, { useState } from 'react';
import { Navigation } from '../components/Navigation';
import { SearchBar } from '../components/SearchBar';
import { FilterPanel } from '../components/FilterPanel';
import { PackageCard } from '../components/PackageCard';
import { MobileBottomNav } from '../components/MobileBottomNav';
import { Footer } from '../components/Footer';
import { SlidersHorizontal, Map, Grid, List } from 'lucide-react';
import { packages } from '../data/mockData';
import { Button } from '../components/Button';

type ViewMode = 'grid' | 'list';
type SortOption = 'recommended' | 'price-low' | 'price-high' | 'rating';

export function SearchResults() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<SortOption>('recommended');
  
  return (
    <div className="min-h-screen bg-neutral-50">
      <Navigation />
      
      {/* Search Bar */}
      <div className="bg-white border-b border-neutral-200 py-4">
        <div className="container-custom">
          <SearchBar />
        </div>
      </div>
      
      {/* Results Header */}
      <div className="bg-white border-b border-neutral-200 py-4">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="mb-1">234 properties found</h3>
              <p className="text-sm text-neutral-600">Istanbul, Turkey • December 15-22, 2024</p>
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
              {/* Mobile Filter Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-300 hover:border-emerald-600 hover:text-emerald-600 transition-colors lg:hidden flex-1 md:flex-initial"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span className="font-medium">Filters</span>
              </button>
              
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-lg border border-neutral-300 outline-none focus:border-emerald-600 transition-colors cursor-pointer flex-1 md:flex-initial"
              >
                <option value="recommended">Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
              
              {/* View Toggle */}
              <div className="hidden md:flex items-center gap-2 bg-neutral-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
              </div>
              
              {/* Map Button */}
              <Button variant="secondary" size="small" icon={<Map className="w-4 h-4" />} className="hidden lg:flex">
                Map view
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container-custom py-8">
        <div className="flex gap-6">
          {/* Filter Panel - Desktop */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <FilterPanel />
          </aside>
          
          {/* Results */}
          <main className="flex-1">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {packages.map((pkg) => (
                  <PackageCard
                    key={pkg.id}
                    {...pkg}
                    layout="vertical"
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {packages.map((pkg) => (
                  <PackageCard
                    key={pkg.id}
                    {...pkg}
                    layout="horizontal"
                  />
                ))}
              </div>
            )}
            
            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-8">
              <button className="px-4 py-2 rounded-lg border border-neutral-300 hover:border-emerald-600 hover:text-emerald-600 transition-colors">
                Previous
              </button>
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                    page === 1
                      ? 'bg-emerald-600 text-white'
                      : 'border border-neutral-300 hover:border-emerald-600 hover:text-emerald-600'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button className="px-4 py-2 rounded-lg border border-neutral-300 hover:border-emerald-600 hover:text-emerald-600 transition-colors">
                Next
              </button>
            </div>
          </main>
        </div>
      </div>
      
      {/* Mobile Filter Sheet */}
      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowFilters(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[80vh] overflow-y-auto animate-in slide-in-from-bottom duration-300">
            <div className="sticky top-0 bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between">
              <h3>Filters</h3>
              <button onClick={() => setShowFilters(false)} className="text-neutral-600 hover:text-emerald-600">
                Done
              </button>
            </div>
            <div className="p-6">
              <FilterPanel />
            </div>
          </div>
        </div>
      )}
      
      <div className="pb-20 lg:pb-0">
        <Footer />
      </div>
      
      <MobileBottomNav activePage="search" />
    </div>
  );
}
