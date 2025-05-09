import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { format, addDays } from 'date-fns';
import { Calendar, Clock, FileText, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { doctors, getDoctorById } from '../../data/mockData';
import { Doctor } from '../../types';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Button from '../../components/Button';

const BookingForm: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const preSelectedDoctorId = searchParams.get('doctorId');
  
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  
  // Available times (would normally be loaded based on doctor availability)
  const availableTimes = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', 
    '11:00 AM', '11:30 AM', '01:00 PM', '01:30 PM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
    '04:00 PM', '04:30 PM'
  ];
  
  // Generate next 14 days for date selection
  const generateDates = () => {
    const dates = [];
    for (let i = 1; i < 15; i++) {
      const date = addDays(new Date(), i);
      dates.push({
        full: format(date, 'yyyy-MM-dd'),
        display: format(date, 'EEE, MMM d'),
        day: format(date, 'd'),
        weekday: format(date, 'EEE')
      });
    }
    return dates;
  };
  
  const dates = generateDates();
  
  // Pre-select doctor if doctorId is in URL
  useEffect(() => {
    if (preSelectedDoctorId) {
      const doctorId = parseInt(preSelectedDoctorId, 10);
      const doctor = getDoctorById(doctorId);
      if (doctor) {
        setSelectedDoctor(doctor);
      }
    }
  }, [preSelectedDoctorId]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDoctor || !selectedDate || !selectedTime) {
      alert('Please select a doctor, date, and time.');
      return;
    }
    
    try {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccess(true);
      
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate('/dashboard/client');
      }, 2000);
    } catch (error) {
      console.error(error);
      alert('Failed to book appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  if (success) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <div className="pt-20 pb-12">
          <div className="container-custom">
            <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
              <div className="bg-green-100 text-green-700 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-6">
                <Check size={32} />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Appointment Booked Successfully!</h2>
              
              <p className="text-gray-600 mb-6">
                Your appointment with {selectedDoctor?.name} has been scheduled for {selectedDate} at {selectedTime}.
                You will receive a confirmation email shortly.
              </p>
              
              <div className="mt-8">
                <Button
                  variant="primary"
                  onClick={() => navigate('/dashboard/client')}
                >
                  Go to Dashboard
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-20 pb-12">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">Book an Appointment</h1>
            <p className="text-gray-600 text-center mb-8">Fill out the form below to schedule your visit with one of our doctors.</p>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold">Patient Information</h2>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="p-6 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      value={user?.name || ''}
                      readOnly
                      className="input-field bg-gray-50"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={user?.email || ''}
                      readOnly
                      className="input-field bg-gray-50"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Select Doctor</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {doctors.map((doctor) => (
                        <div
                          key={doctor.id}
                          onClick={() => setSelectedDoctor(doctor)}
                          className={`
                            flex items-center p-3 border rounded-lg cursor-pointer transition-colors
                            ${selectedDoctor?.id === doctor.id
                              ? 'border-primary-600 bg-primary-50'
                              : 'border-gray-200 hover:bg-gray-50'}
                          `}
                        >
                          <div className="flex-shrink-0 h-12 w-12 rounded-full overflow-hidden mr-4">
                            <img src={doctor.image} alt={doctor.name} className="h-full w-full object-cover" />
                          </div>
                          <div>
                            <h3 className="font-medium">{doctor.name}</h3>
                            <p className="text-sm text-gray-500">{doctor.specialty}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {selectedDoctor && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Select Date</label>
                        <div className="flex items-center space-x-2 mb-4">
                          <Calendar size={20} className="text-primary-600" />
                          <span className="text-sm text-gray-600">Available dates</span>
                        </div>
                        
                        <div className="flex space-x-2 overflow-x-auto pb-4">
                          {dates.map((date) => (
                            <div
                              key={date.full}
                              onClick={() => setSelectedDate(date.full)}
                              className={`
                                flex flex-col items-center justify-center h-20 w-16 rounded-lg cursor-pointer transition-colors flex-shrink-0
                                ${selectedDate === date.full
                                  ? 'bg-primary-600 text-white'
                                  : 'bg-white border border-gray-200 hover:bg-gray-50'}
                              `}
                            >
                              <span className="text-xs font-medium">{date.weekday}</span>
                              <span className="text-lg font-bold">{date.day}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {selectedDate && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-3">Select Time</label>
                          <div className="flex items-center space-x-2 mb-4">
                            <Clock size={20} className="text-primary-600" />
                            <span className="text-sm text-gray-600">Available time slots</span>
                          </div>
                          
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                            {availableTimes.map((time) => (
                              <div
                                key={time}
                                onClick={() => setSelectedTime(time)}
                                className={`
                                  flex items-center justify-center py-2 border rounded cursor-pointer transition-colors
                                  ${selectedTime === time
                                    ? 'border-primary-600 bg-primary-50 text-primary-700'
                                    : 'border-gray-200 hover:bg-gray-50'}
                                `}
                              >
                                {time}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          <div className="flex items-center">
                            <FileText size={18} className="text-primary-600 mr-2" />
                            Notes (Optional)
                          </div>
                        </label>
                        <textarea
                          rows={3}
                          className="input-field"
                          placeholder="Describe your symptoms or reason for the visit..."
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                        ></textarea>
                      </div>
                    </>
                  )}
                </div>
                
                <div className="px-6 py-4 bg-gray-50 flex justify-end">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={!selectedDoctor || !selectedDate || !selectedTime || loading}
                    isLoading={loading}
                  >
                    Confirm Booking
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BookingForm;