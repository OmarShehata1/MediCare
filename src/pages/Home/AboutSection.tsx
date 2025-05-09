import React from 'react';
import { Check, Users, Stethoscope, Pill, Award, Clock } from 'lucide-react';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="section bg-white">
      <div className="container-custom">
        <h2 className="section-title">About <span className="text-primary-600">MediCare</span></h2>
        <p className="section-subtitle">
          At MediCare, we are dedicated to providing exceptional healthcare services with a patient-centered approach.
          Our team of experienced medical professionals strives to deliver the highest standard of care.
        </p>
        
        <div className="flex flex-col lg:flex-row items-center mt-12">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Medical team" 
                className="rounded-lg shadow-lg max-w-full h-auto"
              />
              
              {/* Experience badge */}
              <div className="absolute -bottom-8 -right-8 bg-primary-600 text-white p-4 rounded-lg shadow-lg">
                <div className="text-3xl font-bold">15+</div>
                <div className="text-sm">Years of Experience</div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 lg:pl-16">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">
              A Legacy of Excellence in Healthcare
            </h3>
            
            <p className="text-gray-600 mb-6">
              Founded in 2010, MediCare has grown to become a leading healthcare provider in the region. 
              Our state-of-the-art facilities, combined with our team of expert doctors, ensure that you receive 
              the best medical care possible.
            </p>
            
            <div className="space-y-4 mb-8">
              {[
                "Advanced diagnostic and treatment facilities",
                "Board-certified medical professionals",
                "Patient-centered approach to healthcare",
                "Comprehensive care for the whole family"
              ].map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="bg-primary-100 p-1 rounded-full mr-3">
                    <Check size={16} className="text-primary-600" />
                  </div>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
            
            <a href="#doctors" className="btn-primary">
              Meet Our Doctors
            </a>
          </div>
        </div>
        
        {/* Services */}
        <div className="mt-24">
          <h3 className="text-2xl font-bold text-center mb-12 text-gray-900">
            Our Specialized Services
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard 
              icon={<Stethoscope size={24} />}
              title="Primary Care"
              description="Comprehensive healthcare services for patients of all ages, focusing on prevention, diagnosis, and treatment of various medical conditions."
            />
            
            <ServiceCard 
              icon={<Pill size={24} />}
              title="Specialized Treatment"
              description="Expert care from specialists in cardiology, neurology, dermatology, orthopedics, and more for complex medical conditions."
            />
            
            <ServiceCard 
              icon={<Users size={24} />}
              title="Family Medicine"
              description="Ongoing, comprehensive healthcare for all family members, from infants to seniors, focusing on preventive care and overall wellness."
            />
            
            <ServiceCard 
              icon={<Award size={24} />}
              title="Expert Consultation"
              description="Professional advice and second opinions from our team of experienced specialists to ensure the best course of treatment."
            />
            
            <ServiceCard 
              icon={<Clock size={24} />}
              title="Emergency Services"
              description="24/7 emergency medical services with quick response times and state-of-the-art equipment for critical situations."
            />
            
            <ServiceCard 
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 8.71 13.29 3H10a1 1 0 0 0-1 1v0a1 1 0 0 0 1 1h2v6"/>
                <path d="M19 11v9a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1"/>
                <path d="M12 7v9"/>
                <path d="M9 16v-4"/>
                <path d="M15 13v3"/>
              </svg>}
              title="Diagnostic Testing"
              description="Comprehensive diagnostic services including lab tests, imaging, and other procedures to accurately identify medical conditions."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow group">
      <div className="bg-primary-100 text-primary-600 p-3 rounded-lg inline-block mb-4 group-hover:bg-primary-600 group-hover:text-white transition-colors">
        {icon}
      </div>
      <h4 className="text-xl font-bold mb-3 text-gray-900">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default AboutSection;