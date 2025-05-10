import React from 'react';
import { Calendar, Clock, FileText, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Appointment } from '../types';
import Button from './Button';

interface AppointmentCardProps {
  appointment: Appointment;
  userType: 'doctor' | 'patient';
  onStatusChange?: (id: number, status: 'confirmed' | 'cancelled' | 'completed') => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ 
  appointment, 
  userType,
  onStatusChange
}) => {
  const { id, doctorName, specialty, patientName, date, time, status, notes } = appointment;
  
  const getStatusColor = () => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusIcon = () => {
    switch (status) {
      case 'confirmed': return <CheckCircle size={16} className="text-green-600" />;
      case 'pending': return <AlertCircle size={16} className="text-yellow-600" />;
      case 'completed': return <CheckCircle size={16} className="text-blue-600" />;
      case 'cancelled': return <XCircle size={16} className="text-red-600" />;
      default: return null;
    }
  };
  
  return (
    <div className="card p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-medium">{userType === 'doctor' ? patientName : doctorName}</h3>
          <p className="text-gray-600">{specialty}</p>
        </div>
        
        <div className="mt-2 md:mt-0">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor()}`}>
            {getStatusIcon()}
            <span className="ml-1.5 capitalize">{status}</span>
          </span>
        </div>
      </div>
      
      <div className="flex flex-col space-y-3">
        <div className="flex items-center text-gray-700">
          <Calendar size={18} className="mr-2 text-primary-600" />
          <span>{date}</span>
        </div>
        
        <div className="flex items-center text-gray-700">
          <Clock size={18} className="mr-2 text-primary-600" />
          <span>{time}</span>
        </div>
        
        {notes && (
          <div className="flex items-start text-gray-700">
            <FileText size={18} className="mr-2 mt-0.5 text-primary-600" />
            <span>{notes}</span>
          </div>
        )}
      </div>
      
      {status === 'pending' && userType === 'doctor' && onStatusChange && (
        <div className="mt-4 flex space-x-2">
          <Button 
            variant="primary" 
            size="sm"
            onClick={() => onStatusChange(id, 'confirmed')}
            leftIcon={<CheckCircle size={16} />}
          >
            Confirm
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onStatusChange(id, 'cancelled')}
            leftIcon={<XCircle size={16} />}
          >
            Cancel
          </Button>
        </div>
      )}

      {status === 'confirmed' && userType === 'doctor' && onStatusChange && (
        <div className="mt-4 flex space-x-2">
          <Button 
            variant="primary" 
            size="sm"
            onClick={() => onStatusChange(id, 'completed')}
            leftIcon={<CheckCircle size={16} />}
          >
            Mark as Completed
          </Button>
        </div>
      )}

      {status === 'pending' && userType === 'patient' && onStatusChange && (
        <div className="mt-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onStatusChange(id, 'cancelled')}
            leftIcon={<XCircle size={16} />}
          >
            Cancel Appointment
          </Button>
        </div>
      )}
    </div>
  );
};

export default AppointmentCard;