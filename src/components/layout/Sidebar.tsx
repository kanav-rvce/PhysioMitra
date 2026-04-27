import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Stethoscope, Activity, AlertTriangle, TrendingUp, BrainCircuit, Users } from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard, disabled: true },
    { name: 'Symptom Checker', path: '/symptoms', icon: Stethoscope },
    { name: 'Physiotherapy AI', path: '/physio', icon: Activity },
    { name: 'Emergency SOS', path: '/emergency', icon: AlertTriangle, danger: true },
    { name: 'Recovery Tracking', path: '/recovery', icon: TrendingUp, disabled: true },
    { name: 'About Us', path: '/about', icon: Users },
  ];

  return (
    <aside className="sidebar glass-panel">
      <div className="sidebar-header">
        <h2 className="brand-logo flex items-center gap-2">
          <BrainCircuit size={30} className="text-primary" />
          <span>Physio<span className="text-primary">Mitra</span></span>
        </h2>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          if (item.disabled) {
            return (
              <div
                key={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  color: 'var(--text-muted)',
                  opacity: 0.5,
                  cursor: 'not-allowed',
                  background: 'rgba(0,0,0,0.02)',
                }}
                title="Coming soon"
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </div>
            );
          }
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `nav-item ${isActive ? 'active' : ''} ${item.danger ? 'danger-item' : ''}`
              }
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="ai-widget card">
          <div className="widget-header flex items-center gap-2 mb-2">
            <div className="ai-dot"></div>
            <p className="text-sm font-semibold">AI Assistant</p>
          </div>
          <p className="text-xs text-muted mb-2">Your health is monitored and safe.</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
