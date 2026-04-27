/**
 * A stacked diagnostic probability chart component.
 */
import React from 'react';

interface ProbabilityChartProps {
    data: { label: string, value: number, color?: string }[]
}

export const ProbabilityChart: React.FC<ProbabilityChartProps> = ({ data }) => {
    return (
        <div className="flex flex-col gap-5">
            {data.map(item => (
                <div className="w-full" key={item.label}>
                    <div className="flex justify-between items-end mb-1">
                        <span className="text-sm font-bold text-main">{item.label}</span>
                        <span className="text-sm font-extrabold" style={{ color: item.color || 'var(--primary)' }}>{item.value}%</span>
                    </div>
                    <div className="w-full bg-background rounded-full h-2.5 shadow-inner">
                        <div className="h-2.5 rounded-full" style={{ width: `${item.value}%`, backgroundColor: item.color || 'var(--primary)' }}></div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ProbabilityChart;
