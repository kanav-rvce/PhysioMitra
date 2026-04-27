import { useState } from 'react';
import { Stethoscope, Search, AlertTriangle, CheckCircle, ChevronRight } from 'lucide-react';
import ProbabilityChart from '../components/charts/ProbabilityChart';

const diagnosisMap: Record<string, { label: string; value: number; color?: string }[]> = {
    default: [
        { label: 'Tension Headache', value: 72, color: 'var(--primary)' },
        { label: 'Mild Dehydration', value: 48, color: '#f59e0b' },
        { label: 'Viral Infection', value: 25, color: 'var(--text-muted)' },
    ],
};

const symptoms = [
    'Headache', 'Fever', 'Fatigue', 'Nausea', 'Chest Pain',
    'Shortness of Breath', 'Dizziness', 'Back Pain', 'Sore Throat', 'Cough',
];

const SymptomChecker = () => {
    const [selected, setSelected] = useState<string[]>([]);
    const [analyzed, setAnalyzed] = useState(false);

    const toggle = (symptom: string) => {
        setSelected(prev =>
            prev.includes(symptom) ? prev.filter(s => s !== symptom) : [...prev, symptom]
        );
        setAnalyzed(false);
    };

    return (
        <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
            <div className="mb-6">
                <h1 className="font-extrabold flex items-center gap-3">
                    <Stethoscope className="text-primary" size={30} /> Symptom Checker
                </h1>
                <p className="text-muted text-sm mt-1 font-medium">Select your current symptoms for an AI-powered analysis.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 card border border-border shadow-sm">
                    <h3 className="font-bold text-main mb-4 flex items-center gap-2">
                        <Search size={18} className="text-primary" /> Select Symptoms
                    </h3>
                    <div className="flex flex-wrap gap-3 mb-6">
                        {symptoms.map(symptom => (
                            <button
                                key={symptom}
                                onClick={() => toggle(symptom)}
                                className={`btn ${selected.includes(symptom) ? 'btn-primary' : 'btn-outline'}`}
                                style={{ fontSize: '0.85rem', padding: '0.45rem 1rem' }}
                            >
                                {selected.includes(symptom) && <CheckCircle size={14} />}
                                {symptom}
                            </button>
                        ))}
                    </div>

                    {selected.length > 0 && (
                        <div className="flex items-center justify-between p-4 bg-background rounded-xl border border-border">
                            <span className="text-sm font-semibold text-muted">
                                {selected.length} symptom{selected.length > 1 ? 's' : ''} selected
                            </span>
                            <button
                                className="btn btn-primary shadow-md"
                                onClick={() => setAnalyzed(true)}
                            >
                                Analyze <ChevronRight size={16} />
                            </button>
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-6">
                    {analyzed ? (
                        <div className="card border border-border shadow-sm">
                            <h3 className="font-bold text-main mb-4 flex items-center gap-2">
                                <AlertTriangle size={18} className="text-primary" /> AI Analysis
                            </h3>
                            <ProbabilityChart data={diagnosisMap.default} />
                        </div>
                    ) : (
                        <div className="card border border-border shadow-sm flex flex-col items-center justify-center text-center" style={{ minHeight: '200px' }}>
                            <Stethoscope size={40} className="text-muted mb-3" />
                            <p className="text-muted font-medium text-sm">Select symptoms and click Analyze to see AI predictions.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SymptomChecker;
