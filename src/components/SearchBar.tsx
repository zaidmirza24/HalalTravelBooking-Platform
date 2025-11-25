import React, { useState } from 'react';
import { MapPin, Calendar, Users, Search, ChevronDown } from 'lucide-react';
import { Button } from './Button';

export function SearchBar({ large = false }: { large?: boolean }) {
  const [destination, setDestination] = useState('');
  const [dates, setDates] = useState('');
  const [travelers, setTravelers] = useState('2 Adults');
  const [halalLevel, setHalalLevel] = useState('All Levels');
  
  if (large) {
    return (
      <div className="w-full max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-dropdown p-2 flex flex-col lg:flex-row gap-2">
          {/* Destination */}
          <div className="flex-1 flex items-center gap-3 px-4 py-3 hover:bg-neutral-50 rounded-lg transition-colors cursor-pointer">
            <MapPin className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <div className="flex-1">
              <div className="text-caption text-neutral-600">Where to?</div>
              <input 
                type="text" 
                placeholder="Search destinations"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full outline-none font-medium text-neutral-900 placeholder:text-neutral-400"
              />
            </div>
          </div>
          
          <div className="hidden lg:block w-px bg-neutral-200" />
          
          {/* Dates */}
          <div className="flex-1 flex items-center gap-3 px-4 py-3 hover:bg-neutral-50 rounded-lg transition-colors cursor-pointer">
            <Calendar className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <div className="flex-1">
              <div className="text-caption text-neutral-600">When?</div>
              <input 
                type="text" 
                placeholder="Add dates"
                value={dates}
                onChange={(e) => setDates(e.target.value)}
                className="w-full outline-none font-medium text-neutral-900 placeholder:text-neutral-400"
              />
            </div>
          </div>
          
          <div className="hidden lg:block w-px bg-neutral-200" />
          
          {/* Travelers */}
          <div className="flex-1 flex items-center gap-3 px-4 py-3 hover:bg-neutral-50 rounded-lg transition-colors cursor-pointer">
            <Users className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <div className="flex-1">
              <div className="text-caption text-neutral-600">Travelers</div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-neutral-900">{travelers}</span>
                <ChevronDown className="w-4 h-4 text-neutral-400" />
              </div>
            </div>
          </div>
          
          <div className="hidden lg:block w-px bg-neutral-200" />
          
          {/* Halal Level */}
          <div className="flex-1 flex items-center gap-3 px-4 py-3 hover:bg-neutral-50 rounded-lg transition-colors cursor-pointer">
            <div className="w-5 h-5 text-emerald-600 flex-shrink-0 flex items-center justify-center">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C11.5 7 7 11.5 2 12c5 .5 9.5 5 10 10 .5-5 5-9.5 10-10-5-.5-9.5-5-10-10z"/>
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-caption text-neutral-600">Halal Level</div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-neutral-900">{halalLevel}</span>
                <ChevronDown className="w-4 h-4 text-neutral-400" />
              </div>
            </div>
          </div>
          
          {/* Search Button */}
          <Button 
            size="large" 
            className="lg:w-auto w-full h-16 lg:h-auto"
            icon={<Search className="w-5 h-5" />}
          >
            Search halal trips
          </Button>
        </div>
      </div>
    );
  }
  
  // Condensed version
  return (
    <div className="bg-white rounded-lg shadow-card p-2 flex items-center gap-2">
      <input 
        type="text" 
        placeholder="Where to?"
        className="flex-1 px-4 py-2 outline-none"
      />
      <Button size="medium" icon={<Search className="w-4 h-4" />}>
        Search
      </Button>
    </div>
  );
}
