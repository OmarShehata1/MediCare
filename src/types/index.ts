export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  image: string;
  availability: string[];
  experience: number;
  education: string;
  description: string;
}

export interface Testimonial {
  id: number;
  name: string;
  image: string;
  rating: number;
  text: string;
  date: string;
}

export interface Appointment {
  id: number;
  doctorId: number;
  doctorName: string;
  specialty: string;
  patientName: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  notes?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  type: 'doctor' | 'patient';
  image?: string;
}