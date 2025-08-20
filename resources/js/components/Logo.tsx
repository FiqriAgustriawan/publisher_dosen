import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'small' | 'medium' | 'large' | 'xl';
  showText?: boolean;
  textClassName?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 'medium', 
  showText = false,
  textClassName = '' 
}) => {
  const sizeClasses = {
    small: 'h-8 w-auto',
    medium: 'h-12 w-auto',
    large: 'h-16 w-auto',
    xl: 'h-24 w-auto'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        src="/images/new-logo.png"
        alt="CAHJ Logo"
        className={`${sizeClasses[size]} object-contain`}
        loading="eager"
        decoding="async"
      />
      {showText && (
        <span className={`font-bold text-green-700 dark:text-green-400 ${textClassName}`}>
          CAHJ
        </span>
      )}
    </div>
  );
};

export default Logo;