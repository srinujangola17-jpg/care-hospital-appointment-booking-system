import React from 'react';
import { Calendar, ChevronRight, Stethoscope, Users, Award } from 'lucide-react';

const stats = [
  { icon: Users, value: '10,000+', label: 'Patients Served' },
  { icon: Stethoscope, value: '50+', label: 'Expert Doctors' },
  { icon: Award, value: '15+', label: 'Years of Excellence' },
];

export default function HeroSection() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[calc(100vh-5rem)] hero-gradient overflow-hidden flex items-center">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-hospital-blue/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-hospital-green/8 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-hospital-blue/3 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            <div className="hero-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-hospital-blue/10 rounded-full mb-6">
                <div className="w-2 h-2 rounded-full bg-hospital-green animate-pulse-soft" />
                <span className="text-sm font-medium text-hospital-blue">Trusted Healthcare Provider</span>
              </div>
            </div>

            <h1 className="hero-fade-in-delay-1 text-4xl sm:text-5xl lg:text-6xl font-bold text-hospital-navy leading-tight mb-6">
              Your Health,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-hospital-blue to-hospital-green">
                Our Priority
              </span>
            </h1>

            <p className="hero-fade-in-delay-2 text-lg text-hospital-gray-dark mb-8 leading-relaxed max-w-lg">
              Book appointments with top doctors instantly. Experience world-class healthcare with compassionate care and cutting-edge medical technology.
            </p>

            <div className="hero-fade-in-delay-3 flex flex-col sm:flex-row gap-4 mb-12">
              <button
                onClick={() => scrollTo('#book-appointment')}
                className="btn-primary flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold text-base shadow-soft-lg"
              >
                <Calendar className="w-5 h-5" />
                Book Appointment
              </button>
              <button
                onClick={() => scrollTo('#doctors')}
                className="btn-secondary flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold text-base"
              >
                View Doctors
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Stats */}
            <div className="hero-fade-in-delay-4 grid grid-cols-3 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center p-3 bg-white/60 rounded-2xl shadow-card backdrop-blur-sm">
                  <stat.icon className="w-5 h-5 text-hospital-blue mx-auto mb-1" />
                  <div className="text-xl font-bold text-hospital-navy">{stat.value}</div>
                  <div className="text-xs text-hospital-gray-dark">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Illustration */}
          <div className="hero-slide-right order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Decorative ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-hospital-blue/10 to-hospital-green/10 scale-110 blur-xl" />
              <div className="relative animate-float">
                <img
                  src="/assets/generated/hero-doctor.dim_600x500.png"
                  alt="Doctor illustration"
                  className="w-full max-w-sm lg:max-w-lg xl:max-w-xl object-contain drop-shadow-2xl"
                />
              </div>

              {/* Floating badge 1 */}
              <div className="hero-badge-pop absolute top-8 -left-4 bg-white rounded-2xl shadow-soft-lg p-3 flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-hospital-green/20 flex items-center justify-center">
                  <Stethoscope className="w-5 h-5 text-hospital-green" />
                </div>
                <div>
                  <div className="text-xs text-hospital-gray-dark">Available Now</div>
                  <div className="text-sm font-semibold text-hospital-navy">50+ Doctors</div>
                </div>
              </div>

              {/* Floating badge 2 */}
              <div className="hero-badge-pop-2 absolute bottom-12 -right-4 bg-white rounded-2xl shadow-soft-lg p-3">
                <div className="text-xs text-hospital-gray-dark mb-1">Patient Satisfaction</div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <div key={s} className="w-3 h-3 rounded-full bg-yellow-400" />
                  ))}
                  <span className="text-sm font-bold text-hospital-navy ml-1">4.9</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
