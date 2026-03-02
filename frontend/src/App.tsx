import React, { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import DoctorsSection from './components/DoctorsSection';
import DepartmentsSection from './components/DepartmentsSection';
import BookingSection from './components/BookingSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ProfileSetupModal from './components/ProfileSetupModal';
import { Toaster } from '@/components/ui/sonner';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useGetCallerUserProfile } from './hooks/useGetCallerUserProfile';

function AppContent() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  React.useEffect(() => {
    if (showProfileSetup) {
      setProfileModalOpen(true);
    } else if (!isAuthenticated) {
      setProfileModalOpen(false);
    }
  }, [showProfileSetup, isAuthenticated]);

  return (
    <div className="min-h-screen bg-background font-poppins overflow-x-hidden">
      <Header userProfile={userProfile ?? null} />
      <main>
        <section id="home">
          <HeroSection />
        </section>
        <section id="features">
          <FeaturesSection />
        </section>
        <section id="doctors">
          <DoctorsSection />
        </section>
        <section id="departments">
          <DepartmentsSection />
        </section>
        <section id="book-appointment">
          <BookingSection />
        </section>
        <section id="contact">
          <ContactSection />
        </section>
      </main>
      <Footer />
      <ProfileSetupModal
        open={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
      />
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default function App() {
  return <AppContent />;
}
