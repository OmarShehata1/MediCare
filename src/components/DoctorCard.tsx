import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface DoctorCardProps {
  doctor: {
    id: number;
    name: string;
    specialty: string;
    image: string;
    rating: number;
    experience: string;
  };
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  const { user } = useAuth();
  const isPatient = user?.type === 'patient';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img src={doctor.image} alt={doctor.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{doctor.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{doctor.specialty}</p>
        
        <div className="flex items-center mb-2">
          <Star className="h-4 w-4 text-yellow-500 fill-current" />
          <span className="text-sm text-gray-700 ml-1">{doctor.rating} / 5</span>
          <span className="text-sm text-gray-500 ml-2">• {doctor.experience}</span>
        </div>
        
        {isPatient ? (
          <Link 
            to={`/booking?doctorId=${doctor.id}`} 
            className="mt-2 inline-block w-full text-center py-2 px-4 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition"
          >
            Book Appointment
          </Link>
        ) : (
          <div className="mt-2 py-2 px-4 bg-gray-100 text-gray-400 rounded-md text-center cursor-not-allowed">
            Booking Not Available
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorCard;