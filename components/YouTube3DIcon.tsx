import React from 'react';

type YouTube3DIconProps = {
  size?: 'small' | 'medium' | 'large';
};

const YouTube3DIcon = ({ size = 'medium' }: YouTube3DIconProps) => {
  const sizeClasses = {
    small: 'scale-50',
    medium: 'scale-75',
    large: 'scale-100',
  };

  return (
    <div className={`icon-wrapper relative ${sizeClasses[size]}`}>
      <div className="air-effect absolute w-[180px] h-[130px] rounded-full bg-gradient-radial from-red-200/15 to-transparent animate-airSpin filter blur-[10px] z-0"></div>
      <div className="yt-icon w-[150px] h-[100px] bg-gradient-to-br from-red-500 to-red-700 rounded-[20px] relative transform-gpu animate-headTilt shadow-lg z-1" style={{
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4), inset -6px -6px 10px rgba(0, 0, 0, 0.2), inset 6px 6px 10px rgba(255, 255, 255, 0.1)',
        transformStyle: 'preserve-3d'
      }}>
        <svg className="eyebrow left absolute w-5 h-5 left-[28%] top-[14%] animate-browBlink" viewBox="0 0 20 20">
          <path d="M0,15 Q10,5 20,15" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <svg className="eyebrow right absolute w-5 h-5 right-[28%] top-[14%] transform scale-x-[-1] animate-browBlink" viewBox="0 0 20 20">
          <path d="M0,15 Q10,5 20,15" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <div className="eye left absolute w-[15px] h-[15px] bg-gradient-radial from-white to-gray-300 rounded-full top-[30%] left-[30%] animate-blink shadow-inner" style={{
          boxShadow: 'inset 0 0 3px rgba(0, 0, 0, 0.5)'
        }}></div>
        <div className="eye right absolute w-[15px] h-[15px] bg-gradient-radial from-white to-gray-300 rounded-full top-[30%] right-[30%] animate-blink shadow-inner" style={{
          boxShadow: 'inset 0 0 3px rgba(0, 0, 0, 0.5)'
        }}></div>
        <div className="mouth absolute w-[40px] h-[20px] bg-white rounded-b-[40px] bottom-[20%] left-[50%] transform -translate-x-1/2 shadow-md" style={{
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
        }}></div>
      </div>
    </div>
  );
};

export default YouTube3DIcon; 