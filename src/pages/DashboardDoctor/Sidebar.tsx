import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { HeartPulse, Users, Calendar, Clock, FileText, Settings, LogOut, Menu, X } from 'lucide-react';

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
                <p className="text-xs text-primary-100">{user?.type === 'doctor' ? 'Doctor' : 'Patient'}</p>
              </div>
            </div>
          </div>
          
          <nav className="flex-grow py-4 px-2 overflow-y-auto">
            <ul className="space-y-1">
              <NavItem 
                to="/dashboard/doctor" 
                icon={<Users size={20} />}
                label="Dashboard"
                exact={true}
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