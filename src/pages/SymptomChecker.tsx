import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Stethoscope, Search, AlertTriangle, CheckCircle, ChevronRight, Info, Activity, X } from 'lucide-react';
import { symptoms, runBayesianDiagnosis, getSelfCareTips } from '../data/symptomData';

interface DiagnosisResult {
  condition: string;
  description: string;
  specialist: string;
  isPhysioRelevant: boolean;
  probability: number;
  color: string;
  rank: number;
  percentageProbability: number;
}

const SymptomChecker = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [analyzed, setAnalyzed] = useState(false);
  const [results, setResults] = useState<DiagnosisResult[]>([]);
  const [tooltip, setTooltip] = useState<{ result: DiagnosisResult; x: number; y: number } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const tooltipRef = useRef<HTMLDivElement>(null);

  const toggle = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
    setAnalyzed(false);
  };

  const analyze = () => {
    const res = runBayesianDiagnosis(selected);
    setResults(res);
    setAnalyzed(true);
  };

  const clearAll = () => {
    setSelected([]);
    setAnalyzed(false);
    setResults([]);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(e.target as Node)) {
        setTooltip(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const physioSymptoms = symptoms.filter(s => s.isPhysioRelated);
  const generalSymptoms = symptoms.filter(s => !s.isPhysioRelated);

  const filteredPhysio = physioSymptoms.filter(s =>
    s.label.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredGeneral = generalSymptoms.filter(s =>
    s.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const hasPhysioResult = results.some(r => r.isPhysioRelevant);

  const selectedSymptomLabels = selected.map(id => symptoms.find(s => s.id === id)!).filter(Boolean);

  const openTooltip = (e: React.MouseEvent<HTMLButtonElement>, result: DiagnosisResult) => {
    e.stopPropagation();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const tooltipHeight = 240;
    const tooltipWidth = 290;
    const spaceBelow = window.innerHeight - rect.bottom;
    const top = spaceBelow > tooltipHeight ? rect.bottom + 8 : rect.top - tooltipHeight - 8;
    const left = Math.min(Math.max(rect.left - tooltipWidth / 2, 8), window.innerWidth - tooltipWidth - 8);
    setTooltip({ result, x: left, y: top });
  };

  return (
    <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
      {/* Floating tooltip portal */}
      {tooltip && createPortal(
        <>
          {/* Invisible backdrop to catch outside clicks */}
          <div
            onClick={() => setTooltip(null)}
            style={{ position: 'fixed', inset: 0, zIndex: 9998 }}
          />
          <div
            ref={tooltipRef}
            style={{
              position: 'fixed',
              top: tooltip.y,
              left: tooltip.x,
              zIndex: 9999,
              width: '290px',
              background: 'var(--card, #fff)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: '14px',
              boxShadow: '0 12px 40px rgba(0,0,0,0.28)',
              isolation: 'isolate',
            }}
          >
          <div className="flex items-start justify-between gap-2 mb-2">
            <span className="font-bold text-main text-sm">{tooltip.result.condition}</span>
            <button onClick={() => setTooltip(null)} style={{ color: 'var(--text-muted)', flexShrink: 0 }}>
              <X size={14} />
            </button>
          </div>
          <p className="text-sm" style={{ color: 'var(--text-muted)', lineHeight: 1.5 }}>{tooltip.result.description}</p>
          <div className="mt-3 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
            <span className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>Recommended Specialist</span>
            <p className="text-sm font-bold text-primary mt-0.5">{tooltip.result.specialist}</p>
          </div>
          {tooltip.result.isPhysioRelevant && (
            <div className="mt-2 flex items-center gap-1.5 px-2 py-1 rounded-lg" style={{ background: 'rgba(16,185,129,0.1)' }}>
              <Activity size={12} style={{ color: '#10b981' }} />
              <span className="text-xs font-semibold" style={{ color: '#10b981' }}>Physiotherapy Recommended</span>
            </div>
          )}
          </div>
        </>,
        document.body
      )}

      <div className="mb-6">
        <h1 className="font-extrabold flex items-center gap-3">
          <Stethoscope className="text-primary" size={30} /> Symptom Checker
        </h1>
        <p className="text-muted text-sm mt-1 font-medium">
          Select your symptoms for a Bayesian AI-powered probability analysis.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Symptom Selection */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {/* Search */}
          <div className="card border border-border shadow-sm" style={{ padding: '12px 16px' }}>
            <div className="flex items-center gap-2">
              <Search size={16} style={{ color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search For Symptoms"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{ background: 'transparent', border: 'none', outline: 'none', width: '100%', fontSize: '0.9rem', color: 'var(--text-main)' }}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} style={{ color: 'var(--text-muted)' }}>
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Physio Symptoms */}
          <div className="card border border-border shadow-sm">
            <h3 className="font-bold text-main mb-1 flex items-center gap-2">
              <Activity size={18} style={{ color: '#10b981' }} />
              Physiotherapy-Related Symptoms
            </h3>
            <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>
              These symptoms may indicate conditions where physiotherapy is the primary treatment.
            </p>
            <div style={{ maxHeight: '280px', overflowY: 'auto', paddingRight: '8px' }}>
              <div className="flex flex-wrap gap-2">
                {filteredPhysio.map(symptom => (
                  <button
                    key={symptom.id}
                    onClick={() => toggle(symptom.id)}
                    className={`btn ${selected.includes(symptom.id) ? 'btn-primary' : 'btn-outline'}`}
                    style={{
                      fontSize: '0.82rem', padding: '0.4rem 0.9rem',
                      borderColor: selected.includes(symptom.id) ? undefined : '#10b981',
                      color: selected.includes(symptom.id) ? undefined : '#10b981',
                    }}
                  >
                    {selected.includes(symptom.id) && <CheckCircle size={13} />}
                    {symptom.label}
                  </button>
                ))}
                {filteredPhysio.length === 0 && <p className="text-sm" style={{ color: 'var(--text-muted)' }}>No matching symptoms.</p>}
              </div>
            </div>
          </div>

          {/* General Symptoms */}
          <div className="card border border-border shadow-sm">
            <h3 className="font-bold text-main mb-3 flex items-center gap-2">
              <Search size={18} className="text-primary" /> General Symptoms
            </h3>
            <div style={{ maxHeight: '280px', overflowY: 'auto', paddingRight: '8px' }}>
              <div className="flex flex-wrap gap-2">
                {filteredGeneral.map(symptom => (
                  <button
                    key={symptom.id}
                    onClick={() => toggle(symptom.id)}
                    className={`btn ${selected.includes(symptom.id) ? 'btn-primary' : 'btn-outline'}`}
                    style={{ fontSize: '0.82rem', padding: '0.4rem 0.9rem' }}
                  >
                    {selected.includes(symptom.id) && <CheckCircle size={13} />}
                    {symptom.label}
                  </button>
                ))}
                {filteredGeneral.length === 0 && <p className="text-sm" style={{ color: 'var(--text-muted)' }}>No matching symptoms.</p>}
              </div>
            </div>
          </div>

          {/* Selected symptoms moved to right column */}
        </div>

        {/* Right: AI Analysis */}
        <div className="flex flex-col gap-4">

          {/* Selected symptoms card — always visible above AI Analysis */}
          <div className="card border border-border shadow-sm" style={{ padding: '14px 16px' }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>
                SELECTED SYMPTOMS {selected.length > 0 && `(${selected.length})`}
              </span>
              {selected.length > 0 && (
                <button onClick={clearAll} className="text-xs" style={{ color: 'var(--primary)', textDecoration: 'underline', fontWeight: 600, padding: '4px 8px', borderRadius: '4px' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(14,165,233,0.1)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  Clear all
                </button>
              )}
            </div>
            {selected.length === 0 ? (
              <p className="text-xs" style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>No symptoms selected yet.</p>
            ) : (
              <>
                <div className="flex flex-wrap gap-2 mb-3">
                  {selectedSymptomLabels.map(s => (
                    <span key={s.id} style={{
                      display: 'inline-flex', alignItems: 'center', gap: '5px',
                      background: s.isPhysioRelated ? 'rgba(16,185,129,0.12)' : 'rgba(99,102,241,0.12)',
                      color: s.isPhysioRelated ? '#10b981' : 'var(--primary)',
                      border: `1px solid ${s.isPhysioRelated ? 'rgba(16,185,129,0.3)' : 'rgba(99,102,241,0.3)'}`,
                      borderRadius: '999px', fontSize: '0.78rem', fontWeight: 600, padding: '3px 10px', cursor: 'default',
                    }}>
                      {s.label}
                      <button onClick={() => toggle(s.id)} style={{ lineHeight: 1, color: 'inherit', opacity: 0.7, marginLeft: '2px' }}>
                        <X size={11} />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex justify-end">
                  <button className="btn btn-primary shadow-md" onClick={analyze}>
                    Analyze <ChevronRight size={16} />
                  </button>
                </div>
              </>
            )}
          </div>
          {analyzed && results.length > 0 ? (
            <>
              {hasPhysioResult && (
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)' }}>
                  <Activity size={16} style={{ color: '#10b981' }} />
                  <p className="text-sm font-semibold" style={{ color: '#10b981' }}>
                    Physiotherapy may help with your symptoms
                  </p>
                </div>
              )}

              <div className="card border border-border shadow-sm">
                <h3 className="font-bold text-main mb-1 flex items-center gap-2">
                  <AlertTriangle size={18} className="text-primary" /> AI Analysis
                </h3>
                <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>
                  Bayesian probability based on selected symptoms. Click <Info size={11} style={{ display: 'inline' }} /> for details.
                </p>

                <div className="flex flex-col gap-4">
                  {results.map(result => (
                    <div key={result.condition}>
                      <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-bold text-main">{result.condition}</span>
                          {result.isPhysioRelevant && (
                            <span style={{ background: 'rgba(16,185,129,0.15)', color: '#10b981', fontSize: '0.65rem', fontWeight: 700, padding: '1px 6px', borderRadius: '999px' }}>
                              PHYSIO
                            </span>
                          )}
                          <button onClick={e => openTooltip(e, result)} style={{ color: 'var(--text-muted)', lineHeight: 1 }} title="More info">
                            <Info size={13} />
                          </button>
                        </div>
                        <span className="text-sm font-extrabold" style={{ color: result.color || 'var(--primary)' }}>
                          {result.percentageProbability}%
                        </span>
                      </div>
                      <div className="w-full rounded-full h-2.5 shadow-inner" style={{ background: 'var(--background)' }}>
                        <div className="h-2.5 rounded-full" style={{ width: `${result.percentageProbability}%`, backgroundColor: result.color || 'var(--primary)', transition: 'width 0.6s ease' }} />
                      </div>
                      <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>See: {result.specialist}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                  <p className="text-xs" style={{ color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    ⚠️ AI-based probability estimate, not a medical diagnosis. Always consult a qualified healthcare professional.
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="card border border-border shadow-sm flex flex-col items-center justify-center text-center" style={{ minHeight: '220px' }}>
              <Stethoscope size={40} className="text-muted mb-3" />
              <p className="text-muted font-medium text-sm">
                Select symptoms and click Analyze to see AI-powered Bayesian predictions.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* While You Wait — self care tips */}
      {analyzed && selected.length > 0 && (() => {
        const careTips = getSelfCareTips(selected);
        if (careTips.length === 0) return null;
        return (
          <div className="mt-6 card border border-border shadow-sm">
            <h3 className="font-bold text-main mb-1 flex items-center gap-2">
              <span style={{ fontSize: '1.1rem' }}>🩺</span> While You Wait to See a Doctor
            </h3>
            <p className="text-xs mb-5" style={{ color: 'var(--text-muted)' }}>
              Based on your selected symptoms, here are evidence-based temporary measures to manage discomfort before your appointment.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {careTips.map(({ symptomLabel, tips }) => (
                <div
                  key={symptomLabel}
                  style={{
                    background: 'var(--background)',
                    borderRadius: '12px',
                    padding: '14px',
                    border: '1px solid var(--border)',
                  }}
                >
                  <p className="text-sm font-bold text-main mb-3">{symptomLabel}</p>
                  <div className="flex flex-col gap-2">
                    {tips.map((t: { icon: string; tip: string }, i: number) => (
                      <div key={i} className="flex items-start gap-2">
                        <span style={{ fontSize: '1rem', flexShrink: 0, lineHeight: 1.4 }}>{t.icon}</span>
                        <p className="text-xs" style={{ color: 'var(--text-muted)', lineHeight: 1.5 }}>{t.tip}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs mt-4 pt-4" style={{ borderTop: '1px solid var(--border)', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              ⚠️ These are temporary self-care measures only. They do not replace professional medical advice. Always consult your doctor or physiotherapist.
            </p>
          </div>
        );
      })()}
    </div>
  );
};

export default SymptomChecker;
