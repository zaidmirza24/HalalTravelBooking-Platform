import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from './Button';

interface FilterSection {
  id: string;
  title: string;
  content: React.ReactNode;
}

export function FilterPanel() {
  const [openSections, setOpenSections] = useState<string[]>(['price', 'halal']);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  
  const toggleSection = (id: string) => {
    setOpenSections(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };
  
  const sections: FilterSection[] = [
    {
      id: 'price',
      title: 'Price Range',
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="5000" 
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
        </div>
      )
    },
    {
      id: 'halal',
      title: 'Halal Level',
      content: (
        <div className="space-y-3">
          {['Strict (No alcohol in premises)', 'Moderate (Separate areas)', 'Basic (Halal food available)'].map((level, i) => (
            <label key={i} className="flex items-center gap-3 cursor-pointer">
              <input 
                type="radio" 
                name="halal-level"
                className="w-5 h-5 text-emerald-600 border-neutral-300 focus:ring-emerald-500"
              />
              <span className="text-sm text-neutral-700">{level}</span>
            </label>
          ))}
        </div>
      )
    },
    {
      id: 'amenities',
      title: 'Amenities',
      content: (
        <div className="space-y-3">
          {['Prayer Room', 'Halal Restaurant', 'Separate Pool', 'Family Rooms', 'Women-only Spa'].map((amenity, i) => (
            <label key={i} className="flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                className="w-5 h-5 rounded text-emerald-600 border-neutral-300 focus:ring-emerald-500"
              />
              <span className="text-sm text-neutral-700">{amenity}</span>
            </label>
          ))}
        </div>
      )
    },
    {
      id: 'rating',
      title: 'Guest Rating',
      content: (
        <div className="space-y-3">
          {['Excellent (4.5+)', 'Very Good (4.0+)', 'Good (3.5+)', 'Fair (3.0+)'].map((rating, i) => (
            <label key={i} className="flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                className="w-5 h-5 rounded text-emerald-600 border-neutral-300 focus:ring-emerald-500"
              />
              <span className="text-sm text-neutral-700">{rating}</span>
            </label>
          ))}
        </div>
      )
    }
  ];
  
  return (
    <div className="bg-white rounded-2xl shadow-card p-6 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h3>Filters</h3>
        <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
          Clear all
        </button>
      </div>
      
      <div className="space-y-4">
        {sections.map((section) => (
          <div key={section.id} className="border-b border-neutral-200 pb-4 last:border-0">
            <button
              onClick={() => toggleSection(section.id)}
              className="flex items-center justify-between w-full text-left mb-4 hover:text-emerald-600 transition-colors"
            >
              <h4>{section.title}</h4>
              {openSections.includes(section.id) ? (
                <ChevronUp className="w-5 h-5 text-neutral-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-neutral-400" />
              )}
            </button>
            {openSections.includes(section.id) && (
              <div className="animate-in slide-in-from-top-2 duration-200">
                {section.content}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-6 border-t border-neutral-200">
        <Button variant="primary" className="w-full">
          Apply Filters
        </Button>
      </div>
    </div>
  );
}
