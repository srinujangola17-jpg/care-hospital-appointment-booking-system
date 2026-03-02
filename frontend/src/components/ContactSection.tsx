import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { useInView } from '../lib/useInView';

const contactInfo = [
  {
    icon: MapPin,
    label: 'Address',
    value: '123 Healthcare Avenue, Medical District, New York, NY 10001',
    color: 'text-hospital-blue',
    bg: 'bg-blue-50',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+1 (800) CARE-123 | Emergency: +1 (800) 911-CARE',
    color: 'text-hospital-green',
    bg: 'bg-green-50',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'appointments@carehospital.com',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
  },
  {
    icon: Clock,
    label: 'Working Hours',
    value: 'Mon–Fri: 8:00 AM – 8:00 PM | Sat–Sun: 9:00 AM – 5:00 PM',
    color: 'text-orange-500',
    bg: 'bg-orange-50',
  },
];

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [sent, setSent] = useState(false);
  const { ref: titleRef, inView: titleInView } = useInView();
  const { ref: leftRef, inView: leftInView } = useInView();
  const { ref: rightRef, inView: rightInView } = useInView();

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!form.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSent(true);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={titleRef}
          className={`text-center mb-14 animate-on-scroll ${titleInView ? 'in-view' : ''}`}
        >
          <span className="inline-block px-4 py-1.5 bg-hospital-blue/10 text-hospital-blue text-sm font-semibold rounded-full mb-4">
            Get In Touch
          </span>
          <h2 className="section-title">Contact Us</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Have questions? We're here to help. Reach out to our team anytime.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left: Map + Contact Info */}
          <div
            ref={leftRef}
            className={`space-y-6 animate-on-scroll-left ${leftInView ? 'in-view' : ''}`}
          >
            {/* Map */}
            <div className="rounded-2xl overflow-hidden shadow-card h-64">
              <iframe
                title="Care Hospital Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215573291865!2d-73.98784368459418!3d40.75797597932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map((info) => (
                <div key={info.label} className={`p-4 rounded-2xl ${info.bg} flex items-start gap-3`}>
                  <div className="w-10 h-10 rounded-xl bg-white shadow-xs flex items-center justify-center flex-shrink-0">
                    <info.icon className={`w-5 h-5 ${info.color}`} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-hospital-gray-dark mb-0.5">{info.label}</div>
                    <div className="text-sm text-hospital-navy leading-snug">{info.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Contact Form */}
          <div
            ref={rightRef}
            className={`bg-hospital-gray rounded-3xl p-8 animate-on-scroll-right ${rightInView ? 'in-view' : ''}`}
          >
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-20 h-20 rounded-full bg-hospital-green/10 flex items-center justify-center mb-5">
                  <CheckCircle className="w-10 h-10 text-hospital-green" />
                </div>
                <h3 className="text-xl font-bold text-hospital-navy mb-2">Message Sent!</h3>
                <p className="text-hospital-gray-dark mb-6">We'll get back to you within 24 hours.</p>
                <button
                  onClick={() => setSent(false)}
                  className="btn-primary px-6 py-2.5 rounded-xl font-medium text-sm"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold text-hospital-navy mb-6">Send Us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-hospital-navy mb-2">Your Name</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                      placeholder="John Doe"
                      className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-hospital-red bg-red-50' : 'border-border bg-white'} focus:outline-none focus:ring-2 focus:ring-hospital-blue/30 focus:border-hospital-blue transition-all text-sm`}
                    />
                    {errors.name && <p className="mt-1 text-xs text-hospital-red">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-hospital-navy mb-2">Email Address</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                      placeholder="your@email.com"
                      className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-hospital-red bg-red-50' : 'border-border bg-white'} focus:outline-none focus:ring-2 focus:ring-hospital-blue/30 focus:border-hospital-blue transition-all text-sm`}
                    />
                    {errors.email && <p className="mt-1 text-xs text-hospital-red">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-hospital-navy mb-2">Message</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                      placeholder="How can we help you?"
                      rows={5}
                      className={`w-full px-4 py-3 rounded-xl border ${errors.message ? 'border-hospital-red bg-red-50' : 'border-border bg-white'} focus:outline-none focus:ring-2 focus:ring-hospital-blue/30 focus:border-hospital-blue transition-all text-sm resize-none`}
                    />
                    {errors.message && <p className="mt-1 text-xs text-hospital-red">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-primary py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
