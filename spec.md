# Specification

## Summary
**Goal:** Build a full-featured Care Hospital appointment booking website with a Motoko backend for storing appointments.

**Planned changes:**
- Sticky glassmorphism header with Care Hospital logo, 6 nav links, Login/Register/Emergency buttons, and mobile hamburger drawer
- Animated hero section with headline "Your Health, Our Priority", two CTA buttons, and a doctor/hospital illustration on the right
- Doctors section with a responsive 3-column grid of at least 6 doctor cards (photo, name, specialization, experience, star rating, Book Now button)
- Departments section with 6 animated hover cards (Cardiology, Neurology, Orthopedics, Pediatrics, Dermatology, General Medicine) with icons
- Appointment booking form (Patient Name, Email, Phone, Doctor, Department, Date, Time Slot) with client-side validation, success message, and backend persistence
- Features section with 4 scroll-animated cards (24/7 Emergency Support, Experienced Doctors, Online Reports, Easy Appointment Booking)
- Contact section with Google Maps static iframe, contact details, and a quick Name/Email/Message form
- Professional multi-column dark-blue footer with 4 columns, social media icons, and copyright bottom bar
- Consistent medical theme: white/blue/light green palette, Poppins or Inter font, soft shadows, rounded cards, smooth hover effects, mobile-first responsive layout
- Motoko backend actor with `submitAppointment`, `getAppointments`, and `getAppointmentsByEmail` functions using stable storage

**User-visible outcome:** Users can browse doctors and departments, book appointments via a validated form (stored on-chain), view contact info with a map, and navigate a polished hospital website on any device.
