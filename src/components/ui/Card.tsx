/**
 * Standardized soft-shadow container card.
 */
import React from 'react';

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = '', children, ...props }) => {
    return (
        <div className={`bg-surface rounded-2xl shadow-sm border border-border p-5 ${className}`} {...props}>
            {children}
        </div>
    );
};

export default Card;
