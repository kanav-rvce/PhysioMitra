import { Camera, CheckCircle, AlertTriangle, ScanLine, Activity, Target } from 'lucide-react';
import { usePosture } from '../hooks/usePosture';

const Physiotherapy = () => {
    const { kneeAngle, kneeStatus } = usePosture();

    return (
        <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
            <div className="mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-main font-extrabold flex items-center gap-3">
                        <ScanLine className="text-primary" size={32} /> Real-Time Posture Tracking
                    </h1>
                    <p className="text-muted text-sm mt-2 font-medium">Full-body skeletal analysis running locally on Edge Processing.</p>
                </div>
                <div className="flex items-center gap-3 py-2 px-4 rounded-full border border-border shadow-sm bg-surface">
                    <div className="w-3 h-3 rounded-full bg-danger animate-pulse shadow-[0_0_8px_var(--danger)]"></div>
                    <span className="text-sm font-bold text-danger uppercase tracking-wider">Live Camera Active</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Camera Feed with Skeleton Overlay */}
                <div className="lg:col-span-2 card bg-black p-0 overflow-hidden relative shadow-2xl border-2 border-border" style={{ height: '620px', borderRadius: '1.5rem' }}>

                    {/* Simulated Camera Background Environment */}
                    <div className="absolute inset-0 opacity-50 bg-center bg-cover" style={{ backgroundImage: 'radial-gradient(ellipse at center, #334155 0%, #0f172a 100%)' }}></div>
                    <div className="absolute inset-0 flex justify-center items-center opacity-10 pointer-events-none">
                        <div className="w-[1px] h-full bg-primary absolute"></div>
                        <div className="w-full h-[1px] bg-primary absolute"></div>
                    </div>

                    <div className="absolute top-6 left-6 z-20 flex gap-2">
                        <div className="px-3 py-1.5 rounded-md bg-surface/20 backdrop-blur-md border border-white/10 text-white text-xs font-bold tracking-wider">60 FPS</div>
                        <div className="px-3 py-1.5 rounded-md bg-surface/20 backdrop-blur-md border border-white/10 text-white text-xs font-bold tracking-wider">HD 1080p</div>
                    </div>

                    {/* Skeleton Joints Rendering */}
                    <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-10" style={{ transform: 'scale(1.2)' }}>

                        {/* Spine */}
                        <div className="absolute w-2 h-40 bg-primary/80 rounded-full shadow-[0_0_12px_var(--primary)]" style={{ transform: 'translateY(-20px)' }}></div>

                        {/* Shoulders */}
                        <div className="absolute w-28 h-2 bg-primary/80 rounded-full" style={{ transform: 'translateY(-100px)' }}></div>

                        {/* Head Placeholder */}
                        <div className="absolute w-14 h-16 border-2 border-primary/50 rounded-[40%] bg-white/5 backdrop-blur-sm" style={{ transform: 'translateY(-150px)' }}></div>

                        {/* Shoulder Joints */}
                        <div className="absolute w-5 h-5 bg-white rounded-full border-4 border-primary shadow-lg" style={{ transform: 'translate(-56px, -100px)' }}></div>
                        <div className="absolute w-5 h-5 bg-white rounded-full border-4 border-primary shadow-lg" style={{ transform: 'translate(56px, -100px)' }}></div>

                        {/* Hips */}
                        <div className="absolute w-20 h-2 bg-primary/80 rounded-full" style={{ transform: 'translateY(60px)' }}></div>
                        <div className="absolute w-5 h-5 bg-white rounded-full border-4 border-primary shadow-lg" style={{ transform: 'translate(-40px, 60px)' }}></div>
                        <div className="absolute w-5 h-5 bg-white rounded-full border-4 border-primary shadow-lg" style={{ transform: 'translate(40px, 60px)' }}></div>

                        {/* Right Leg (Animated Component based on State) */}
                        <div className="absolute w-2 bg-primary/80 rounded-full origin-top transition-transform duration-100 ease-linear shadow-[0_0_12px_var(--primary)]" style={{ height: '85px', transform: `translate(40px, 60px) rotate(${kneeAngle - 180}deg)` }}></div>
                        {/* Knee Joint -> Changes color on status */}
                        <div className="absolute w-6 h-6 bg-white rounded-full transition-all duration-100 ease-linear shadow-xl z-20" style={{
                            borderColor: kneeStatus === 'safe' ? 'var(--secondary)' : 'var(--danger)',
                            borderWidth: '4px',
                            transform: `translate(${40 + Math.sin((kneeAngle - 180) * Math.PI / 180) * 85}px, ${60 + Math.cos((kneeAngle - 180) * Math.PI / 180) * 85}px)`,
                            boxShadow: `0 0 20px ${kneeStatus === 'safe' ? 'var(--secondary)' : 'var(--danger)'}`
                        }}></div>
                        {/* Calf below knee (fixed angle relative to knee for mockup) */}
                        <div className="absolute w-2 h-72 bg-primary/80 rounded-full origin-top transition-transform duration-100 ease-linear" style={{
                            transform: `translate(${40 + Math.sin((kneeAngle - 180) * Math.PI / 180) * 85}px, ${60 + Math.cos((kneeAngle - 180) * Math.PI / 180) * 85}px) rotate(10deg)`
                        }}></div>

                        {/* Left Leg (Static Mockup) */}
                        <div className="absolute w-2 h-20 bg-primary/50 rounded-full origin-top" style={{ transform: 'translate(-40px, 60px) rotate(10deg)' }}></div>
                        <div className="absolute w-5 h-5 bg-white/50 rounded-full border-4 border-primary/50" style={{ transform: 'translate(-25px, 140px)' }}></div>
                    </div>

                    {/* Floating Angle Display UI */}
                    <div className="absolute transition-all duration-100 ease-linear flex flex-col items-start z-30" style={{
                        top: '50%', left: '50%',
                        transform: `translate(${70 + Math.sin((kneeAngle - 180) * Math.PI / 180) * 102}px, ${60 + Math.cos((kneeAngle - 180) * Math.PI / 180) * 102}px)`
                    }}>
                        <div className="w-12 h-[2px] bg-white opacity-40 mb-2 origin-left transform -rotate-12"></div>
                        <div className={`px-4 py-2 rounded-xl bg-surface backdrop-blur-xl border border-border text-sm font-black whitespace-nowrap shadow-2xl flex flex-col gap-1 transition-colors ${kneeStatus === 'safe' ? 'border-l-4 border-l-secondary text-secondary' : 'border-l-4 border-l-danger text-danger'}`}>
                            <span>Knee Bend: {kneeAngle.toFixed(1)}°</span>
                            <span className="text-[10px] text-muted uppercase font-bold tracking-wider">Target: 155°-165°</span>
                        </div>
                    </div>

                    {/* Futuristic Frame Borders */}
                    <div className="absolute inset-4 border border-white/5 rounded-2xl pointer-events-none">
                        <div className="absolute -top-1 -left-1 w-12 h-12 border-t-4 border-l-4 border-primary rounded-tl-lg shadow-[0_0_15px_var(--primary)]"></div>
                        <div className="absolute -top-1 -right-1 w-12 h-12 border-t-4 border-r-4 border-primary rounded-tr-lg shadow-[0_0_15px_var(--primary)]"></div>
                        <div className="absolute -bottom-1 -left-1 w-12 h-12 border-b-4 border-l-4 border-primary rounded-bl-lg"></div>
                        <div className="absolute -bottom-1 -right-1 w-12 h-12 border-b-4 border-r-4 border-primary rounded-br-lg"></div>
                    </div>

                </div>

                {/* Info & Feedback Panel */}
                <div className="flex flex-col gap-6" style={{ height: '620px' }}>

                    {/* Tracker Card */}
                    <div className="card shadow-md border border-border flex flex-col gap-5">
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-muted flex items-center gap-2 mb-2"><Activity size={16} className="text-secondary" /> Exercise Monitor</h3>
                            <div className="flex justify-between items-end">
                                <span className="font-extrabold text-main text-2xl">Squat Therapy</span>
                                <span className="text-xs bg-primary text-white px-2 py-1 rounded font-bold uppercase">Set 2/3</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-background border border-border p-4 rounded-xl flex items-center gap-4 shadow-inner">
                                <div className="relative w-12 h-12 rounded-full flex items-center justify-center font-black text-main bg-surface shadow-sm" style={{ border: '3px solid var(--border)', borderTopColor: 'var(--primary)', borderRightColor: 'var(--primary)', transform: 'rotate(45deg)' }}>
                                    <span style={{ transform: 'rotate(-45deg)' }} className="text-lg">8</span>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-muted uppercase tracking-wider">Repetitions</p>
                                    <p className="text-lg font-black text-main">8 <span className="text-sm font-semibold text-muted">/ 12</span></p>
                                </div>
                            </div>
                            <div className="bg-background border border-border p-4 rounded-xl flex items-center gap-4 shadow-inner">
                                <div className="w-12 h-12 rounded-full bg-green-50 text-secondary flex items-center justify-center shadow-sm" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)' }}>
                                    <Target size={24} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-muted uppercase tracking-wider">Accuracy</p>
                                    <p className="text-lg font-black text-secondary">94%</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Live Feedback Feed */}
                    <div className="card shadow-md border border-border flex-1 flex flex-col p-5">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-muted flex items-center gap-2 mb-6"><AlertTriangle size={16} /> Instant AI Feedback</h3>

                        <div className="flex-1 flex flex-col gap-4 overflow-y-auto pr-2" style={{ maxHeight: '200px' }}>
                            {kneeStatus === 'critical' ? (
                                <div className="bg-red-50 border border-red-200 p-4 rounded-xl flex items-start gap-4 shadow-sm" style={{ backgroundColor: '#fef2f2', borderColor: '#fecaca', animation: 'fadeIn 0.2s', borderLeft: '4px solid var(--danger)' }}>
                                    <div className="w-8 h-8 rounded-full bg-danger text-white flex items-center justify-center shrink-0 shadow-md">
                                        <AlertTriangle size={16} />
                                    </div>
                                    <div>
                                        <h4 className="font-extrabold text-main" style={{ color: '#991b1b' }}>Increase Knee Extension</h4>
                                        <p className="text-xs font-semibold mt-1 leading-relaxed text-muted" style={{ color: '#7f1d1d' }}>You are bending too deep into the squat. Push up slightly to return to the 155°-165° safe target zone to prevent stress on cartilage.</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-green-50 border border-green-200 p-4 rounded-xl flex items-start gap-4 shadow-sm" style={{ backgroundColor: '#f0fdf4', borderColor: '#bbf7d0', animation: 'fadeIn 0.2s', borderLeft: '4px solid var(--secondary)' }}>
                                    <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center shrink-0 shadow-md">
                                        <CheckCircle size={16} />
                                    </div>
                                    <div>
                                        <h4 className="font-extrabold text-main" style={{ color: '#166534' }}>Perfect Form</h4>
                                        <p className="text-xs font-semibold mt-1 leading-relaxed text-muted" style={{ color: '#14532d' }}>Your knee angle is optimal. Hold this exact posture and squeeze your glutes on the upward motion.</p>
                                    </div>
                                </div>
                            )}

                            <div className="bg-surface border border-border p-4 rounded-xl flex items-start gap-4 opacity-50 transition-opacity hover:opacity-100">
                                <div className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center shrink-0 text-muted shadow-sm">
                                    <CheckCircle size={16} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-main">Posture Stabilized</h4>
                                    <p className="text-[11px] font-semibold mt-1 text-muted">Spinal alignment maintained within 5° variance over the last 10 seconds.</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 pt-5 border-t border-border flex gap-4">
                            <button className="btn btn-outline flex-1 border-border shadow-sm text-main font-bold py-3.5 hover:bg-background rounded-xl"><Camera size={18} /> Calibrate</button>
                            <button className="btn btn-primary flex-1 shadow-lg font-bold py-3.5 text-white rounded-xl hover:scale-105 transition-all">End Session</button>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default Physiotherapy;
