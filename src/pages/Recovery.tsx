import { TrendingUp, Award, Calendar, CheckCircle } from 'lucide-react';

const Recovery = () => {
    return (
        <div style={{ animation: 'fadeIn 0.5s ease-in-out' }}>
            <div className="mb-6 flex justify-between items-end">
                <div>
                    <h1 className="text-primary">Recovery Tracking</h1>
                    <p className="text-muted text-sm mt-1">Monitor your progress and milestones based on AI feedback.</p>
                </div>
                <div className="flex items-center gap-3 bg-surface border border-border py-2 px-4 rounded-full shadow-sm">
                    <span className="text-sm font-semibold uppercase text-muted tracking-wider">Overall Progress</span>
                    <span className="text-2xl font-bold text-secondary">68%</span>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="card text-white border-none shadow-lg" style={{ backgroundColor: 'var(--primary)', boxShadow: 'var(--shadow-glow)' }}>
                    <h3 className="opacity-90 font-medium mb-1 flex items-center gap-2"><Calendar size={18} /> Consecutive Days</h3>
                    <p className="text-4xl font-extrabold mt-2">14 <span className="text-xl font-normal opacity-80">Days</span></p>
                    <p className="text-sm mt-3 opacity-90 font-medium">You're on a hot streak! Keep it up.</p>
                </div>
                <div className="card shadow-sm border border-border">
                    <h3 className="text-muted text-sm mb-1 font-semibold flex items-center gap-2 uppercase tracking-wide"><TrendingUp size={16} /> Pain Level Reduction</h3>
                    <p className="text-4xl font-extrabold text-main mt-2">-40%</p>
                    <p className="text-sm mt-3 text-secondary font-semibold">Since last week's assessment</p>
                </div>
                <div className="card shadow-sm border border-border">
                    <h3 className="text-muted text-sm mb-1 font-semibold flex items-center gap-2 uppercase tracking-wide"><Award size={16} /> Sessions Completed</h3>
                    <p className="text-4xl font-extrabold text-main mt-2">24 <span className="text-xl font-normal text-muted">/ 30</span></p>
                    <p className="text-sm mt-3 text-primary font-semibold">6 sessions remaining this month</p>
                </div>
            </div>

            <div className="card border border-border shadow-sm">
                <h2 className="mb-6 text-xl font-bold text-main">Upcoming Milestones</h2>
                <div className="flex flex-col gap-0 relative">
                    <div className="absolute left-6 top-4 bottom-4 w-1 bg-border rounded-full" style={{ left: '1.25rem' }}></div>

                    <div className="flex gap-4 relative z-10 p-4 bg-background rounded-lg mb-4 border border-border" style={{ marginLeft: '3rem' }}>
                        <div className="absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center border-4 border-surface shadow-sm" style={{ left: '-2.75rem' }}>
                            <CheckCircle size={20} />
                        </div>
                        <div>
                            <h4 className="font-bold text-main text-lg">Complete Phase 1 Exercises</h4>
                            <p className="text-sm text-muted font-medium mt-1">Achieved on Nov 12, 2023</p>
                        </div>
                    </div>

                    <div className="flex gap-4 relative z-10 p-5 rounded-lg mb-4 border glass-panel shadow-md" style={{ marginLeft: '3rem', backgroundColor: 'rgba(14, 165, 233, 0.05)', borderColor: 'rgba(14, 165, 233, 0.2)' }}>
                        <div className="absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center border-4 border-surface" style={{ left: '-2.75rem', boxShadow: 'var(--shadow-glow)' }}>
                            <TrendingUp size={20} />
                        </div>
                        <div className="w-full">
                            <div className="flex justify-between items-end mb-1">
                                <h4 className="font-bold text-primary text-lg">Regain Full Neck Mobility</h4>
                                <span className="text-sm font-bold text-primary">85%</span>
                            </div>
                            <p className="text-sm text-muted font-medium mb-3">Expected completion in 3 days</p>
                            <div className="w-full bg-background rounded-full h-2.5 shadow-inner">
                                <div className="bg-primary h-2.5 rounded-full" style={{ width: '85%', boxShadow: 'var(--shadow-glow)' }}></div>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 relative z-10 p-4 bg-background rounded-lg border border-border opacity-70" style={{ marginLeft: '3rem' }}>
                        <div className="absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background text-muted flex items-center justify-center border-4 border-surface" style={{ left: '-2.75rem' }}>
                            <Award size={20} />
                        </div>
                        <div>
                            <h4 className="font-bold text-main text-lg">Phase 2: Strength Building</h4>
                            <p className="text-sm text-muted font-medium mt-1">Unlocks automatically after completing Mobility phase</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Recovery;
