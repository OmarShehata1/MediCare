import React from 'react';
import TestimonialCard from '../../components/TestimonialCard';
import { testimonials } from '../../data/mockData';

const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="section bg-white">
      <div className="container-custom">
        <h2 className="section-title">What Our <span className="text-primary-600">Patients Say</span></h2>
        <p className="section-subtitle">
          Hear from our patients about their experiences with MediCare.
          We value the trust they place in us and strive to exceed their expectations.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
        
        {/* Stats */}
        <div className="mt-20 bg-primary-50 rounded-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="p-4">
              <div className="text-4xl font-bold text-primary-600 mb-2">10,000+</div>
              <div className="text-gray-700">Happy Patients</div>
            </div>
            
            <div className="p-4">
              <div className="text-4xl font-bold text-primary-600 mb-2">25+</div>
              <div className="text-gray-700">Expert Doctors</div>
            </div>
            
            <div className="p-4">
              <div className="text-4xl font-bold text-primary-600 mb-2">15+</div>
              <div className="text-gray-700">Years Experience</div>
            </div>
            
            <div className="p-4">
              <div className="text-4xl font-bold text-primary-600 mb-2">98%</div>
              <div className="text-gray-700">Patient Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;