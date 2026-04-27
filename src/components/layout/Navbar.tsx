import { User } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    return (
        <header className="top-navbar glass-panel">
            <div style={{ flex: 1 }} />

            <div className="top-nav-actions">
                <div className="user-profile">
                    <div className="avatar">
                        <User size={20} className="text-primary" />
                    </div>
                    <div className="user-info">
                        <span className="font-semibold text-sm">Alex Johnson</span>
                        <span className="text-xs text-muted">Patient ID: 9482A</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
