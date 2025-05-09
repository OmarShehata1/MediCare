import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { appointments } from '../../data/mockData';
import Sidebar from './Sidebar';
import AppointmentsList from './AppointmentsList';
import { Appointment } from '../../types';
import { Calendar, Clock, Users, ArrowUpRight } from 'lucide-react';

const DashboardDoctor: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');
  
  // Filter appointments by status
  const getFilteredAppointments = () => {
    if (activeTab === 'upcoming') {
      return appointments.filter(app => app.status === 'confirmed' || app.status === 'pending');
    } else if (activeTab === 'completed') {
      return appointments.filter(app => app.status === 'completed');
    } else {
      return appointments.filter(app => app.status === 'cancelled');
    }
  };
  
  const handleStatusChange = (id: number, status: 'confirmed' | 'cancelled') => {
    // In a real app, this would call an API to update the status
    console.log('Updating appointment', id, 'to status', status);
    
    // Simulate API call
    setTimeout(() => {
      alert(`Appointment ${id} has been ${status === 'confirmed' ? 'confirmed' : 'cancelled'}`);
    }, 500);
  };
  
  // Count appointments by status
  const countByStatus = (status: 'confirmed' | 'pending' | 'completed' | 'cancelled') => {
    return appointments.filter(app => app.status === status).length;
  };
  
  const upcomingCount = countByStatus('confirmed') + countByStatus('pending');
  const completedCount = countByStatus('completed');
  const cancelledCount = countByStatus('cancelled');
  
  // Get today's appointments
  const todaysAppointments = appointments.filter(app => app.date === 'June 15, 2025');
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      <Sidebar />
      
      <div className="flex-grow p-4 md:p-8 pt-20 md:pt-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Welcome, {user?.name}</h1>
          
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <OverviewCard 
              title="Today's Appointments"
              count={todaysAppointments.length}
              icon={<Calendar size={24} className="text-primary-600" />}
              color="bg-blue-50"
            />
            
            <OverviewCard 
              title="Upcoming"
              count={upcomingCount}
              icon={<Clock size={24} className="text-green-600" />}
              color="bg-green-50"
            />
            
            <OverviewCard 
              title="Completed"
              count={completedCount}
              icon={<Users size={24} className="text-violet-600" />}
              color="bg-violet-50"
            />
            
            <OverviewCard 
              title="Cancelled"
              count={cancelledCount}
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-600">
                <path d="M8 2v4"/>
                <path d="M16 2v4"/>
                <rect width="18" height="18" x="3" y="4" rx="2"/>
                <path d="M3 10h18"/>
                <path d="M15 15h-6"/>
              </svg>}
              color="bg-orange-50"
            />
          </div>
          
          {/* Today's Appointments */}
          <div className="bg-white rounded-lg shadow mb-8">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Today's Appointments</h2>
            </div>
            
            <div className="p-6">
              {todaysAppointments.length > 0 ? (
                <div className="space-y-4">
                  {todaysAppointments.map((appointment) => (
                    <TodayAppointmentCard 
                      key={appointment.id}
                      appointment={appointment}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No appointments scheduled for today.</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Tabs */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex flex-wrap -mb-px">
                <button
                  onClick={() => setActiveTab('upcoming')}
                  className={`flex items-center mr-8 pb-4 text-sm font-medium border-b-2 focus:outline-none ${
                    activeTab === 'upcoming'
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Upcoming ({upcomingCount})
                </button>
                
                <button
                  onClick={() => setActiveTab('completed')}
                  className={`flex items-center mr-8 pb-4 text-sm font-medium border-b-2 focus:outline-none ${
                    activeTab === 'completed'
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Completed ({completedCount})
                </button>
                
                <button
                  onClick={() => setActiveTab('cancelled')}
                  className={`flex items-center pb-4 text-sm font-medium border-b-2 focus:outline-none ${
                    activeTab === 'cancelled'
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Cancelled ({cancelledCount})
                </button>
              </div>
            </div>
            
            <AppointmentsList 
              appointments={getFilteredAppointments()} 
              userType="doctor"
              onStatusChange={handleStatusChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

interface OverviewCardProps {
  title: string;
  count: number;
  icon: React.ReactNode;
  color: string;
}

const OverviewCard: React.FC<OverviewCardProps> = ({ title, count, icon, color }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{count}</p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

interface TodayAppointmentCardProps {
  appointment: Appointment;
}

const TodayAppointmentCard: React.FC<TodayAppointmentCardProps> = ({ appointment }) => {
  const { patientName, time, status } = appointment;
  
  const getStatusBadgeColor = () => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex items-center">
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-4">
          <Users size={18} className="text-gray-600" />
        </div>
        <div>
          <h4 className="font-medium">{patientName}</h4>
          <p className="text-sm text-gray-500">{time}</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor()}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
        
        <a href="#" className="text-primary-600 hover:text-primary-700">
          <ArrowUpRight size={18} />
        </a>
      </div>
    </div>
  );
};

export default DashboardDoctor;