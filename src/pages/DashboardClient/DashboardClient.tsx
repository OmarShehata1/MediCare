import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { appointments, doctors } from '../../data/mockData';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import MyBookings from './MyBookings';
import DoctorCard from '../../components/DoctorCard';
import { Calendar, Clock, UserPlus, Activity } from 'lucide-react';

const DashboardClient: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');
  
  // Get patient appointments
  const patientName = user?.name || '';
  const patientAppointments = appointments.filter(app => 
    app.patientName.toLowerCase() === patientName.toLowerCase()
  );
  
  // Filter appointments by status
  const getFilteredAppointments = () => {
    if (activeTab === 'upcoming') {
      return patientAppointments.filter(app => app.status === 'confirmed' || app.status === 'pending');
    } else if (activeTab === 'completed') {
      return patientAppointments.filter(app => app.status === 'completed');
    } else {
      return patientAppointments.filter(app => app.status === 'cancelled');
    }
  };
  
  const handleStatusChange = (id: number, status: 'confirmed' | 'cancelled') => {
    // In a real app, this would call an API to update the status
    console.log('Updating appointment', id, 'to status', status);
    
    // Simulate API call
    setTimeout(() => {
      alert(`Appointment ${id} has been ${status}`);
    }, 500);
  };
  
  // Get upcoming appointment
  const upcomingAppointment = patientAppointments.find(app => 
    app.status === 'confirmed' || app.status === 'pending'
  );
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      <Sidebar />
      
      <div className="flex-grow p-4 md:p-8 pt-20 md:pt-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Welcome, {user?.name}</h1>
          
          {/* Welcome & CTA */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-6 text-white">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-bold mb-2">Your Health Portal</h2>
                  <p className="text-primary-100 mb-4 md:mb-0">
                    Manage your appointments, access medical records, and connect with healthcare professionals.
                  </p>
                </div>
                <Link
                  to="/booking"
                  className="btn bg-white text-primary-700 hover:bg-primary-50 inline-flex items-center"
                >
                  <Calendar size={18} className="mr-2" />
                  Book Appointment
                </Link>
              </div>
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatsCard 
                icon={<Calendar size={20} className="text-primary-600" />}
                title="Appointments"
                value={patientAppointments.length.toString()}
                description="Total appointments"
              />
              
              <StatsCard 
                icon={<Activity size={20} className="text-primary-600" />}
                title="Health Score"
                value="92%"
                description="Based on your records"
              />
              
              <StatsCard 
                icon={<Clock size={20} className="text-primary-600" />}
                title="Next Checkup"
                value="18 days"
                description="Regular checkup"
              />
            </div>
          </div>
          
          {/* Upcoming Appointment */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Next Appointment</h2>
            </div>
            
            <div className="p-6">
              {upcomingAppointment ? (
                <div className="bg-primary-50 border border-primary-100 rounded-lg p-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex items-start mb-4 md:mb-0">
                      <div className="bg-white p-3 rounded-full shadow-sm mr-4">
                        <Calendar size={24} className="text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Appointment with {upcomingAppointment.doctorName}</h3>
                        <p className="text-gray-600">{upcomingAppointment.date} at {upcomingAppointment.time}</p>
                        <span className={`inline-block mt-2 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          upcomingAppointment.status === 'confirmed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {upcomingAppointment.status.charAt(0).toUpperCase() + upcomingAppointment.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-3">
                      <button className="btn-secondary">
                        Reschedule
                      </button>
                      <button 
                        className="btn-outline text-red-600 border-red-300 hover:bg-red-50"
                        onClick={() => handleStatusChange(upcomingAppointment.id, 'cancelled')}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-500 mb-4">You don't have any upcoming appointments.</p>
                  <Link to="/booking" className="btn-primary">
                    Book Now
                  </Link>
                </div>
              )}
            </div>
          </div>
          
          {/* Recommended Doctors */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold">Recommended Doctors</h2>
              <Link to="/booking" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View All
              </Link>
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctors.slice(0, 3).map(doctor => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          </div>
          
          {/* All Appointments */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold">My Appointments</h2>
              
              <div className="flex">
                <button
                  onClick={() => setActiveTab('upcoming')}
                  className={`px-3 py-1 text-sm rounded-md mr-2 ${
                    activeTab === 'upcoming'
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Upcoming
                </button>
                
                <button
                  onClick={() => setActiveTab('completed')}
                  className={`px-3 py-1 text-sm rounded-md mr-2 ${
                    activeTab === 'completed'
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Completed
                </button>
                
                <button
                  onClick={() => setActiveTab('cancelled')}
                  className={`px-3 py-1 text-sm rounded-md ${
                    activeTab === 'cancelled'
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Cancelled
                </button>
              </div>
            </div>
            
            <MyBookings 
              appointments={getFilteredAppointments()} 
              onStatusChange={handleStatusChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatsCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ icon, title, value, description }) => {
  return (
    <div className="flex items-center">
      <div className="bg-primary-50 p-3 rounded-full mr-4">
        {icon}
      </div>
      <div>
        <h3 className="text-gray-500 text-sm">{title}</h3>
        <p className="text-xl font-bold text-gray-900">{value}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
    </div>
  );
};

export default DashboardClient;