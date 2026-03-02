import React from 'react';
import { MapPin, Phone, Mail, Clock, Heart } from 'lucide-react';
import { SiFacebook, SiInstagram, SiX, SiLinkedin } from 'react-icons/si';

const aboutLinks = ['About Us', 'Our Services', 'Careers', 'Blog'];
const quickLinks = [
  { label: 'Book Appointment', href: '#book-appointment' },
  { label: 'Find Doctor', href: '#doctors' },
  { label: 'Departments', href: '#departments' },
  { label: 'Emergency', href: '#contact' },
];

const contactDetails = [
  { icon: MapPin, text: '123 Healthcare Avenue, Medical District, New York, NY 10001' },
  { icon: Phone, text: '+1 (800) CARE-123' },
  { icon: Mail, text: 'appointments@carehospital.com' },
  { icon: Clock, text: 'Mon–Fri: 8AM–8PM | Sat–Sun: 9AM–5PM' },
];

const socialLinks = [
  { icon: SiFacebook, label: 'Facebook', href: '#' },
  { icon: SiInstagram, label: 'Instagram', href: '#' },
  { icon: SiX, label: 'Twitter / X', href: '#' },
  { icon: SiLinkedin, label: 'LinkedIn', href: '#' },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const appId = typeof window !== 'undefined' ? encodeURIComponent(window.location.hostname) : 'care-hospital';
  const caffeineUrl = `https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`;

  return (
    <footer className="bg-hospital-navy text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: About Hospital */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img
                src="/assets/generated/care-hospital-logo.dim_128x128.png"
                alt="Care Hospital"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <div className="font-bold text-lg leading-tight">CARE HOSPITAL</div>
                <div className="text-xs text-white/60">Your Health, Our Priority</div>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Providing world-class healthcare with compassion and excellence since 2009. Your trusted partner in health and wellness.
            </p>
            <div className="space-y-2">
              {aboutLinks.map((link) => (
                <button
                  key={link}
                  className="block text-sm text-white/70 hover:text-white transition-colors hover:translate-x-1 transform duration-200"
                >
                  {link}
                </button>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-base font-bold mb-5 text-white">Quick Links</h3>
            <div className="space-y-3">
              {quickLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-hospital-green group-hover:bg-white transition-colors" />
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-base font-bold mb-5 text-white">Contact Info</h3>
            <div className="space-y-4">
              {contactDetails.map((item) => (
                <div key={item.text} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <item.icon className="w-4 h-4 text-hospital-green" />
                  </div>
                  <span className="text-sm text-white/70 leading-snug">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 4: Social Media */}
          <div>
            <h3 className="text-base font-bold mb-5 text-white">Follow Us</h3>
            <p className="text-sm text-white/70 mb-5 leading-relaxed">
              Stay connected for health tips, news, and updates from our medical team.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex items-center gap-2.5 px-3 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-200 group"
                >
                  <social.icon className="w-4 h-4 text-white/80 group-hover:text-white" />
                  <span className="text-xs text-white/70 group-hover:text-white">{social.label}</span>
                </a>
              ))}
            </div>

            {/* Emergency CTA */}
            <div className="mt-6 p-4 bg-hospital-red/20 border border-hospital-red/30 rounded-2xl">
              <div className="text-sm font-bold text-white mb-1">🚨 Emergency?</div>
              <div className="text-xs text-white/80">Call us immediately:</div>
              <div className="text-base font-bold text-hospital-green mt-1">+1 (800) 911-CARE</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-white/60 text-center sm:text-left">
              © {new Date().getFullYear()} CARE HOSPITAL. All Rights Reserved.
            </div>
            <div className="flex items-center gap-4 text-sm text-white/60">
              <button className="hover:text-white transition-colors">Privacy Policy</button>
              <span className="text-white/30">|</span>
              <button className="hover:text-white transition-colors">Terms & Conditions</button>
            </div>
            <div className="text-sm text-white/50 flex items-center gap-1">
              Built with <Heart className="w-3.5 h-3.5 text-hospital-red fill-hospital-red mx-0.5" /> using{' '}
              <a
                href={caffeineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-hospital-green hover:text-white transition-colors font-medium"
              >
                caffeine.ai
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
