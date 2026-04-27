/**
 * A standard analytical summary card.
 */


interface StatCardProps {
  title: string;
  value: string | number;
  unit: string;
  icon: React.ComponentType<{ size: number; style?: React.CSSProperties }>;
  status: 'safe' | 'warning' | 'critical';
}

export const StatCard = ({ title, value, unit, icon: Icon, status }: StatCardProps) => {

    const statusBg: Record<'safe' | 'warning' | 'critical', string> = {
        safe: 'var(--background)',
        warning: '#fef3c7',
        critical: '#fee2e2'
    };

    return (
        <div className="card glass-panel flex flex-col gap-3">
            <div className="flex items-center justify-between">
                <div className={`p-2 rounded-full`} style={{ backgroundColor: statusBg[status] }}>
                    <Icon size={24} style={{ color: status === 'safe' ? 'var(--secondary)' : status === 'critical' ? 'var(--danger)' : '#f59e0b' }} />
                </div>
                <div className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider`} style={{ backgroundColor: statusBg[status], color: status === 'safe' ? 'var(--secondary)' : status === 'critical' ? 'var(--danger)' : '#f59e0b' }}>
                    {status}
                </div>
            </div>
            <div className="mt-2">
                <h3 className="text-muted text-sm uppercase tracking-wide">{title}</h3>
                <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl font-extrabold">{value}</span>
                    <span className="text-sm font-semibold text-muted">{unit}</span>
                </div>
            </div>
        </div>
    );
};

export default StatCard;
