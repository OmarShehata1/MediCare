import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import TestimonialsSection from './TestimonialsSection';
import DoctorsSection from './DoctorsSection';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main>
        <HeroSection />
        <AboutSection />
        <DoctorsSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
};

const CTASection: React.FC = () => {
  return (
    <section className="py-16 bg-primary-700">
      <div className="container-custom">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 bg-primary-600 p-8 md:p-12 text-white">
              <h2 className="text-3xl font-bold mb-4">Need Medical Attention?</h2>
              <p className="mb-6 text-primary-100">
                Our team of expert doctors are ready to provide you with the best healthcare services.
                Book an appointment now and take the first step towards better health.
              </p>
              <Link to="/booking" className="inline-block bg-white text-primary-700 px-6 py-3 rounded-md font-medium hover:bg-primary-50 transition-colors">
                Book an Appointment
              </Link>
            </div>
            
            <div className="md:w-1/2 p-8 md:p-12">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Emergency? Call Us Now</h3>
              <p className="text-gray-600 mb-6">
                For emergencies, call our 24/7 helpline or visit our emergency department.
                Our emergency services are available round the clock.
              </p>
              <div className="flex flex-col space-y-4">
                <div className="flex items-center text-gray-700">
                  <div className="bg-primary-100 rounded-full p-3 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-600">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Emergency Hotline</p>
                    <p className="text-lg font-bold text-primary-600">+1 (555) 911-1234</p>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-700">
                  <div className="bg-primary-100 rounded-full p-3 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-600">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email Us</p>
                    <p className="text-lg font-bold text-primary-600">emergency@medicare.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;