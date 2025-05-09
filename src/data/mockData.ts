import { Doctor, Testimonial, Appointment } from '../types';

export const doctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Emma Wilson",
    specialty: "Cardiologist",
    rating: 4.9,
    image: "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    availability: ["Monday", "Wednesday", "Friday"],
    experience: 15,
    education: "Harvard Medical School",
    description: "Dr. Wilson is a board-certified cardiologist with over 15 years of experience in treating complex cardiac conditions. She specializes in preventive cardiology and heart failure management."
  },
  {
    id: 2,
    name: "Dr. James Rodriguez",
    specialty: "Neurologist",
    rating: 4.7,
    image: "https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    availability: ["Tuesday", "Thursday", "Saturday"],
    experience: 12,
    education: "Johns Hopkins University",
    description: "Dr. Rodriguez is a neurologist specializing in the diagnosis and treatment of neurological disorders including epilepsy, stroke, and multiple sclerosis. He employs the latest techniques in neurological care."
  },
  {
    id: 3,
    name: "Dr. Sarah Chen",
    specialty: "Dermatologist",
    rating: 4.8,
    image: "https://images.pexels.com/photos/5214961/pexels-photo-5214961.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    availability: ["Monday", "Tuesday", "Thursday"],
    experience: 10,
    education: "Stanford University School of Medicine",
    description: "Dr. Chen is a dermatologist specializing in both medical and cosmetic dermatology. She treats skin conditions such as acne, eczema, and psoriasis, and also performs various cosmetic procedures."
  },
  {
    id: 4,
    name: "Dr. Michael Thompson",
    specialty: "Orthopedic Surgeon",
    rating: 4.6,
    image: "https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    availability: ["Wednesday", "Friday", "Saturday"],
    experience: 18,
    education: "Yale School of Medicine",
    description: "Dr. Thompson is an orthopedic surgeon specializing in sports medicine and joint replacement surgery. He has helped numerous athletes recover from injuries and return to their sport."
  }
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "John Doe",
    image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 5,
    text: "I've been a patient of Dr. Wilson for over 5 years now. Her expertise and caring approach have helped me manage my heart condition effectively. I highly recommend MediCare to anyone seeking quality healthcare.",
    date: "March 15, 2023"
  },
  {
    id: 2,
    name: "Emily Johnson",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 4,
    text: "The booking process was incredibly simple, and I got an appointment with Dr. Rodriguez within days. He took the time to explain my condition thoroughly and outlined a clear treatment plan. Very satisfied!",
    date: "January 8, 2023"
  },
  {
    id: 3,
    name: "Robert Smith",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 5,
    text: "After struggling with skin issues for years, Dr. Chen finally helped me find a solution. The staff at MediCare are all very professional and friendly. The facility is clean and modern. Great experience overall!",
    date: "February 22, 2023"
  },
  {
    id: 4,
    name: "Sofia Martinez",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 5,
    text: "Dr. Thompson performed my knee surgery, and I couldn't be happier with the results. The follow-up care was exceptional, and I'm now back to my active lifestyle. Thank you MediCare!",
    date: "April 3, 2023"
  }
];

export const appointments: Appointment[] = [
  {
    id: 1,
    doctorId: 1,
    doctorName: "Dr. Emma Wilson",
    specialty: "Cardiologist",
    patientName: "John Doe",
    date: "June 15, 2025",
    time: "10:00 AM",
    status: "confirmed",
    notes: "Follow-up appointment to review medication effectiveness."
  },
  {
    id: 2,
    doctorId: 2,
    doctorName: "Dr. James Rodriguez",
    specialty: "Neurologist",
    patientName: "Emily Johnson",
    date: "June 16, 2025",
    time: "2:30 PM",
    status: "pending",
    notes: "Initial consultation for recurring headaches."
  },
  {
    id: 3,
    doctorId: 3,
    doctorName: "Dr. Sarah Chen",
    specialty: "Dermatologist",
    patientName: "Robert Smith",
    date: "June 18, 2025",
    time: "11:15 AM",
    status: "completed",
    notes: "Annual skin checkup."
  },
  {
    id: 4,
    doctorId: 4,
    doctorName: "Dr. Michael Thompson",
    specialty: "Orthopedic Surgeon",
    patientName: "Sofia Martinez",
    date: "June 20, 2025",
    time: "9:00 AM",
    status: "cancelled",
    notes: "Pre-surgery consultation."
  },
  {
    id: 5,
    doctorId: 1,
    doctorName: "Dr. Emma Wilson",
    specialty: "Cardiologist",
    patientName: "David Clark",
    date: "June 22, 2025",
    time: "3:45 PM",
    status: "pending",
    notes: "New patient consultation."
  }
];

// Filter appointments by doctor ID
export const getAppointmentsByDoctor = (doctorId: number): Appointment[] => {
  return appointments.filter(appointment => appointment.doctorId === doctorId);
};

// Filter appointments by patient name (for the patient dashboard)
export const getAppointmentsByPatient = (patientName: string): Appointment[] => {
  return appointments.filter(appointment => 
    appointment.patientName.toLowerCase() === patientName.toLowerCase()
  );
};

// Get doctor by ID
export const getDoctorById = (id: number): Doctor | undefined => {
  return doctors.find(doctor => doctor.id === id);
};