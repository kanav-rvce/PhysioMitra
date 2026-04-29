/**
 * RecenterButton - A floating button that recenters the map to user location
 * Validates Requirements 1.1, 1.3
 */
import React from 'react';
import './RecenterButton.css';

interface RecenterButtonProps {
  onRecenter: () => void;
  isCentered: boolean;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

export const RecenterButton: React.FC<RecenterButtonProps> = ({
  onRecenter,
  isCentered,
  position = 'top-right',
}) => {
  const positionStyles = {
    'top-right': { top: '10px', right: '10px' },
    'top-left': { top: '10px', left: '10px' },
    'bottom-right': { bottom: '10px', right: '10px' },
    'bottom-left': { bottom: '10px', left: '10px' },
  };

  return (
    <button
      onClick={onRecenter}
      className="recenter-button"
      style={positionStyles[position]}
      aria-label={isCentered ? 'Map centered on your location' : 'Recenter map to your location'}
      title={isCentered ? 'Centered' : 'Recenter to your location'}
      data-centered={isCentered}
    >
      {isCentered ? (
        // Filled crosshair icon when centered
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v4m0 12v4M2 12h4m12 0h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ) : (
        // Outlined crosshair icon when not centered
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v4m0 12v4M2 12h4m12 0h4" strokeLinecap="round" />
        </svg>
      )}
    </button>
  );
};

export default RecenterButton;
