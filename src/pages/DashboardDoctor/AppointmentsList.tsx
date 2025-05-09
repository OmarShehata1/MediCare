import React from 'react';
import { Appointment } from '../../types';
import AppointmentCard from '../../components/AppointmentCard';

interface AppointmentsListProps {
  appointments: Appointment[];
  userType: 'doctor' | 'patient';
  onStatusChange?: (id: number, status: 'confirmed' | 'cancelled') => void;
}

const AppointmentsList: React.FC<AppointmentsListProps> = ({ 
  appointments, 
  userType,
  onStatusChange
}) => {
  if (appointments.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">No appointments found.</p>
      </div>
    );
  }
  
  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
      {appointments.map((appointment) => (
        <AppointmentCard 
          key={appointment.id} 
          appointment={appointment}
          userType={userType}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
};

export default AppointmentsList;