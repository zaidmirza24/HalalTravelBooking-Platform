import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Heart } from 'lucide-react';
import { Badge } from './Badge';
import { Button } from './Button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PackageCardProps {
  id?: string | number;
  image: string;
  title: string;
  location: string;
  rating: number;
  reviews: number;
  description: string;
  badges: Array<'halal' | 'no-alcohol' | 'prayer-room' | 'family-friendly' | 'women-only'>;
  price: number;
  priceLabel: string;
  layout?: 'horizontal' | 'vertical';
}

export function PackageCard({
  id,
  image,
  title,
  location,
  rating,
  reviews,
  description,
  badges,
  price,
  priceLabel,
  layout = 'horizontal'
}: PackageCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  if (layout === 'vertical') {
    return (
      <div className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 border border-neutral-200">
        <div className="relative">
          <ImageWithFallback 
            src={image} 
            alt={title}
            className="w-full h-48 object-cover"
          />
          <button 
            onClick={() => setIsWishlisted(!isWishlisted)}
            className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-neutral-600'}`} />
          </button>
        </div>
        
        <div className="p-6 flex flex-col gap-3">
          <div>
            <h3 className="mb-2">{title}</h3>
            <div className="flex items-center gap-2 text-neutral-600 mb-2">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{location}</span>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{rating}</span>
              </div>
              <span className="text-caption text-neutral-500">({reviews} reviews)</span>
            </div>
          </div>
          
          <p className="text-sm text-neutral-600 line-clamp-2">{description}</p>
          
          <div className="flex flex-wrap gap-2">
            {badges.map((badge, i) => (
              <Badge key={i} type={badge} />
            ))}
          </div>
          
          <div className="flex items-end justify-between pt-4 border-t">
            <div>
              <h3 className="text-emerald-600">${price > 0 ? price : 'TBD'}</h3>
              <span className="text-caption text-neutral-500">{priceLabel}</span>
            </div>
            <Link to={`/package/${id || 1}`}>
              <Button variant="secondary" size="small">View Details</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 border border-neutral-200 flex flex-col md:flex-row">
      <div className="relative md:w-60 h-48 md:h-auto flex-shrink-0">
        <ImageWithFallback 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
        <button 
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
        >
          <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-neutral-600'}`} />
        </button>
      </div>
      
      <div className="p-6 flex flex-col gap-3 flex-1">
        <div>
          <h3 className="mb-2">{title}</h3>
          <div className="flex items-center gap-2 text-neutral-600 mb-2">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{location}</span>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{rating}</span>
            </div>
            <span className="text-caption text-neutral-500">({reviews} reviews)</span>
          </div>
        </div>
        
        <p className="text-sm text-neutral-600 line-clamp-2">{description}</p>
        
        <div className="flex flex-wrap gap-2">
          {badges.map((badge, i) => (
            <Badge key={i} type={badge} />
          ))}
        </div>
        
        <div className="flex items-end justify-between pt-4 border-t mt-auto">
          <div>
            <h3 className="text-emerald-600">${price}</h3>
            <span className="text-caption text-neutral-500">{priceLabel}</span>
          </div>
          <Link to={`/package/${id || 1}`}>
            <Button variant="secondary" size="small">View Details</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
