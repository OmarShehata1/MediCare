import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { HeartPulse, User, Calendar, FileText, Settings, LogOut, Menu, X, Home } from 'lucide-react';

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <>
      {/* Mobile header */}
      <div className="bg-primary-700 text-white fixed top-0 left-0 right-0 z-10 md:hidden">
        <div className="flex items-center justify-between px-4 py-2">
          <Link to="/" className="flex items-center">
            <HeartPulse size={24} className="text-white" />
            <span className="ml-2 font-bold">MediCare</span>
          </Link>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 focus:outline-none"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Sidebar */}
      <aside 
        className={`
          bg-primary-700 text-white w-64 fixed inset-y-0 left-0 transform transition-transform duration-300 ease-in-out z-20
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static md:h-screen
        `}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-primary-600">
            <Link to="/" className="flex items-center">
              <HeartPulse size={28} className="text-white" />
              <span className="ml-2 text-xl font-bold text-white">MediCare</span>
            </Link>
          </div>
          
          <div className="p-4 border-b border-primary-600">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-primary-800 overflow-hidden">
                {user?.image ? (
                  <img 
                    src={user.image} 
                    alt="Profile" 
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {user?.name?.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              <div className="ml-3">
                <p className="font-medium">{user?.name}</p>
                <p className="text-xs text-primary-100">{user?.type === 'patient' ? 'Patient' : 'Doctor'}</p>
              </div>
            </div>
          </div>
          
          <nav className="flex-grow py-4 px-2 overflow-y-auto">
            <ul className="space-y-1">
              <NavItem 
                to="/dashboard/client" 
                icon={<Home size={20} />}
                label="Dashboard"
                exact={true}
              />
              <NavItem 
                to="/booking" 
                icon={<Calendar size={20} />}
                label="Book Appointment"
              />
              <NavItem 
                to="/dashboard/client/profile" 
                icon={<User size={20} />}
                label="My Profile"
              />
              <NavItem 
                to="/dashboard/client/history" 
                icon={<FileText size={20} />}
                label="Medical History"
              />
              <NavItem 
                to="/dashboard/client/doctors" 
                icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"/>
                  <path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2"/>
                  <path d="M14 4h-4l-1 5h6Z"/>
                </svg>}
                label="Find Doctors"
              />
              <NavItem 
                to="/dashboard/client/settings" 
                icon={<Settings size={20} />}
                label="Settings"
              />
            </ul>
          </nav>
          
          <div className="p-4 border-t border-primary-600">
            <button
              onClick={handleLogout}
              className="flex items-center text-primary-100 hover:text-white transition-colors"
            >
              <LogOut size={20} className="mr-2" />
              Sign out
            </button>
          </div>
        </div>
      </aside>
      
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  exact?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, exact }) => {
  const isActive = window.location.pathname === to || 
    (!exact && window.location.pathname.startsWith(to));
  
  return (
    <li>
      <Link
        to={to}
        className={`
          flex items-center px-4 py-2 rounded-md transition-colors
          ${isActive 
            ? 'bg-primary-600 text-white' 
            : 'text-primary-100 hover:bg-primary-600 hover:text-white'}
        `}
      >
        <span className="mr-3">{icon}</span>
        {label}
      </Link>
    </li>
  );
};

export default Sidebar;