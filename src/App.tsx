import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Navbar from './components/layout/Navbar';

// Page Imports
import Dashboard from './pages/Dashboard';
import SymptomChecker from './pages/SymptomChecker';
import Physiotherapy from './pages/Physiotherapy';
import Emergency from './pages/Emergency';
import Recovery from './pages/Recovery';
import AboutUs from './pages/AboutUs';

import './styles/index.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Navbar />
          <main className="page-content bg-background">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/symptoms" element={<SymptomChecker />} />
              <Route path="/physiotherapy" element={<Physiotherapy />} />
              <Route path="/emergency" element={<Emergency />} />
              <Route path="/recovery" element={<Recovery />} />
              <Route path="/about" element={<AboutUs />} />
            </Routes>
          </main>
          <footer style={{
            flexShrink: 0,
            padding: '0.75rem 2rem',
            borderTop: '1px solid var(--border)',
            textAlign: 'center',
            background: 'var(--surface)',
          }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              © 2026 PhysioMitra. All rights reserved.
            </p>
          </footer>
        </div>
      </div>
    </Router>
  );
}

export default App;
