import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import type { UserProfile } from '../backend';

interface HeaderProps {
  userProfile: UserProfile | null;
}

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#features' },
  { label: 'Doctors', href: '#doctors' },
  { label: 'Departments', href: '#departments' },
  { label: 'Book Appointment', href: '#book-appointment' },
  { label: 'Contact', href: '#contact' },
];

export default function Header({ userProfile }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const closeDrawer = () => {
    setClosing(true);
    setTimeout(() => {
      setMobileOpen(false);
      setClosing(false);
    }, 250);
  };

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (error: unknown) {
        const err = error as Error;
        if (err?.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  const scrollTo = (href: string) => {
    closeDrawer();
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, mobileOpen ? 260 : 0);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass-nav shadow-soft' : 'bg-white/70 backdrop-blur-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <img
                src="/assets/generated/care-hospital-logo.dim_128x128.png"
                alt="Care Hospital Logo"
                className="w-10 h-10 lg:w-12 lg:h-12 rounded-full object-cover shadow-soft"
              />
              <div>
                <span className="text-lg lg:text-xl font-bold text-hospital-blue leading-tight block">
                  CARE HOSPITAL
                </span>
                <span className="text-xs text-hospital-gray-dark hidden sm:block">
                  Appointment Booking System
                </span>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-hospital-blue rounded-lg hover:bg-hospital-blue-light/50 transition-all duration-200"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Desktop Buttons */}
            <div className="hidden lg:flex items-center gap-2">
              {isAuthenticated && userProfile ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-hospital-blue-light/60 rounded-full">
                    <div className="w-7 h-7 rounded-full bg-hospital-blue flex items-center justify-center text-white text-xs font-bold">
                      {userProfile.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-hospital-blue">{userProfile.name}</span>
                  </div>
                  <button
                    onClick={handleAuth}
                    className="px-4 py-2 text-sm font-medium text-hospital-gray-dark border border-border rounded-lg hover:bg-muted transition-all"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={handleAuth}
                    disabled={isLoggingIn}
                    className="px-4 py-2 text-sm font-medium text-hospital-blue border border-hospital-blue rounded-lg hover:bg-hospital-blue hover:text-white transition-all duration-200 disabled:opacity-50"
                  >
                    {isLoggingIn ? 'Logging in...' : 'Login'}
                  </button>
                  <button
                    onClick={handleAuth}
                    disabled={isLoggingIn}
                    className="px-4 py-2 text-sm font-medium bg-hospital-blue text-white rounded-lg hover:bg-hospital-blue-dark transition-all duration-200 disabled:opacity-50"
                  >
                    Register
                  </button>
                </>
              )}
              <button
                onClick={() => scrollTo('#contact')}
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold bg-hospital-red text-white rounded-lg hover:bg-hospital-red-dark transition-all duration-200 shadow-sm"
              >
                <Phone className="w-3.5 h-3.5" />
                Emergency
              </button>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6 text-foreground" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <>
          {/* Overlay */}
          <div
            className={`fixed inset-0 bg-black/40 z-50 lg:hidden ${closing ? 'overlay-fade-out' : 'overlay-fade-in'}`}
            onClick={closeDrawer}
          />
          {/* Drawer panel */}
          <div
            className={`fixed top-0 right-0 bottom-0 w-80 bg-white z-50 lg:hidden shadow-soft-xl flex flex-col ${closing ? 'drawer-slide-out' : 'drawer-slide-in'}`}
          >
            <div className="flex items-center justify-between p-5 border-b border-border">
              <div className="flex items-center gap-2">
                <img
                  src="/assets/generated/care-hospital-logo.dim_128x128.png"
                  alt="Logo"
                  className="w-9 h-9 rounded-full object-cover"
                />
                <span className="font-bold text-hospital-blue">CARE HOSPITAL</span>
              </div>
              <button
                onClick={closeDrawer}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 p-5 space-y-1 overflow-y-auto">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className="w-full text-left px-4 py-3 text-base font-medium text-foreground hover:text-hospital-blue hover:bg-hospital-blue-light/40 rounded-xl transition-all"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            <div className="p-5 border-t border-border space-y-3">
              {isAuthenticated && userProfile ? (
                <>
                  <div className="flex items-center gap-2 px-4 py-2 bg-hospital-blue-light/60 rounded-xl">
                    <div className="w-8 h-8 rounded-full bg-hospital-blue flex items-center justify-center text-white text-sm font-bold">
                      {userProfile.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium text-hospital-blue">{userProfile.name}</span>
                  </div>
                  <button
                    onClick={handleAuth}
                    className="w-full py-3 text-sm font-medium text-hospital-gray-dark border border-border rounded-xl hover:bg-muted transition-all"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={handleAuth}
                  disabled={isLoggingIn}
                  className="w-full py-3 text-sm font-medium text-hospital-blue border-2 border-hospital-blue rounded-xl hover:bg-hospital-blue hover:text-white transition-all disabled:opacity-50"
                >
                  {isLoggingIn ? 'Logging in...' : 'Login / Register'}
                </button>
              )}
              <button
                onClick={() => scrollTo('#contact')}
                className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold bg-hospital-red text-white rounded-xl hover:bg-hospital-red-dark transition-all"
              >
                <Phone className="w-4 h-4" />
                Emergency
              </button>
            </div>
          </div>
        </>
      )}

      {/* Spacer */}
      <div className="h-16 lg:h-20" />
    </>
  );
}
