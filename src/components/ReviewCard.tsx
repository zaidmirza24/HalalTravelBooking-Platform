import React, { useState } from 'react';
import { Star, ThumbsUp } from 'lucide-react';

interface ReviewCardProps {
  name: string;
  date: string;
  rating: number;
  text: string;
  helpfulCount: number;
  avatar?: string;
}

export function ReviewCard({ name, date, rating, text, helpfulCount, avatar }: ReviewCardProps) {
  const [isHelpful, setIsHelpful] = useState(false);
  const [count, setCount] = useState(helpfulCount);
  
  const handleHelpful = () => {
    if (isHelpful) {
      setCount(count - 1);
    } else {
      setCount(count + 1);
    }
    setIsHelpful(!isHelpful);
  };
  
  return (
    <div className="bg-neutral-50 rounded-xl p-6">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
          {avatar ? (
            <img src={avatar} alt={name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-emerald-700 font-medium">{name.charAt(0)}</span>
          )}
        </div>
        <div className="flex-1">
          <h4 className="mb-1">{name}</h4>
          <p className="text-caption text-neutral-500">{date}</p>
        </div>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-neutral-300'}`}
            />
          ))}
        </div>
      </div>
      
      <p className="text-neutral-700 mb-4 leading-relaxed">{text}</p>
      
      <button 
        onClick={handleHelpful}
        className={`flex items-center gap-2 text-sm transition-colors ${
          isHelpful ? 'text-emerald-600' : 'text-neutral-600 hover:text-emerald-600'
        }`}
      >
        <ThumbsUp className={`w-4 h-4 ${isHelpful ? 'fill-emerald-600' : ''}`} />
        <span>Helpful ({count})</span>
      </button>
    </div>
  );
}
