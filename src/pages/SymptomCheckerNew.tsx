import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Stethoscope, Search, AlertTriangle, CheckCircle, ChevronRight, Info, Activity, X } from 'lucide-react';
import type { Symptom } from '../data/symptomDataNew';
import { symptoms, runBayesianDiagnosis } from '../data/symptomDataNew';

interface DiagnosisResult {
  label: string;
  value: number;
  color?: string;
  description: string;
  specialist: string;
  isPhysioRelevant: boolean;
}

const SymptomChecker = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [analyzed, setAnalyzed] = useState(false);
  const [results, setResults] = useState<DiagnosisResult[]>([]);
  const [tooltip, setTooltip] = useState<{ result: DiagnosisResult; x: number; y: number } | null>(null);
  const [generalSearch, setGeneralSearch] = useState('');
  const [physioSearch, setPhysioSearch] = useState('');
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

  const selectedSymptomLabels = selected.map(id => symptoms.find(s => s.id === id)!).filter(Boolean);
  const hasPhysioResult = results.some(r => r.isPhysioRelevant);

  const generalSymptoms = symptoms
    .filter((s: Symptom) => !s.isPhysioRelated)
    .filter(s => s.label.toLowerCase().includes(generalSearch.toLowerCase()));

  const physioSymptoms = symptoms
    .filter((s: Symptom) => s.isPhysioRelated)
    .filter(s => s.label.toLowerCase().includes(physioSearch.toLowerCase()));

  const openTooltip = (e: React.MouseEvent<HTMLButtonElement>, result: DiagnosisResult) => {
    e.stopPropagation();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const tooltipWidth = 290;
    const tooltipHeight = 240;
    const spaceBelow = window.innerHeight - rect.bottom;
    const top = spaceBelow > tooltipHeight ? rect.bottom + 8 : rect.top - tooltipHeight - 8;
    const left = Math.min(Math.max(rect.left - tooltipWidth / 2, 8), window.innerWidth - tooltipWidth - 8);
    setTooltip({ result, x: left, y: top });
  };

  const renderBtn = (symptom: Symptom, color: string) => (
    <button
      key={symptom.id}
      onClick={() => toggle(symptom.id)}
      className={`btn ${selected.includes(symptom.id) ? 'btn-primary' : 'btn-outline'}`}
      style={{
        fontSize: '0.78rem',
        padding: '0.3rem 0.75rem',
        borderColor: selected.includes(symptom.id) ? undefined : color,
        color: selected.includes(symptom.id) ? undefined : color,
        flexShrink: 0,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
      }}
    >
      {selected.includes(symptom.id) && <CheckCircle size={11} />}
      {symptom.label}
    </button>
  );

  return (
    <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
      {tooltip && createPortal(
        <>
          <div onClick={() => setTooltip(null)} style={{ position: 'fixed', inset: 0, zIndex: 9998 }} />
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
            }}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className="font-bold text-main text-sm">{tooltip.result.label}</span>
              <button onClick={() => setTooltip(null)} style={{ color: 'var(--text-muted)', flexShrink: 0 }}>
                <X size={14} />
              </button>
            </div>
            <p className="text-sm" style={{ color: 'var(--text-muted)', lineHeight: 1.5 }}>
              {tooltip.result.description}
            </p>
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

      {/* Header */}
      <div className="mb-6">
        <h1 className="font-extrabold flex items-center gap-3">
          <Stethoscope className="text-primary" size={30} /> Symptom Checker
        </h1>
        <p className="text-muted text-sm mt-1 font-medium">
          Select your symptoms for a Bayesian AI-powered probability analysis.
        </p>
      </div>

      {/* Main 3-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Column 1: General Symptoms */}
        <div className="flex flex-col gap-3">
          <div className="card border border-border shadow-sm" style={{ padding: '12px 14px' }}>
            <h3 className="font-bold mb-2" style={{ fontSize: '0.95rem', color: 'var(--primary)' }}>
              ⚕️ General Symptoms
            </h3>
            <div className="flex items-center gap-2">
              <Search size={14} style={{ color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search general..."
                value={generalSearch}
                onChange={e => setGeneralSearch(e.target.value)}
                style={{ background: 'transparent', border: 'none', outline: 'none', width: '100%', fontSize: '0.82rem', color: 'var(--text-main)' }}
              />
              {generalSearch && (
                <button onClick={() => setGeneralSearch('')} style={{ color: 'var(--text-muted)' }}>
                  <X size={12} />
                </button>
              )}
            </div>
          </div>
          <div className="card border border-border shadow-sm" style={{ padding: '12px 14px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px', maxHeight: '520px', overflowY: 'auto', paddingRight: '4px' }}>
              {generalSymptoms.length === 0
                ? <p className="text-muted text-sm">No symptoms match.</p>
                : generalSymptoms.map(s => renderBtn(s, 'var(--primary)'))
              }
            </div>
          </div>
        </div>

        {/* Column 2: Physio Symptoms */}
        <div className="flex flex-col gap-3">
          <div className="card border border-border shadow-sm" style={{ padding: '12px 14px' }}>
            <h3 className="font-bold mb-2" style={{ fontSize: '0.95rem', color: '#10b981' }}>
              🦴 Physio Symptoms
            </h3>
            <div className="flex items-center gap-2">
              <Search size={14} style={{ color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search physio..."
                value={physioSearch}
                onChange={e => setPhysioSearch(e.target.value)}
                style={{ background: 'transparent', border: 'none', outline: 'none', width: '100%', fontSize: '0.82rem', color: 'var(--text-main)' }}
              />
              {physioSearch && (
                <button onClick={() => setPhysioSearch('')} style={{ color: 'var(--text-muted)' }}>
                  <X size={12} />
                </button>
              )}
            </div>
          </div>
          <div className="card border border-border shadow-sm" style={{ padding: '12px 14px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px', maxHeight: '520px', overflowY: 'auto', paddingRight: '4px' }}>
              {physioSymptoms.length === 0
                ? <p className="text-muted text-sm">No symptoms match.</p>
                : physioSymptoms.map(s => renderBtn(s, '#10b981'))
              }
            </div>
          </div>
        </div>

        {/* Column 3: Selected + Analysis */}
        <div className="flex flex-col gap-4">

          {/* Selected chips */}
          {selected.length > 0 && (
            <div className="card border border-border shadow-sm" style={{ padding: '12px 14px' }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>
                  SELECTED ({selected.length})
                </span>
                <button
                  onClick={clearAll}
                  className="text-xs"
                  style={{ color: 'var(--primary)', textDecoration: 'underline', fontWeight: 600 }}
                >
                  Clear all
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {selectedSymptomLabels.map(s => (
                  <span
                    key={s.id}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      background: s.isPhysioRelated ? 'rgba(16,185,129,0.12)' : 'rgba(99,102,241,0.12)',
                      color: s.isPhysioRelated ? '#10b981' : 'var(--primary)',
                      border: `1px solid ${s.isPhysioRelated ? 'rgba(16,185,129,0.3)' : 'rgba(99,102,241,0.3)'}`,
                      borderRadius: '999px',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      padding: '2px 8px',
                    }}
                  >
                    {s.label}
                    <button onClick={() => toggle(s.id)} style={{ lineHeight: 1, color: 'inherit', opacity: 0.7 }}>
                      <X size={10} />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex justify-end">
                <button className="btn btn-primary shadow-md" onClick={analyze}>
                  Analyze <ChevronRight size={15} />
                </button>
              </div>
            </div>
          )}

          {/* AI Analysis */}
          {analyzed && results.length > 0 ? (
            <>
              {hasPhysioResult && (
                <div
                  className="flex items-center gap-2 px-3 py-2 rounded-xl"
                  style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)' }}
                >
                  <Activity size={15} style={{ color: '#10b981' }} />
                  <p className="text-sm font-semibold" style={{ color: '#10b981' }}>
                    Physiotherapy may help
                  </p>
                </div>
              )}
              <div className="card border border-border shadow-sm">
                <h3 className="font-bold text-main mb-1 flex items-center gap-2">
                  <AlertTriangle size={17} className="text-primary" /> AI Analysis
                </h3>
                <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>
                  Bayesian probability. Click <Info size={11} style={{ display: 'inline' }} /> for details.
                </p>
                <div className="flex flex-col gap-4">
                  {results.map(result => (
                    <div key={result.label}>
                      <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-bold text-main">{result.label}</span>
                          {result.isPhysioRelevant && (
                            <span style={{ background: 'rgba(16,185,129,0.15)', color: '#10b981', fontSize: '0.6rem', fontWeight: 700, padding: '1px 5px', borderRadius: '999px' }}>
                              PHYSIO
                            </span>
                          )}
                          <button
                            onClick={e => openTooltip(e, result)}
                            style={{ color: 'var(--text-muted)', lineHeight: 1 }}
                          >
                            <Info size={12} />
                          </button>
                        </div>
                        <span className="text-sm font-extrabold" style={{ color: result.color || 'var(--primary)' }}>
                          {result.value}%
                        </span>
                      </div>
                      <div className="w-full rounded-full h-2 shadow-inner" style={{ background: 'var(--background)' }}>
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${result.value}%`,
                            backgroundColor: result.color || 'var(--primary)',
                            transition: 'width 0.6s ease',
                          }}
                        />
                      </div>
                      <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>See: {result.specialist}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
                  <p className="text-xs" style={{ color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    ⚠️ Not a medical diagnosis. Always consult a qualified healthcare professional.
                  </p>
                </div>
              </div>
            </>
          ) : (
            !selected.length && (
              <div
                className="card border border-border shadow-sm flex flex-col items-center justify-center text-center"
                style={{ minHeight: '200px' }}
              >
                <Stethoscope size={36} className="text-muted mb-3" />
                <p className="text-muted font-medium text-sm">
                  Select symptoms and click Analyze to see AI-powered predictions.
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default SymptomChecker;
