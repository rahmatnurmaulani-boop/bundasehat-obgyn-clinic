import React from "react";
import { Routes, Route } from "react-router-dom";

// Layouts
import PublicLayout from "../layouts/PublicLayout";
import AuthLayout from "../layouts/AuthLayout";
import PatientLayout from "../layouts/PatientLayout";
import AdminLayout from "../layouts/AdminLayout";

// Public Pages
import HomePage from "../pages/public/HomePage";
import AboutPage from "../pages/public/AboutPage";
import DoctorsPage from "../pages/public/DoctorsPage";
import ServicesPage from "../pages/public/ServicesPage";
import ArticlesPage from "../pages/public/ArticlesPage";
import FAQPage from "../pages/public/FAQPage";
import ContactPage from "../pages/public/ContactPage";
import NotFoundPage from "../pages/NotFoundPage";

// Auth Pages
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

// Booking Pages
import BookingPage from "../pages/booking/BookingPage";
import BookingSuccessPage from "../pages/booking/BookingSuccessPage";

// Patient Dashboard Pages
import PatientDashboardPage from "../pages/patient/PatientDashboardPage";
import PatientProfilePage from "../pages/patient/PatientProfilePage";

// Admin Dashboard Pages 
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import AdminBookingsPage from "../pages/admin/AdminBookingsPage";
import AdminServicesPage from "../pages/admin/AdminServicesPage";
import AdminSchedulesPage from "../pages/admin/AdminSchedulesPage";
import AdminDoctorsPage from "../pages/admin/AdminDoctorsPage";

// Protected Route Guard
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* 1. Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/doctors" element={<DoctorsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/booking/success" element={<BookingSuccessPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* 2. Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* 3. Patient Dashboard (Protected) */}
      <Route element={<ProtectedRoute allowedRoles={["customer", "admin"]} />}>
        <Route path="/patient" element={<PatientLayout />}>
          <Route path="appointments" element={<PatientDashboardPage />} />
          <Route path="profile" element={<PatientProfilePage />} />
        </Route>
      </Route>

      {/* 4. Admin Dashboard (Protected - PHASE 7) */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="overview" element={<AdminDashboardPage />} />
          <Route path="appointments" element={<AdminBookingsPage />} />
          <Route path="services" element={<AdminServicesPage />} />
          <Route path="schedules" element={<AdminSchedulesPage />} />
          <Route path="doctors" element={<AdminDoctorsPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
