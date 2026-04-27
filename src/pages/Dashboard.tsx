import { HeartPulse, Activity, BrainCircuit, Droplets, AlertTriangle, PhoneCall, TrendingUp, CheckCircle } from 'lucide-react';
import StatCard from '../components/ui/StatCard';
import RecoveryChart from '../components/charts/RecoveryChart';

const Dashboard = () => {
    return (
        <div style={{ animation: 'fadeIn 0.4s ease-out' }}>

            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-main font-extrabold" style={{ letterSpacing: '-0.5px' }}>Health Overview</h1>
                    <div className="flex items-center gap-2 mt-2">
                        <span className="flex items-center gap-1 text-sm font-semibold px-2 py-1 rounded text-secondary" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)' }}>
                            <CheckCircle size={14} /> Overall Status: Safe
                        </span>
                    </div>
                </div>
                <button className="btn btn-danger shadow-md transition-all uppercase tracking-wide flex items-center justify-center gap-2" style={{ padding: '0.9rem 1.8rem', fontWeight: 'bold' }}>
                    <PhoneCall size={20} /> Emergency SOS
                </button>
            </div>

            <div className="dashboard-grid mb-6">
                <StatCard title="Target Heart Rate" value="74" unit="BPM" icon={HeartPulse} status="safe" />
                <StatCard title="Blood Pressure" value="135/88" unit="mmHg" icon={Activity} status="warning" />
                <StatCard title="Oxygen Saturation" value="98" unit="%" icon={Droplets} status="safe" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="lg:col-span-2 card">
                    <div className="flex justify-between items-center">
                        <h3 className="text-main font-bold flex items-center gap-2">
                            <TrendingUp size={20} className="text-primary" /> Recovery Progress Over Time
                        </h3>
                        <span className="text-xs font-semibold bg-surface px-2 py-1 rounded border border-border text-muted">Last 30 Days</span>
                    </div>
                    <RecoveryChart />
                </div>

                <div className="card shadow-sm" style={{ borderLeft: '4px solid #f59e0b' }}>
                    <h3 className="mb-4 text-main font-bold flex items-center gap-2">
                        <AlertTriangle size={20} style={{ color: '#f59e0b' }} /> Risk Alerts
                    </h3>
                    <div className="flex flex-col gap-3">
                        <div className="p-3 rounded-lg border" style={{ backgroundColor: '#fffbeb', borderColor: '#fcd34d' }}>
                            <h4 className="text-sm font-bold" style={{ color: '#b45309' }}>Elevated Blood Pressure</h4>
                            <p className="text-xs mt-1 font-medium leading-relaxed" style={{ color: '#92400e' }}>Anomaly Detected: Diastolic pressure is slightly above your baseline. Monitor over the next 24 hours.</p>
                        </div>
                        <div className="bg-surface p-3 rounded-lg border border-border">
                            <h4 className="text-sm font-bold text-main">Posture Anomaly</h4>
                            <p className="text-xs mt-1 text-muted font-medium">Mild forward-head posture recurring during afternoon screen time.</p>
                        </div>
                        <div className="bg-surface p-3 rounded-lg border border-border">
                            <h4 className="text-sm font-bold text-main">Decreased Activity</h4>
                            <p className="text-xs mt-1 text-muted font-medium">Steps are down by 15% this week compared to historical data.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="card glass-panel" style={{ borderTop: '4px solid var(--primary)' }}>
                    <h3 className="mb-2 text-main font-bold flex items-center gap-2">
                        <BrainCircuit size={20} className="text-primary" /> AI Diagnosis Probabilities
                    </h3>
                    <p className="text-sm text-muted mb-5 font-medium border-b border-border pb-3">Based on recent symptoms and vitals analysis.</p>

                    <div className="flex flex-col gap-5">
                        <div className="w-full">
                            <div className="flex justify-between items-end mb-1">
                                <span className="text-sm font-bold text-main">Tension Headache</span>
                                <span className="text-sm font-extrabold text-primary">82%</span>
                            </div>
                            <div className="w-full bg-background rounded-full h-2.5 shadow-inner">
                                <div className="bg-primary h-2.5 rounded-full" style={{ width: '82%', boxShadow: 'var(--shadow-glow)' }}></div>
                            </div>
                        </div>

                        <div className="w-full">
                            <div className="flex justify-between items-end mb-1">
                                <span className="text-sm font-bold text-main">Mild Dehydration</span>
                                <span className="text-sm font-bold" style={{ color: '#f59e0b' }}>45%</span>
                            </div>
                            <div className="w-full bg-background rounded-full h-2.5 shadow-inner">
                                <div className="h-2.5 rounded-full" style={{ width: '45%', backgroundColor: '#f59e0b' }}></div>
                            </div>
                        </div>

                        <div className="w-full">
                            <div className="flex justify-between items-end mb-1">
                                <span className="text-sm font-bold text-main">Sinus Infection</span>
                                <span className="text-sm font-bold text-muted">18%</span>
                            </div>
                            <div className="w-full bg-background rounded-full h-2.5 shadow-inner">
                                <div className="bg-border h-2.5 rounded-full" style={{ width: '18%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card shadow-sm border border-border">
                    <h3 className="mb-4 text-main font-bold flex items-center gap-2">
                        <Activity size={20} className="text-secondary" /> Today's Physiotherapy
                    </h3>

                    <div className="flex items-center gap-5 p-4 bg-background border border-border rounded-xl mb-5">
                        <div className="relative w-16 h-16 rounded-full flex items-center justify-center bg-surface shadow-sm" style={{ border: '4px solid var(--border)', borderTopColor: 'var(--secondary)', borderRightColor: 'var(--secondary)' }}>
                            <span className="font-extrabold text-main text-lg">2<span className="text-xs text-muted font-normal">/3</span></span>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg text-main">Daily Routine</h4>
                            <p className="text-sm text-secondary font-bold mt-1">66% Completed <span className="text-muted font-medium ml-1">• 1 remaining</span></p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between p-3 rounded-lg bg-surface border border-border opacity-60">
                            <span className="text-sm font-semibold line-through">Neck Stretches</span>
                            <CheckCircle size={18} className="text-secondary" />
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-surface border border-border opacity-60">
                            <span className="text-sm font-semibold line-through">Shoulder Rolls</span>
                            <CheckCircle size={18} className="text-secondary" />
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg glass-panel border border-primary shadow-sm" style={{ backgroundColor: 'rgba(14, 165, 233, 0.05)' }}>
                            <span className="text-sm font-bold text-primary">Lower Back Extension</span>
                            <button className="btn btn-primary shadow-sm" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>Start</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
