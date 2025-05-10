// import React, { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { Menu, X, User, LogOut, HeartPulse } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';

// const Navbar: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const { isAuthenticated, user, logout } = useAuth();
//   const location = useLocation();

//   // Handle scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 10) {
//         setIsScrolled(true);
//       } else {
//         setIsScrolled(false);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   // Close mobile menu when route changes
//   useEffect(() => {
//     setIsOpen(false);
//   }, [location]);

//   // Determine dashboard link based on user type
//   const getDashboardLink = () => {
//     if (!user) return '/login';
//     return user.type === 'doctor' ? '/dashboard/doctor' : '/dashboard/client';
//   };

//   return (
//     <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//       isScrolled || isOpen ? 'bg-white shadow-md' : 'bg-transparent'
//     }`}>
//       <div className="container-custom">
//         <div className="flex justify-between items-center py-4">
//           {/* Logo */}
//           <Link to="/" className="flex items-center space-x-2">
//             <HeartPulse size={28} className="text-primary-600" />
//             <span className="text-xl font-bold text-primary-600">MediCare</span>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-8">
//             <Link to="/" className="text-gray-700 hover:text-primary-600 font-medium">Home</Link>
//             <Link to="/booking" className="text-gray-700 hover:text-primary-600 font-medium">Book Appointment</Link>

//             {isAuthenticated ? (
//               <div className="flex items-center space-x-4">
//                 <Link to={getDashboardLink()} className="text-gray-700 hover:text-primary-600 font-medium">
//                   Dashboard
//                 </Link>
//                 <div className="flex items-center space-x-2 relative group">
//                   <div className="flex items-center space-x-2 cursor-pointer">
//                     <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden">
//                       {user?.image ? (
//                         <img src={user.image} alt="Profile" className="h-full w-full object-cover" />
//                       ) : (
//                         <User className="h-full w-full p-1 text-gray-600" />
//                       )}
//                     </div>
//                     <span className="text-sm font-medium text-gray-700">{user?.name}</span>
//                   </div>

//                   {/* Dropdown */}
//                   <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
//                     <Link to={getDashboardLink()} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//                       Profile
//                     </Link>
//                     <button
//                       onClick={logout}
//                       className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                     >
//                       Sign out
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <div className="flex items-center space-x-4">
//                 <Link to="/login" className="btn-secondary">Log in</Link>
//                 <Link to="/register" className="btn-primary">Sign up</Link>
//               </div>
//             )}
//           </div>

//           {/* Mobile menu button */}
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="md:hidden text-gray-700 focus:outline-none"
//           >
//             {isOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>

//         {/* Mobile Navigation */}
//         {isOpen && (
//           <div className="md:hidden bg-white">
//             <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
//               <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">
//                 Home
//               </Link>
//               <Link to="/booking" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">
//                 Book Appointment
//               </Link>

//               {isAuthenticated ? (
//                 <>
//                   <Link to={getDashboardLink()} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">
//                     Dashboard
//                   </Link>
//                   <button
//                     onClick={logout}
//                     className="w-full text-left flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
//                   >
//                     <LogOut size={16} className="mr-2" />
//                     Sign out
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">
//                     Log in
//                   </Link>
//                   <Link to="/register" className="block px-3 py-2 bg-primary-600 text-white rounded-md text-base font-medium">
//                     Sign up
//                   </Link>
//                 </>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User, LogOut, HeartPulse } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Determine dashboard link based on user type
  const getDashboardLink = () => {
    if (!user) return "/login";
    return user.type === "doctor" ? "/dashboard/doctor" : "/dashboard/client";
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isOpen ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <HeartPulse
              size={28}
              className={
                isScrolled || isOpen ? "text-primary-600" : "text-white"
              }
            />
            <span
              className={`text-xl font-bold ${
                isScrolled || isOpen ? "text-primary-600" : "text-white"
              }`}
            >
              MediCare
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`font-medium ${
                isScrolled || isOpen
                  ? "text-gray-700 hover:text-primary-600"
                  : "text-white hover:text-gray-200"
              }`}
            >
              Home
            </Link>
            <Link
              to="/booking"
              className={`font-medium ${
                isScrolled || isOpen
                  ? "text-gray-700 hover:text-primary-600"
                  : "text-white hover:text-gray-200"
              }`}
            >
              Book Appointment
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link
                  to={getDashboardLink()}
                  className={`font-medium ${
                    isScrolled || isOpen
                      ? "text-gray-700 hover:text-primary-600"
                      : "text-white hover:text-gray-200"
                  }`}
                >
                  Dashboard
                </Link>
                <div className="flex items-center space-x-2 relative group">
                  <div className="flex items-center space-x-2 cursor-pointer">
                    <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden">
                      {user?.image ? (
                        <img
                          src={user.image}
                          alt="Profile"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <User className="h-full w-full p-1 text-gray-600" />
                      )}
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        isScrolled || isOpen ? "text-gray-700" : "text-white"
                      }`}
                    >
                      {user?.name}
                    </span>
                  </div>

                  {/* Dropdown */}
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <Link
                      to={getDashboardLink()}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className={
                    isScrolled || isOpen
                      ? "btn-secondary"
                      : "text-white hover:text-gray-200"
                  }
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className={
                    isScrolled || isOpen
                      ? "btn-primary"
                      : "bg-white text-teal-700 hover:bg-gray-100 px-4 py-2 rounded-md"
                  }
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden focus:outline-none ${
              isScrolled || isOpen ? "text-gray-700" : "text-white"
            }`}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white">
            <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
              <Link
                to="/"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
              >
                Home
              </Link>
              <Link
                to="/booking"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
              >
                Book Appointment
              </Link>

              {isAuthenticated ? (
                <>
                  <Link
                    to={getDashboardLink()}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <LogOut size={16} className="mr-2" />
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/register"
                    className="block px-3 py-2 bg-primary-600 text-white rounded-md text-base font-medium"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
