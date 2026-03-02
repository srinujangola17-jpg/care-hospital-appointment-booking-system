import React from 'react';
import { Star, Clock, Award } from 'lucide-react';

export interface Doctor {
  id: number;
  name: string;
  specialization: string;
  experience: number;
  rating: number;
  reviews: number;
  image: string;
  available: boolean;
}

interface DoctorCardProps {
  doctor: Doctor;
  onBookNow: (doctor: Doctor) => void;
}

export default function DoctorCard({ doctor, onBookNow }: DoctorCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden group hover:-translate-y-1.5">
      {/* Image */}
      <div className="relative h-52 bg-gradient-to-br from-hospital-blue-light to-hospital-green-light overflow-hidden">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&background=3b82f6&color=fff&size=200`;
          }}
        />
        {doctor.available && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full">
            <div className="w-2 h-2 rounded-full bg-hospital-green animate-pulse-soft" />
            <span className="text-xs font-medium text-hospital-green">Available</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-hospital-navy mb-1">{doctor.name}</h3>
        <p className="text-hospital-blue text-sm font-medium mb-3">{doctor.specialization}</p>

        <div className="flex items-center gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-4 h-4 ${star <= Math.floor(doctor.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'}`}
            />
          ))}
          <span className="text-sm font-semibold text-hospital-navy ml-1">{doctor.rating}</span>
          <span className="text-xs text-hospital-gray-dark">({doctor.reviews})</span>
        </div>

        <div className="flex items-center gap-4 mb-5 text-xs text-hospital-gray-dark">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-hospital-blue" />
            <span>{doctor.experience} yrs exp</span>
          </div>
          <div className="flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-hospital-green" />
            <span>Certified</span>
          </div>
        </div>

        <button
          onClick={() => onBookNow(doctor)}
          className="w-full py-2.5 bg-hospital-blue text-white text-sm font-semibold rounded-xl hover:bg-hospital-blue-dark transition-all duration-200 hover:shadow-soft"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}
