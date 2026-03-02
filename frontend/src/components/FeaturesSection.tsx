import React from 'react';
import { Clock, UserCheck, FileText, CalendarCheck } from 'lucide-react';
import { useInView } from '../lib/useInView';

const features = [
  {
    icon: Clock,
    title: '24/7 Emergency Support',
    description: 'Round-the-clock emergency medical care with rapid response teams always ready to assist.',
    color: 'text-hospital-red',
    bg: 'bg-red-50',
    border: 'border-red-100',
  },
  {
    icon: UserCheck,
    title: 'Experienced Doctors',
    description: 'Our team of 50+ board-certified specialists brings decades of expertise across all medical fields.',
    color: 'text-hospital-blue',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
  },
  {
    icon: FileText,
    title: 'Online Reports',
    description: 'Access your medical reports, test results, and health records securely from anywhere, anytime.',
    color: 'text-hospital-green',
    bg: 'bg-green-50',
    border: 'border-green-100',
  },
  {
    icon: CalendarCheck,
    title: 'Easy Appointment Booking',
    description: 'Book, reschedule, or cancel appointments in seconds with our intuitive online booking system.',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-100',
  },
];

const delays = ['delay-0', 'delay-100', 'delay-200', 'delay-300'];

export default function FeaturesSection() {
  const { ref: titleRef, inView: titleInView } = useInView();
  const { ref: gridRef, inView: gridInView } = useInView();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={titleRef}
          className={`text-center mb-14 animate-on-scroll ${titleInView ? 'in-view' : ''}`}
        >
          <span className="inline-block px-4 py-1.5 bg-hospital-blue/10 text-hospital-blue text-sm font-semibold rounded-full mb-4">
            Why Choose Us
          </span>
          <h2 className="section-title">World-Class Healthcare Features</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            We combine medical excellence with modern technology to deliver the best patient experience.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className={`p-6 rounded-2xl border ${feature.border} ${feature.bg} shadow-card hover:shadow-card-hover transition-all duration-300 cursor-default hover:-translate-y-1.5 animate-on-scroll ${delays[i]} ${gridInView ? 'in-view' : ''}`}
            >
              <div className="w-14 h-14 rounded-2xl bg-white shadow-soft flex items-center justify-center mb-5">
                <feature.icon className={`w-7 h-7 ${feature.color}`} />
              </div>
              <h3 className="text-lg font-bold text-hospital-navy mb-3">{feature.title}</h3>
              <p className="text-sm text-hospital-gray-dark leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
