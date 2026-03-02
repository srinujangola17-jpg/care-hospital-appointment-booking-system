import React from 'react';
import DoctorCard, { type Doctor } from './DoctorCard';
import { useInView } from '../lib/useInView';

const doctors: Doctor[] = [
  {
    id: 1,
    name: 'Dr. Sarah Mitchell',
    specialization: 'Cardiologist',
    experience: 14,
    rating: 4.9,
    reviews: 312,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
    available: true,
  },
  {
    id: 2,
    name: 'Dr. James Patel',
    specialization: 'Neurologist',
    experience: 18,
    rating: 4.8,
    reviews: 278,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
    available: true,
  },
  {
    id: 3,
    name: 'Dr. Emily Chen',
    specialization: 'Orthopedic Surgeon',
    experience: 11,
    rating: 4.9,
    reviews: 195,
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&crop=face',
    available: false,
  },
  {
    id: 4,
    name: 'Dr. Michael Torres',
    specialization: 'Pediatrician',
    experience: 9,
    rating: 4.7,
    reviews: 421,
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&crop=face',
    available: true,
  },
  {
    id: 5,
    name: 'Dr. Priya Sharma',
    specialization: 'Dermatologist',
    experience: 12,
    rating: 4.8,
    reviews: 356,
    image: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=400&h=400&fit=crop&crop=face',
    available: true,
  },
  {
    id: 6,
    name: 'Dr. Robert Kim',
    specialization: 'General Medicine',
    experience: 20,
    rating: 4.9,
    reviews: 589,
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop&crop=face',
    available: true,
  },
];

const delays = ['delay-0', 'delay-100', 'delay-200', 'delay-0', 'delay-100', 'delay-200'];

export default function DoctorsSection() {
  const { ref: titleRef, inView: titleInView } = useInView();
  const { ref: gridRef, inView: gridInView } = useInView();

  const scrollToBooking = (doctor: Doctor) => {
    const el = document.querySelector('#book-appointment');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const doctorSelect = document.getElementById('doctor-select') as HTMLSelectElement;
        if (doctorSelect) {
          doctorSelect.value = doctor.name;
          doctorSelect.dispatchEvent(new Event('change', { bubbles: true }));
        }
      }, 800);
    }
  };

  return (
    <section className="py-20 bg-hospital-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={titleRef}
          className={`text-center mb-14 animate-on-scroll ${titleInView ? 'in-view' : ''}`}
        >
          <span className="inline-block px-4 py-1.5 bg-hospital-blue/10 text-hospital-blue text-sm font-semibold rounded-full mb-4">
            Our Medical Team
          </span>
          <h2 className="section-title">Meet Our Expert Doctors</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Our team of highly qualified specialists is dedicated to providing you with the best medical care.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor, i) => (
            <div
              key={doctor.id}
              className={`animate-on-scroll ${delays[i]} ${gridInView ? 'in-view' : ''}`}
            >
              <DoctorCard doctor={doctor} onBookNow={scrollToBooking} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
