import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';

interface DestinationCardProps {
  image: string;
  name: string;
  country: string;
  badge?: 'featured' | 'new';
}

export function DestinationCard({ image, name, country, badge }: DestinationCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer">
      <div className="relative h-[280px] overflow-hidden">
        <ImageWithFallback 
          src={image} 
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        {/* Badge */}
        {badge && (
          <div className="absolute top-4 right-4">
            <Badge type={badge} />
          </div>
        )}
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h4 className="mb-1">{name}</h4>
          <p className="text-caption text-white/90">{country}</p>
        </div>
      </div>
    </div>
  );
}
