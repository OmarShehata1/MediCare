import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Phone, ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-10 lg:mb-0 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Your Health is Our <span className="text-secondary-300">Priority</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-100 mb-8 max-w-xl">
              Experience exceptional healthcare with our team of expert doctors. 
              We provide personalized care to help you live a healthier, happier life.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                to="/booking" 
                className="btn bg-white text-primary-700 hover:bg-gray-100 px-6 py-3 rounded-md flex items-center justify-center"
              >
                <Calendar size={20} className="mr-2" />
                Book Appointment
              </Link>
              
              <a 
                href="tel:+15551234567" 
                className="btn border border-white text-white hover:bg-white/10 px-6 py-3 rounded-md flex items-center justify-center"
              >
                <Phone size={20} className="mr-2" />
                Call Us
              </a>
            </div>
            
            <div className="mt-10 flex items-center">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="h-12 w-12 rounded-full border-2 border-white overflow-hidden">
                    <img 
                      src={`https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2`} 
                      alt="Patient" 
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="ml-4">
                <p className="font-medium">Trusted by</p>
                <p className="text-primary-100">10,000+ Patients</p>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 relative animate-slide-in">
            <div className="relative z-10 rounded-lg overflow-hidden shadow-2xl">
              <img 
                src="https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Doctor with patient" 
                className="w-full h-auto"
              />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-1/4 -left-5 h-20 w-20 bg-secondary-500 rounded-full opacity-20"></div>
            <div className="absolute bottom-1/4 -right-5 h-12 w-12 bg-accent-500 rounded-full opacity-20"></div>
            <div className="absolute -bottom-5 left-1/4 h-16 w-16 bg-secondary-300 rounded-full opacity-20"></div>
            
            {/* Feature card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg text-gray-800 max-w-xs">
              <div className="flex items-start">
                <div className="bg-primary-100 p-3 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-600">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-sm mb-1">24/7 Emergency Care</h3>
                  <p className="text-xs text-gray-600">Immediate medical attention whenever you need it</p>
                </div>
              </div>
            </div>
            
            {/* Feature card 2 */}
            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-lg shadow-lg text-gray-800 max-w-xs hidden md:block">
              <div className="flex items-start">
                <div className="bg-primary-100 p-3 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-600">
                    <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
                    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-sm mb-1">Virtual Consultations</h3>
                  <p className="text-xs text-gray-600">Talk to our doctors from the comfort of your home</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Quick links */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all group">
            <h3 className="font-bold text-xl mb-3">Find a Doctor</h3>
            <p className="text-primary-100 mb-4">Browse our network of experienced healthcare professionals.</p>
            <a href="#doctors" className="inline-flex items-center text-secondary-300 font-medium group-hover:text-secondary-200">
              Search Doctors
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all group">
            <h3 className="font-bold text-xl mb-3">Our Services</h3>
            <p className="text-primary-100 mb-4">Explore the comprehensive healthcare services we offer.</p>
            <a href="#about" className="inline-flex items-center text-secondary-300 font-medium group-hover:text-secondary-200">
              View Services
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all group">
            <h3 className="font-bold text-xl mb-3">Patient Reviews</h3>
            <p className="text-primary-100 mb-4">Read what our patients have to say about their experience.</p>
            <a href="#testimonials" className="inline-flex items-center text-secondary-300 font-medium group-hover:text-secondary-200">
              Read Reviews
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;