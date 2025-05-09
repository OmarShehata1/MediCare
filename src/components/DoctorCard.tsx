import React from 'react';
import { Star, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Doctor } from '../types';

interface DoctorCardProps {
  doctor: Doctor;
  showBookButton?: boolean;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, showBookButton = true }) => {
  const { id, name, specialty, rating, image, experience } = doctor;
  
  return (
    <div className="card group">
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-64 object-cover object-center group-hover:scale-105 transition-transform duration-300" 
        />
        <div className="absolute top-0 right-0 bg-primary-600 text-white px-3 py-1 text-sm font-medium">
          {specialty}
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <span className="font-medium">{experience} years experience</span>
        </div>
        
        <div className="flex items-center mb-4">
          <div className="flex text-yellow-400 mr-2">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={16} 
                fill={i < Math.floor(rating) ? "currentColor" : "none"} 
                className={i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"} 
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">{rating.toFixed(1)}</span>
        </div>
        
        {showBookButton && (
          <div className="flex justify-between items-center">
            <Link 
              to={`/booking?doctorId=${id}`}
              className="btn-primary flex items-center"
            >
              <Calendar size={16} className="mr-2" />
              Book Appointment
            </Link>
            <Link 
              to={`/booking?doctorId=${id}`}
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              View Profile
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorCard;