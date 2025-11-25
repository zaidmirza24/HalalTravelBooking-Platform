import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export function Button({ 
  variant = 'primary', 
  size = 'medium', 
  children, 
  icon,
  className = '',
  ...props 
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 shadow-button disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-md hover:scale-[1.02]',
    secondary: 'bg-white text-emerald-600 border-2 border-emerald-600 hover:bg-emerald-50',
    ghost: 'bg-transparent text-emerald-600 hover:bg-emerald-50'
  };
  
  const sizeClasses = {
    small: 'h-9 px-4 text-sm',
    medium: 'h-11 px-6 text-base',
    large: 'h-[52px] px-8 text-lg'
  };
  
  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
