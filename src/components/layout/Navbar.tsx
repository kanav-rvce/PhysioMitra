import { Bell, User, Search } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    return (
        <header className="top-navbar glass-panel">
            <div className="search-container">
                <Search className="search-icon text-muted" size={18} />
                <input type="text" placeholder="Search for symptoms, records..." className="search-input" />
            </div>

            <div className="top-nav-actions">
                <button className="btn btn-outline nav-btn">
                    <Bell size={20} />
                    <span className="badge">2</span>
                </button>
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
