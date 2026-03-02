import React, { useState } from 'react';
import { User, Mail, CheckCircle, X } from 'lucide-react';
import { useSaveCallerUserProfile } from '../hooks/useQueries';
import { toast } from 'sonner';

interface ProfileSetupModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ProfileSetupModal({ open, onClose }: ProfileSetupModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const { mutateAsync: saveProfile, isPending } = useSaveCallerUserProfile();

  if (!open) return null;

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await saveProfile({ name: name.trim(), email: email.trim() });
      toast.success('Profile saved successfully!');
      onClose();
    } catch {
      toast.error('Failed to save profile. Please try again.');
    }
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 modal-overlay-in" />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="modal-scale-in bg-white rounded-3xl shadow-soft-xl w-full max-w-md overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-br from-hospital-blue to-hospital-green p-8 text-white text-center relative">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-1">Welcome to CARE HOSPITAL</h2>
            <p className="text-white/80 text-sm">Please complete your profile to continue</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-5">
            <div>
              <label className="block text-sm font-semibold text-hospital-navy mb-2">
                Full Name <span className="text-hospital-red">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-hospital-gray-dark" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((p) => ({ ...p, name: undefined }));
                  }}
                  placeholder="Enter your full name"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border ${errors.name ? 'border-hospital-red bg-red-50' : 'border-border'} focus:outline-none focus:ring-2 focus:ring-hospital-blue/30 focus:border-hospital-blue transition-all text-sm`}
                />
              </div>
              {errors.name && <p className="mt-1.5 text-xs text-hospital-red">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-hospital-navy mb-2">
                Email Address <span className="text-hospital-red">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-hospital-gray-dark" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
                  }}
                  placeholder="your@email.com"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border ${errors.email ? 'border-hospital-red bg-red-50' : 'border-border'} focus:outline-none focus:ring-2 focus:ring-hospital-blue/30 focus:border-hospital-blue transition-all text-sm`}
                />
              </div>
              {errors.email && <p className="mt-1.5 text-xs text-hospital-red">{errors.email}</p>}
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full btn-primary py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {isPending ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Complete Setup
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
