import { Appointment, Doctor } from "../types";

const API_URL = "https://localhost:7024/api";

interface ApiError {
  message: string;
  status: number;
}

// Helper function for API calls
async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem("medicare_token");

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers
    });

    // Handle 401 Unauthorized (token expired)
    if (response.status === 401) {
      localStorage.removeItem("medicare_token");
      localStorage.removeItem("medicare_user");
      window.location.href = "/login"; // Redirect to login
      throw { message: "Authentication expired", status: 401 };
    }

    // Handle other error responses
    if (!response.ok) {
      const errorText = await response.text();
      throw {
        message: errorText || `Error: ${response.status}`,
        status: response.status
      };
    }

    // Check content type to determine if response is JSON
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      // Parse as JSON
      const text = await response.text();
      return text ? JSON.parse(text) : {} as T;
    } else {
      // Return text response as is
      const text = await response.text();
      // If the caller expects a JSON object but got text, create a simple object with 'message' property
      if (text) {
        try {
          return JSON.parse(text) as T;
        } catch {
          return { message: text } as unknown as T;
        }
      }
      return text as unknown as T;
    }
  } catch (error) {
    if ((error as ApiError).message) {
      throw error;
    }
    throw { message: "Network error", status: 0 };
  }
}

// Auth API
export const authApi = {
  login: (email: string, password: string) =>
    apiCall<{ token: string }>("/Auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password })
    }),

  register: (name: string, email: string, password: string, accountType: string) =>
    apiCall<{ message?: string }>("/Auth/register", {
      method: "POST",
      body: JSON.stringify({ 
        username: name, 
        email, 
        password, 
        role: accountType // Backend expects 'role' not 'userType'
      })
    })
};

// Doctors API
export const doctorsApi = {
  getAll: () => apiCall<Doctor[]>("/Doctors"),
  
  getById: (id: number) => apiCall<Doctor>(`/Doctors/${id}`),
  
  updateProfile: (data: Partial<Doctor>) =>
    apiCall<void>("/Doctors/profile", {
      method: "PUT",
      body: JSON.stringify(data)
    })
};

// Appointments API
export const appointmentsApi = {
  getAll: () => apiCall<Appointment[]>("/Appointments"),
  
  getById: (id: number) => apiCall<Appointment>(`/Appointments/${id}`),
  
  create: (data: {
    doctorId: number;
    date: string;
    time: string;
    notes?: string;
    status?: string;
    specialty?: string;
    doctorName?: string;
    patientName?: string;
  }) =>
    apiCall<Appointment>("/Appointments", {
      method: "POST",
      body: JSON.stringify(data)
    }),
  
  updateStatus: (id: number, status: string, notes?: string) =>
    apiCall<void>(`/Appointments/${id}/status`, {
      method: "PUT",
      body: JSON.stringify({ status, notes })
    })
};