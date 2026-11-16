package com.timenest.config;

import com.timenest.entity.*;
import com.timenest.repository.AppointmentRepository;
import com.timenest.repository.ServiceCategoryRepository;
import com.timenest.repository.ServiceProviderRepository;
import com.timenest.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final ServiceCategoryRepository categoryRepository;
    private final ServiceProviderRepository providerRepository;
    private final AppointmentRepository appointmentRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository,
                           ServiceCategoryRepository categoryRepository,
                           ServiceProviderRepository providerRepository,
                           AppointmentRepository appointmentRepository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.providerRepository = providerRepository;
        this.appointmentRepository = appointmentRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (categoryRepository.count() > 0) {
            return; // Data already initialized
        }

        System.out.println(">>> Initializing TimeNest sample database...");

        // 1. Initialize Users
        User admin = new User();
        admin.setFullName("Platform Administrator");
        admin.setEmail("admin@timenest.com");
        admin.setPassword(passwordEncoder.encode("admin123"));
        admin.setPhone("+91 98765 43210");
        admin.setRole(Role.ROLE_ADMIN);
        admin.setAccountType("Enterprise");
        admin.setCreatedAt(LocalDateTime.now().minusMonths(6));
        admin.setLastLogin(LocalDateTime.now());
        userRepository.save(admin);

        User demoUser = new User();
        demoUser.setFullName("John Doe");
        demoUser.setEmail("user@timenest.com");
        demoUser.setPassword(passwordEncoder.encode("user123"));
        demoUser.setPhone("+91 91234 56789");
        demoUser.setRole(Role.ROLE_USER);
        demoUser.setAccountType("Premium");
        demoUser.setCreatedAt(LocalDateTime.now().minusMonths(2));
        demoUser.setLastLogin(LocalDateTime.now());
        userRepository.save(demoUser);

        // 2. Initialize Service Categories
        ServiceCategory doctorCat = categoryRepository.save(
                new ServiceCategory("doctor", "Doctors", "Health & Wellness", "⚕️", 1));
        ServiceCategory salonCat = categoryRepository.save(
                new ServiceCategory("salon", "Salons", "Beauty & Grooming", "💇", 2));
        ServiceCategory counselorCat = categoryRepository.save(
                new ServiceCategory("counselor", "Career Counselors", "Professional Guidance", "🧑‍💼", 3));
        ServiceCategory lawyerCat = categoryRepository.save(
                new ServiceCategory("lawyer", "Lawyers", "Legal Assistance", "⚖️", 4));
        ServiceCategory advisorCat = categoryRepository.save(
                new ServiceCategory("advisor", "Financial Advisors", "Wealth Management", "💰", 5));
        ServiceCategory accountantCat = categoryRepository.save(
                new ServiceCategory("accountant", "Chartered Accountants", "Finance & Taxation", "🧾", 6));

        // 3. Initialize Service Providers
        // Doctors
        ServiceProvider d1 = providerRepository.save(new ServiceProvider(
                "Dr. Priya Sharma", doctorCat, "chennai", "Chennai",
                "Apollo Hospitals, Greams Road", "19, Greams Road, Thousand Lights, Chennai",
                "+91 44 2829 0200", "dr.priyasharma@apollo.com",
                4.9, 128, "10:00 AM - 1:00 PM, 3:00 PM - 6:00 PM", "₹800 - ₹1,200",
                "Senior Cardiologist with 15+ years of experience in preventive cardiology."));

        ServiceProvider d2 = providerRepository.save(new ServiceProvider(
                "Dr. Karthik Reddy", doctorCat, "chennai", "Chennai",
                "Fortis Malar Hospital, Adyar", "52, First Main Road, Gandhi Nagar, Adyar, Chennai",
                "+91 44 4289 2222", "dr.karthikreddy@fortis.com",
                4.6, 94, "9:00 AM - 12:00 PM, 4:00 PM - 7:00 PM", "₹700 - ₹1,000",
                "Leading Orthopedic specialist focused on joint care and sports medicine."));

        ServiceProvider d3 = providerRepository.save(new ServiceProvider(
                "Dr. Anjali Devi", doctorCat, "karur", "Karur",
                "Lakshmi Hospital, Karur", "78, Kovai Road, Sengunthapuram, Karur",
                "+91 4324 234 567", "dr.anjalidevi@lakshmi.org",
                4.7, 82, "11:00 AM - 2:00 PM, 5:00 PM - 7:00 PM", "₹500 - ₹800",
                "Consultant Pediatrician providing dedicated child care and vaccinations."));

        ServiceProvider d4 = providerRepository.save(new ServiceProvider(
                "Dr. Sriram Kumar", doctorCat, "karur", "Karur",
                "City Clinic, Karur", "10, Old Bus Stand Road, Karur",
                "+91 4324 245 890", "dr.sriramkumar@cityclinic.in",
                3.9, 45, "9:00 AM - 1:00 PM", "₹400 - ₹600",
                "General Physician treating acute fevers, respiratory, and metabolic disorders."));

        ServiceProvider d5 = providerRepository.save(new ServiceProvider(
                "Dr. Meena Sundaram", doctorCat, "madurai", "Madurai",
                "Velammal Hospital, Madurai", "2, Anuppanadi, Ring Road, Madurai",
                "+91 452 711 3333", "dr.meena@velammal.edu",
                4.8, 115, "10:30 AM - 1:30 PM, 4:00 PM - 6:30 PM", "₹600 - ₹900",
                "Consultant Dermatologist specializing in laser treatments and skincare."));

        ServiceProvider d6 = providerRepository.save(new ServiceProvider(
                "Dr. Arvind Swamy", doctorCat, "coimbatore", "Coimbatore",
                "KG Hospital, Arts College Road", "5, Govt. Arts College Road, Coimbatore",
                "+91 422 221 2121", "dr.arvind@kghospital.com",
                4.8, 89, "9:30 AM - 1:00 PM, 5:00 PM - 8:00 PM", "₹700 - ₹1,100",
                "Senior Neurologist treating headaches, stroke recovery, and neuropathies."));

        // Salons
        ServiceProvider s1 = providerRepository.save(new ServiceProvider(
                "Toni & Guy Hair Dressing", salonCat, "chennai", "Chennai",
                "Toni & Guy Lounge, Nungambakkam", "45, Khader Nawaz Khan Road, Nungambakkam, Chennai",
                "+91 44 4350 2000", "chennai.nkk@toniandguy.in",
                4.8, 210, "10:00 AM - 8:00 PM", "₹1,000 - ₹3,500",
                "Luxury unisex salon featuring internationally certified hair stylists and aesthetic spa."));

        ServiceProvider s2 = providerRepository.save(new ServiceProvider(
                "Naturals Salon & Spa", salonCat, "karur", "Karur",
                "Naturals Beauty Salon, Karur", "12, 80 Feet Road, Sengunthapuram, Karur",
                "+91 4324 223 344", "karur@naturals.in",
                4.6, 76, "9:30 AM - 8:30 PM", "₹400 - ₹1,500",
                "Leading Indian unisex salon providing hair styling, facial care, and bridal makeup."));

        ServiceProvider s3 = providerRepository.save(new ServiceProvider(
                "Green Trends Unisex Salon", salonCat, "madurai", "Madurai",
                "Green Trends, KK Nagar", "15, East 9th Cross Street, KK Nagar, Madurai",
                "+91 452 422 5566", "madurai@mygreentrends.in",
                4.5, 98, "10:00 AM - 8:00 PM", "₹500 - ₹2,000",
                "Affordable luxury hair grooming, spa rituals, and styling for all ages."));

        // Career Counselors
        providerRepository.save(new ServiceProvider(
                "Rajesh Menon", counselorCat, "chennai", "Chennai",
                "Global Career Edge Academy", "8th Floor, Anna Salai Commercial Complex, Chennai",
                "+91 94440 12345", "rajesh.menon@careeredge.in",
                4.9, 134, "10:00 AM - 5:00 PM", "₹1,500 - ₹3,000",
                "Certified career mentor specializing in study abroad, MBA admissions, and tech career pivots."));

        providerRepository.save(new ServiceProvider(
                "Deepa Krishnan", counselorCat, "karur", "Karur",
                "NextGen Student Mentors", "34, Jawahar Bazaar, Karur",
                "+91 94432 98765", "deepa.mentors@nextgen.org",
                4.7, 48, "11:00 AM - 4:00 PM", "₹800 - ₹1,500",
                "Specialized counseling for higher secondary students, engineering, and medical stream selection."));

        // Lawyers
        providerRepository.save(new ServiceProvider(
                "Adv. Ramesh Sundaram", lawyerCat, "chennai", "Chennai",
                "Sundaram & Partners Legal Chambers", "High Court Chambers, Parrys, Chennai",
                "+91 44 2534 8899", "ramesh@sundaramlaw.com",
                4.9, 87, "2:00 PM - 7:00 PM", "₹2,000 - ₹5,000",
                "Senior Advocate practicing civil litigations, property disputes, and commercial arbitration."));

        providerRepository.save(new ServiceProvider(
                "Adv. Vijayalakshmi Natarajan", lawyerCat, "karur", "Karur",
                "District Court Legal Consultancy", "Near District Court Complex, Karur",
                "+91 4324 267 112", "viji.advocate@karurlaw.in",
                4.6, 39, "10:00 AM - 2:00 PM, 5:00 PM - 7:30 PM", "₹1,000 - ₹2,500",
                "Expert in family law, title deed verifications, and civil contracts."));

        // Financial Advisors
        providerRepository.save(new ServiceProvider(
                "WealthWise Financial Planners", advisorCat, "chennai", "Chennai",
                "WealthWise Advisory Services", "24, OMR Road, Tidel Park Area, Chennai",
                "+91 44 6677 8899", "contact@wealthwise.co.in",
                4.8, 112, "10:00 AM - 6:00 PM", "₹1,500 - ₹4,000",
                "SEBI Registered Investment Advisors specializing in retirement planning, mutual funds, and portfolio rebalancing."));

        providerRepository.save(new ServiceProvider(
                "Prosperity Wealth Consultants", advisorCat, "karur", "Karur",
                "Prosperity Financial Office", "42, Covai Main Road, Karur",
                "+91 4324 278 990", "info@prosperitykarur.com",
                4.7, 52, "9:30 AM - 5:30 PM", "₹1,000 - ₹2,500",
                "Personalized wealth creation, insurance analysis, and tax-saving investment blueprints."));

        // Chartered Accountants
        providerRepository.save(new ServiceProvider(
                "K.S. & Associates Tax Consultants", accountantCat, "chennai", "Chennai",
                "K.S. Chartered Accountants", "7, Cathedral Garden Road, Nungambakkam, Chennai",
                "+91 44 2822 4455", "tax@ksassociates.in",
                4.9, 142, "10:00 AM - 6:30 PM", "₹1,200 - ₹3,500",
                "FCA certified team offering GST filings, corporate audit, income tax advisory, and company formation."));

        providerRepository.save(new ServiceProvider(
                "V. Narayanan & Co Chartered Accountants", accountantCat, "karur", "Karur",
                "Narayanan Audit House", "18, West Pradhakshanam Road, Karur",
                "+91 4324 231 100", "audit@vnarayanan.com",
                4.8, 64, "10:00 AM - 6:00 PM", "₹800 - ₹2,000",
                "Comprehensive audit, GST compliance, accounting outsourcing, and statutory filings."));

        // 4. Initialize Demo Appointments for the user
        appointmentRepository.save(new Appointment(
                demoUser, d1, LocalDate.now().plusDays(2), "10:00 AM - 1:00 PM",
                "John Doe", "user@timenest.com", "+91 91234 56789",
                "Routine heart health screening and blood pressure consultation."));

        appointmentRepository.save(new Appointment(
                demoUser, s1, LocalDate.now().plusDays(5), "2:00 PM - 3:00 PM",
                "John Doe", "user@timenest.com", "+91 91234 56789",
                "Hair styling and revitalizing scalp spa."));

        System.out.println(">>> TimeNest sample database successfully initialized!");
    }
}
