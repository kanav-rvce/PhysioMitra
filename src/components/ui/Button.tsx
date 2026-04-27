/**
 * Provides pre-styled interactive generic buttons.
 */
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'outline';
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', className = '', children, ...props }) => {
    const baseClass = "shadow-md transition-all font-bold tracking-wide flex items-center justify-center gap-2 rounded-xl";
    const variants = {
        primary: "bg-primary text-white hover:bg-primary-hover shadow-lg hover:scale-105",
        secondary: "bg-secondary text-white shadow-lg hover:scale-105",
        danger: "bg-danger text-white border-transparent hover:scale-105 shadow-xl",
        outline: "bg-transparent border-2 border-border text-main hover:bg-surface shadow-sm"
    };

    return (
        <button className={`btn ${baseClass} ${variants[variant]} ${className}`} {...props}>
            {children}
        </button>
    );
};

export default Button;
