/**
 * Generic contextual alert dialogues spanning warnings, successes and errors.
 */
import React from 'react';
import { AlertTriangle, CheckCircle, ShieldAlert } from 'lucide-react';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
    type?: 'success' | 'warning' | 'error';
    title: string;
    message: string;
}

export const Alert: React.FC<AlertProps> = ({ type = 'warning', title, message, className = '', ...props }) => {
    const config = {
        success: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', icon: CheckCircle, shadow: 'shadow-sm border-l-4 border-l-secondary' },
        warning: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', icon: AlertTriangle, shadow: 'shadow-sm border-l-4 border-l-warning' },
        error: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', icon: ShieldAlert, shadow: 'shadow-md border-l-4 border-l-danger' }
    };

    const current = config[type];
    const Icon = current.icon;

    return (
        <div className={`p-4 rounded-xl flex items-start gap-4 ${current.bg} ${current.border} ${current.shadow} ${className}`} {...props} style={{ animation: 'fadeIn 0.2s' }}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-md bg-white ${current.text}`}>
                <Icon size={16} />
            </div>
            <div>
                <h4 className={`font-extrabold ${current.text}`}>{title}</h4>
                <p className={`text-xs font-semibold mt-1 leading-relaxed opacity-90 ${current.text}`}>{message}</p>
            </div>
        </div>
    );
};

export default Alert;
