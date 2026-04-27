/**
 * A time-series visualization tracing recovery progress.
 */


export const RecoveryChart = () => (
    <div className="w-full mt-4 bg-background rounded-lg border border-border p-4 relative" style={{ height: '220px' }}>
        <svg viewBox="0 0 400 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
            <path d="M0,80 Q50,85 100,60 T200,45 T300,25 T400,10" fill="none" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" style={{ filter: 'drop-shadow(0 6px 6px rgba(14,165,233,0.3))' }} />
            <path d="M0,80 Q50,85 100,60 T200,45 T300,25 T400,10 L400,100 L0,100 Z" fill="url(#grad)" opacity="0.4" />
            <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                </linearGradient>
            </defs>

            <line x1="0" y1="25" x2="400" y2="25" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="0" y1="50" x2="400" y2="50" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="0" y1="75" x2="400" y2="75" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4" />

            <circle cx="100" cy="60" r="5" fill="white" stroke="var(--primary)" strokeWidth="3" />
            <circle cx="200" cy="45" r="5" fill="white" stroke="var(--primary)" strokeWidth="3" />
            <circle cx="300" cy="25" r="5" fill="white" stroke="var(--primary)" strokeWidth="3" />
            <circle cx="400" cy="10" r="5" fill="white" stroke="var(--secondary)" strokeWidth="3" style={{ filter: 'drop-shadow(0 0 4px var(--secondary))' }} />
        </svg>
        <div className="flex justify-between text-xs text-muted mt-3 uppercase font-semibold">
            <span>Week 1</span>
            <span>Week 2</span>
            <span>Week 3</span>
            <span className="text-secondary font-bold">Current</span>
        </div>
    </div>
);

export default RecoveryChart;
