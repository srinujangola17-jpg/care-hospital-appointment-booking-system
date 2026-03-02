import React from 'react';
import { Heart, Brain, Bone, Baby, Sparkles, Stethoscope } from 'lucide-react';
import { useInView } from '../lib/useInView';

const departments = [
  {
    icon: Heart,
    name: 'Cardiology',
    description: 'Advanced heart care with state-of-the-art diagnostic and treatment facilities.',
    color: 'text-red-500',
    bg: 'bg-red-50',
    border: 'border-red-100',
    iconBg: 'bg-red-100',
    patients: '2,400+',
  },
  {
    icon: Brain,
    name: 'Neurology',
    description: 'Comprehensive neurological care for brain, spine, and nervous system disorders.',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-100',
    iconBg: 'bg-purple-100',
    patients: '1,800+',
  },
  {
    icon: Bone,
    name: 'Orthopedics',
    description: 'Expert care for bones, joints, muscles, and sports-related injuries.',
    color: 'text-orange-500',
    bg: 'bg-orange-50',
    border: 'border-orange-100',
    iconBg: 'bg-orange-100',
    patients: '3,100+',
  },
  {
    icon: Baby,
    name: 'Pediatrics',
    description: 'Specialized healthcare for infants, children, and adolescents with compassionate care.',
    color: 'text-pink-500',
    bg: 'bg-pink-50',
    border: 'border-pink-100',
    iconBg: 'bg-pink-100',
    patients: '4,200+',
  },
  {
    icon: Sparkles,
    name: 'Dermatology',
    description: 'Complete skin, hair, and nail care with advanced cosmetic and medical treatments.',
    color: 'text-teal-600',
    bg: 'bg-teal-50',
    border: 'border-teal-100',
    iconBg: 'bg-teal-100',
    patients: '2,900+',
  },
  {
    icon: Stethoscope,
    name: 'General Medicine',
    description: 'Primary healthcare services for all ages with preventive and curative care.',
    color: 'text-hospital-blue',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    iconBg: 'bg-blue-100',
    patients: '6,500+',
  },
];

const delays = ['delay-0', 'delay-100', 'delay-200', 'delay-0', 'delay-100', 'delay-200'];

export default function DepartmentsSection() {
  const { ref: titleRef, inView: titleInView } = useInView();
  const { ref: gridRef, inView: gridInView } = useInView();

  const scrollToBooking = () => {
    const el = document.querySelector('#book-appointment');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={titleRef}
          className={`text-center mb-14 animate-on-scroll ${titleInView ? 'in-view' : ''}`}
        >
          <span className="inline-block px-4 py-1.5 bg-hospital-green/20 text-hospital-green text-sm font-semibold rounded-full mb-4">
            Our Specialties
          </span>
          <h2 className="section-title">Medical Departments</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Explore our comprehensive range of medical specialties staffed by world-class physicians.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept, i) => (
            <div
              key={dept.name}
              onClick={scrollToBooking}
              className={`p-6 rounded-2xl border ${dept.border} ${dept.bg} shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer group hover:-translate-y-2 hover:scale-[1.02] animate-on-scroll-scale ${delays[i]} ${gridInView ? 'in-view' : ''}`}
            >
              <div className={`w-16 h-16 rounded-2xl ${dept.iconBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <dept.icon className={`w-8 h-8 ${dept.color}`} />
              </div>
              <h3 className="text-xl font-bold text-hospital-navy mb-2">{dept.name}</h3>
              <p className="text-sm text-hospital-gray-dark leading-relaxed mb-4">{dept.description}</p>
              <div className="flex items-center justify-between">
                <span className={`text-sm font-semibold ${dept.color}`}>{dept.patients} patients</span>
                <span className={`text-xs font-medium ${dept.color} bg-white px-3 py-1 rounded-full shadow-xs group-hover:shadow-soft transition-shadow`}>
                  Book Now →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
