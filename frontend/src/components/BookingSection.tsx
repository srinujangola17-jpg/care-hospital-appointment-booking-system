import React, { useState } from 'react';
import { Calendar, CheckCircle, Lock, AlertCircle } from 'lucide-react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useSubmitAppointment } from '../hooks/useQueries';
import { useInView } from '../lib/useInView';
import { toast } from 'sonner';

const doctors = [
  'Dr. Sarah Mitchell - Cardiologist',
  'Dr. James Patel - Neurologist',
  'Dr. Emily Chen - Orthopedic Surgeon',
  'Dr. Michael Torres - Pediatrician',
  'Dr. Priya Sharma - Dermatologist',
  'Dr. Robert Kim - General Medicine',
];

const departments = [
  'Cardiology',
  'Neurology',
  'Orthopedics',
  'Pediatrics',
  'Dermatology',
  'General Medicine',
];

const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
  '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
];

interface FormData {
  patientName: string;
  email: string;
  phone: string;
  doctor: string;
  department: string;
  date: string;
  timeSlot: string;
}

interface FormErrors {
  patientName?: string;
  email?: string;
  phone?: string;
  doctor?: string;
  department?: string;
  date?: string;
  timeSlot?: string;
}

const initialForm: FormData = {
  patientName: '',
  email: '',
  phone: '',
  doctor: '',
  department: '',
  date: '',
  timeSlot: '',
};

export default function BookingSection() {
  const { identity, login, loginStatus } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';
  const { mutateAsync: submitAppointment, isPending } = useSubmitAppointment();
  const { ref: titleRef, inView: titleInView } = useInView();
  const { ref: formRef, inView: formInView } = useInView();

  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.patientName.trim()) newErrors.patientName = 'Patient name is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!form.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-()]{7,15}$/.test(form.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!form.doctor) newErrors.doctor = 'Please select a doctor';
    if (!form.department) newErrors.department = 'Please select a department';
    if (!form.date) {
      newErrors.date = 'Please select a date';
    } else if (form.date < today) {
      newErrors.date = 'Date cannot be in the past';
    }
    if (!form.timeSlot) newErrors.timeSlot = 'Please select a time slot';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await submitAppointment({
        patientName: form.patientName,
        email: form.email,
        phone: form.phone,
        doctor: form.doctor,
        department: form.department,
        date: form.date,
        timeSlot: form.timeSlot,
      });
      setSubmitted(true);
      setForm(initialForm);
      toast.success('Appointment booked successfully!');
    } catch {
      toast.error('Failed to book appointment. Please try again.');
    }
  };

  if (!isAuthenticated) {
    return (
      <section className="py-20 bg-hospital-gray">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-3xl shadow-soft-lg p-12">
            <div className="w-20 h-20 rounded-full bg-hospital-blue/10 flex items-center justify-center mx-auto mb-6">
              <Lock className="w-10 h-10 text-hospital-blue" />
            </div>
            <h2 className="text-2xl font-bold text-hospital-navy mb-3">Login to Book Appointment</h2>
            <p className="text-hospital-gray-dark mb-8 max-w-md mx-auto">
              Please log in to your account to book an appointment with our expert doctors.
            </p>
            <button
              onClick={login}
              disabled={isLoggingIn}
              className="btn-primary px-10 py-4 rounded-2xl font-semibold text-base inline-flex items-center gap-2 disabled:opacity-50"
            >
              <Calendar className="w-5 h-5" />
              {isLoggingIn ? 'Logging in...' : 'Login to Book'}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-hospital-gray">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={titleRef}
          className={`text-center mb-12 animate-on-scroll ${titleInView ? 'in-view' : ''}`}
        >
          <span className="inline-block px-4 py-1.5 bg-hospital-blue/10 text-hospital-blue text-sm font-semibold rounded-full mb-4">
            Book Appointment
          </span>
          <h2 className="section-title">Schedule Your Visit</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Fill in the details below to book your appointment with our specialists.
          </p>
        </div>

        <div
          ref={formRef}
          className={`bg-white rounded-3xl shadow-soft-lg overflow-hidden animate-on-scroll delay-100 ${formInView ? 'in-view' : ''}`}
        >
          {submitted ? (
            <div className="p-12 text-center">
              <div className="success-pop w-24 h-24 rounded-full bg-hospital-green/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-hospital-green" />
              </div>
              <h3 className="text-2xl font-bold text-hospital-navy mb-3">Appointment Confirmed!</h3>
              <p className="text-hospital-gray-dark mb-8 max-w-md mx-auto">
                Your appointment has been successfully booked. You will receive a confirmation shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="btn-primary px-8 py-3 rounded-2xl font-semibold"
              >
                Book Another Appointment
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-8 lg:p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Patient Name */}
                <div>
                  <label className="block text-sm font-semibold text-hospital-navy mb-2">
                    Patient Name <span className="text-hospital-red">*</span>
                  </label>
                  <input
                    type="text"
                    name="patientName"
                    value={form.patientName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={`w-full px-4 py-3 rounded-xl border ${errors.patientName ? 'border-hospital-red bg-red-50' : 'border-border'} focus:outline-none focus:ring-2 focus:ring-hospital-blue/30 focus:border-hospital-blue transition-all text-sm`}
                  />
                  {errors.patientName && (
                    <p className="mt-1.5 text-xs text-hospital-red flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />{errors.patientName}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-hospital-navy mb-2">
                    Email Address <span className="text-hospital-red">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-hospital-red bg-red-50' : 'border-border'} focus:outline-none focus:ring-2 focus:ring-hospital-blue/30 focus:border-hospital-blue transition-all text-sm`}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-hospital-red flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />{errors.email}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-hospital-navy mb-2">
                    Phone Number <span className="text-hospital-red">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-hospital-red bg-red-50' : 'border-border'} focus:outline-none focus:ring-2 focus:ring-hospital-blue/30 focus:border-hospital-blue transition-all text-sm`}
                  />
                  {errors.phone && (
                    <p className="mt-1.5 text-xs text-hospital-red flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />{errors.phone}
                    </p>
                  )}
                </div>

                {/* Select Doctor */}
                <div>
                  <label className="block text-sm font-semibold text-hospital-navy mb-2">
                    Select Doctor <span className="text-hospital-red">*</span>
                  </label>
                  <select
                    id="doctor-select"
                    name="doctor"
                    value={form.doctor}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border ${errors.doctor ? 'border-hospital-red bg-red-50' : 'border-border'} focus:outline-none focus:ring-2 focus:ring-hospital-blue/30 focus:border-hospital-blue transition-all text-sm bg-white`}
                  >
                    <option value="">Choose a doctor</option>
                    {doctors.map((doc) => (
                      <option key={doc} value={doc}>{doc}</option>
                    ))}
                  </select>
                  {errors.doctor && (
                    <p className="mt-1.5 text-xs text-hospital-red flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />{errors.doctor}
                    </p>
                  )}
                </div>

                {/* Select Department */}
                <div>
                  <label className="block text-sm font-semibold text-hospital-navy mb-2">
                    Department <span className="text-hospital-red">*</span>
                  </label>
                  <select
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border ${errors.department ? 'border-hospital-red bg-red-50' : 'border-border'} focus:outline-none focus:ring-2 focus:ring-hospital-blue/30 focus:border-hospital-blue transition-all text-sm bg-white`}
                  >
                    <option value="">Select department</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                  {errors.department && (
                    <p className="mt-1.5 text-xs text-hospital-red flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />{errors.department}
                    </p>
                  )}
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-semibold text-hospital-navy mb-2">
                    Appointment Date <span className="text-hospital-red">*</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    min={today}
                    className={`w-full px-4 py-3 rounded-xl border ${errors.date ? 'border-hospital-red bg-red-50' : 'border-border'} focus:outline-none focus:ring-2 focus:ring-hospital-blue/30 focus:border-hospital-blue transition-all text-sm`}
                  />
                  {errors.date && (
                    <p className="mt-1.5 text-xs text-hospital-red flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />{errors.date}
                    </p>
                  )}
                </div>

                {/* Time Slot */}
                <div>
                  <label className="block text-sm font-semibold text-hospital-navy mb-2">
                    Time Slot <span className="text-hospital-red">*</span>
                  </label>
                  <select
                    name="timeSlot"
                    value={form.timeSlot}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border ${errors.timeSlot ? 'border-hospital-red bg-red-50' : 'border-border'} focus:outline-none focus:ring-2 focus:ring-hospital-blue/30 focus:border-hospital-blue transition-all text-sm bg-white`}
                  >
                    <option value="">Select time slot</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                  {errors.timeSlot && (
                    <p className="mt-1.5 text-xs text-hospital-red flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />{errors.timeSlot}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full btn-primary py-4 rounded-2xl font-semibold text-base flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isPending ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Booking...
                    </>
                  ) : (
                    <>
                      <Calendar className="w-5 h-5" />
                      Confirm Appointment
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
