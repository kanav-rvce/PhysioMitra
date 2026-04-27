import { useState } from 'react';
import { Users, GraduationCap, Brain, Activity, Shield, Cpu, HeartPulse, Code2 } from 'lucide-react';

const team = [
  {
    name: 'Kanav Bansal',
    degree: "RVCE '28 CSE",
    avatar: 'KB',
    photo: '/kanav.jpg',
    color: '#0EA5E9',
    roleIcon: Brain,
  },
  {
    name: 'Aarav Jagga',
    degree: "RVCE '28 CI",
    avatar: 'AJ',
    photo: '/aarav.jpg',
    color: '#10B981',
    roleIcon: Cpu,
  },
  {
    name: 'Pratham',
    degree: "RVCE '28 CY",
    avatar: 'PR',
    photo: '/pratham.jpg',
    color: '#8B5CF6',
    roleIcon: Shield,
  },
];

const missionPoints = [
  {
    icon: HeartPulse,
    color: '#0EA5E9',
    title: 'AI-Powered Care',
    desc: 'AI-Driven Clinical Decision Support. Implements probabilistic modeling (Bayesian inference) and structured symptom analysis to approximate clinical reasoning workflows. The system processes multi-parameter inputs to generate condition likelihoods and actionable recommendations, improving early-stage diagnosis support.',
  },
  {
    icon: Activity,
    color: '#10B981',
    title: 'Physiotherapy First',
    desc: 'Rehabilitation-Centric System Design. Built with a physiotherapy-first approach, leveraging real-time pose estimation and biomechanical analysis to guide users through corrective exercises. Focuses on preventive care and recovery optimization through posture validation, movement tracking, and adaptive feedback mechanisms.',
  },
  {
    icon: Code2,
    color: '#8B5CF6',
    title: 'Scalable Digital Health Platform',
    desc: 'Engineered for Scalable Healthcare Innovation. Developed as a scalable healthcare technology solution by engineering researchers, with a focus on integrating AI, computer vision, and distributed system design. The platform aims to evolve into a robust digital health infrastructure supporting intelligent rehabilitation and emergency response systems.',
  },
];

const AboutUs = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-extrabold flex items-center gap-3">
          <Users className="text-primary" size={30} /> About Us
        </h1>
        <p className="text-muted text-sm mt-1 font-medium">
          Meet the team behind PhysioMitra
        </p>
      </div>

      {/* Mission Banner */}
      <div
        style={{
          borderRadius: '20px',
          padding: '2.5rem',
          marginBottom: '2rem',
          background: 'linear-gradient(135deg, #0EA5E910 0%, #10B98110 50%, #8B5CF610 100%)',
          border: '1px solid rgba(14,165,233,0.2)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative blobs */}
        <div style={{
          position: 'absolute', top: '-40px', right: '-40px',
          width: '180px', height: '180px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(14,165,233,0.12), transparent)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '-30px', left: '30%',
          width: '140px', height: '140px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16,185,129,0.1), transparent)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative' }}>
          <p style={{
            fontSize: '0.7rem', fontWeight: 800, letterSpacing: '2px',
            color: 'var(--primary)', textTransform: 'uppercase', marginBottom: '8px',
          }}>
            Our Mission
          </p>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '12px', lineHeight: 1.3 }}>
            Transforming Healthcare Guidance through<br />
            <span style={{ color: 'var(--primary)' }}>Intelligent & Accessible Systems</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '0.95rem', marginBottom: '2rem' }}>
            PhysioMitra is an AI-driven digital healthcare platform designed to bridge the gap between patients and physiotherapy-driven care. 
            The system integrates probabilistic reasoning models, real-time computer vision–based posture analysis, and intelligent decision-support systems 
            to deliver personalized and scalable healthcare guidance. By combining Bayesian inference, AI-assisted rehabilitation protocols, and real-time monitoring, 
            PhysioMitra enables users to access clinically inspired physiotherapy support directly through a web-based interface — ensuring accessibility, efficiency, and early-stage intervention.
          </p>

          {/* Mission pillars - 3 column grid, full width */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {missionPoints.map(point => {
              const Icon = point.icon;
              return (
                <div
                  key={point.title}
                  style={{
                    background: 'var(--surface)',
                    borderRadius: '14px',
                    padding: '2.5rem',
                    border: `1px solid ${point.color}25`,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    height: '100%',
                    minHeight: '320px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                    <div style={{
                      width: '56px', height: '56px', borderRadius: '12px',
                      background: `${point.color}15`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <Icon size={32} style={{ color: point.color }} />
                    </div>
                    <p style={{ fontWeight: 700, fontSize: '1.2rem', color: 'var(--text-main)', lineHeight: 1.3 }}>{point.title}</p>
                  </div>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>{point.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Team cards — horizontal side-by-side layout with larger images */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
          {team.map(member => {
            const isHovered = hovered === member.name;
            return (
              <div
                key={member.name}
                onMouseEnter={() => setHovered(member.name)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: isHovered
                    ? `linear-gradient(160deg, ${member.color}12, ${member.color}06)`
                    : 'var(--surface)',
                  border: `1.5px solid ${isHovered ? member.color + '55' : 'var(--border)'}`,
                  borderRadius: '16px',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1rem',
                  cursor: 'default',
                  transition: 'all 0.3s ease',
                  transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                  boxShadow: isHovered
                    ? `0 12px 32px ${member.color}18`
                    : '0 1px 4px rgba(0,0,0,0.06)',
                  textAlign: 'center',
                }}
              >
                {/* Square bordered image - no stretch */}
                <div style={{
                  width: '160px',
                  height: '160px',
                  borderRadius: '12px',
                  border: `2px solid ${member.color}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  background: `linear-gradient(135deg, ${member.color}15, ${member.color}08)`,
                  transition: 'all 0.3s ease',
                  boxShadow: isHovered ? `0 0 0 4px ${member.color}15` : 'none',
                  flexShrink: 0,
                }}>
                  {member.photo
                    ? <img src={member.photo} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
                    : <div style={{
                      fontSize: '3rem',
                      fontWeight: 800,
                      color: member.color,
                    }}>
                      {member.avatar}
                    </div>
                  }
                </div>

                {/* Content */}
                <div style={{ width: '100%' }}>
                  {/* Name */}
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '4px' }}>
                    {member.name}
                  </h3>

                  {/* Degree */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                    fontSize: '0.8rem',
                    color: 'var(--text-muted)',
                  }}>
                    <GraduationCap size={13} style={{ color: member.color }} />
                    {member.degree}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
