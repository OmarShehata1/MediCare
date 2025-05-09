import React from 'react';
import DoctorCard from '../../components/DoctorCard';
import { doctors } from '../../data/mockData';

const DoctorsSection: React.FC = () => {
  return (
    <section id="doctors" className="section bg-gray-50">
      <div className="container-custom">
        <h2 className="section-title">Meet Our <span className="text-primary-600">Doctors</span></h2>
        <p className="section-subtitle">
          Our team of highly qualified medical professionals is committed to providing exceptional care.
          With years of experience and expertise in various specialties, they are here to address all your healthcare needs.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <a
            href="#"
            className="btn-secondary inline-flex items-center"
          >
            View All Doctors
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 ml-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default DoctorsSection;