import React from 'react';
import { Check, Shield, Headphones } from 'lucide-react';
import { SearchBar } from './SearchBar';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';

export function Hero() {
  return (
    <div className="relative h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <ImageWithFallback 
          src="https://images.unsplash.com/photo-1683135020595-6562acaba9ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNsaW0lMjBmYW1pbHklMjBiZWFjaCUyMHN1bnNldHxlbnwxfHx8fDE3NjQwNjc2MjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Muslim family travel"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />
        {/* Islamic pattern overlay */}
        <div className="absolute inset-0 islamic-pattern opacity-20" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container-custom text-center px-4">
        <div className="max-w-4xl mx-auto mb-8">
          <h1 className="text-white mb-4">Travel the World, Stay Halal</h1>
          <p className="text-body-large text-white/90 mb-8">
            Discover amazing destinations with 100% halal accommodations, prayer facilities, and family-friendly experiences
          </p>
          
          {/* Search Bar */}
          <SearchBar large />
        </div>
        
        {/* USPs */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-12 text-white">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Check className="w-5 h-5" />
            </div>
            <span className="text-sm md:text-base">100% Halal Certified</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <span className="text-sm md:text-base">Safe & Secure Booking</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Headphones className="w-5 h-5" />
            </div>
            <span className="text-sm md:text-base">24/7 Customer Support</span>
          </div>
        </div>
      </div>
    </div>
  );
}
