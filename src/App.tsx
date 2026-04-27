import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Navbar from './components/layout/Navbar';

// Page Imports
import Dashboard from './pages/Dashboard';
import SymptomChecker from './pages/SymptomChecker';
import Physiotherapy from './pages/Physiotherapy';
import Emergency from './pages/Emergency';
import Recovery from './pages/Recovery';

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
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
