import React from 'react';
import { Appointment } from '../../types';
import AppointmentCard from '../../components/AppointmentCard';

interface MyBookingsProps {
  appointments: Appointment[];
  onStatusChange?: (id: number, status: 'confirmed' | 'cancelled') => void;
}

const MyBookings: React.FC<MyBookingsProps> = ({ appointments, onStatusChange }) => {
  if (appointments.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">No appointments found in this category.</p>
      </div>
    );
  }
  
  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
      {appointments.map((appointment) => (
        <AppointmentCard 
          key={appointment.id} 
          appointment={appointment}
          userType="patient"
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
};

export default MyBookings;