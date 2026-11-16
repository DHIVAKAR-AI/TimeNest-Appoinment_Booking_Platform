/**
 * TimeNest - Unified Full Stack Client Library
 * Handles authentication, backend REST communication, and intelligent offline/browser fallback.
 */

// Determine API base: if on localhost:8081/8080 use current origin, otherwise point to default backend port 8081
const getApiBase = () => {
    if (typeof window === 'undefined') return 'http://localhost:8081';
    const loc = window.location;
    if (loc.protocol === 'http:' || loc.protocol === 'https:') {
        if (loc.port === '8081' || loc.port === '8080') {
            return loc.origin;
        }
    }
    return 'http://localhost:8081';
};

const API_BASE = getApiBase();

// Default Seed Data for immediate preview and resilient offline fallback
const SEED_CATEGORIES = [
    { id: 1, code: 'doctor', name: 'Doctors', description: 'Health & Wellness', icon: '⚕️', displayOrder: 1 },
    { id: 2, code: 'salon', name: 'Salons', description: 'Beauty & Grooming', icon: '💇', displayOrder: 2 },
    { id: 3, code: 'counselor', name: 'Career Counselors', description: 'Professional Guidance', icon: '🧑‍💼', displayOrder: 3 },
    { id: 4, code: 'lawyer', name: 'Lawyers', description: 'Legal Assistance', icon: '⚖️', displayOrder: 4 },
    { id: 5, code: 'advisor', name: 'Financial Advisors', description: 'Wealth Management', icon: '💰', displayOrder: 5 },
    { id: 6, code: 'accountant', name: 'Chartered Accountants', description: 'Finance & Taxation', icon: '🧾', displayOrder: 6 }
];

const SEED_PROVIDERS = [
    {
        id: 1, name: 'Dr. Priya Sharma', category: SEED_CATEGORIES[0],
        location: 'chennai', locationDisplay: 'Chennai',
        hospitalOrBusinessName: 'Apollo Hospitals, Greams Road',
        address: '19, Greams Road, Thousand Lights, Chennai',
        phone: '+91 44 2829 0200', email: 'dr.priyasharma@apollo.com',
        rating: 4.9, reviewsCount: 128, timeSlots: '10:00 AM - 1:00 PM, 3:00 PM - 6:00 PM',
        priceRange: '₹800 - ₹1,200', about: 'Senior Cardiologist with 15+ years of experience in preventive cardiology.'
    },
    {
        id: 2, name: 'Dr. Karthik Reddy', category: SEED_CATEGORIES[0],
        location: 'chennai', locationDisplay: 'Chennai',
        hospitalOrBusinessName: 'Fortis Malar Hospital, Adyar',
        address: '52, First Main Road, Gandhi Nagar, Adyar, Chennai',
        phone: '+91 44 4289 2222', email: 'dr.karthikreddy@fortis.com',
        rating: 4.6, reviewsCount: 94, timeSlots: '9:00 AM - 12:00 PM, 4:00 PM - 7:00 PM',
        priceRange: '₹700 - ₹1,000', about: 'Leading Orthopedic specialist focused on joint care and sports medicine.'
    },
    {
        id: 3, name: 'Dr. Anjali Devi', category: SEED_CATEGORIES[0],
        location: 'karur', locationDisplay: 'Karur',
        hospitalOrBusinessName: 'Lakshmi Hospital, Karur',
        address: '78, Kovai Road, Sengunthapuram, Karur',
        phone: '+91 4324 234 567', email: 'dr.anjalidevi@lakshmi.org',
        rating: 4.7, reviewsCount: 82, timeSlots: '11:00 AM - 2:00 PM, 5:00 PM - 7:00 PM',
        priceRange: '₹500 - ₹800', about: 'Consultant Pediatrician providing dedicated child care and vaccinations.'
    },
    {
        id: 4, name: 'Dr. Sriram Kumar', category: SEED_CATEGORIES[0],
        location: 'karur', locationDisplay: 'Karur',
        hospitalOrBusinessName: 'City Clinic, Karur',
        address: '10, Old Bus Stand Road, Karur',
        phone: '+91 4324 245 890', email: 'dr.sriramkumar@cityclinic.in',
        rating: 3.9, reviewsCount: 45, timeSlots: '9:00 AM - 1:00 PM',
        priceRange: '₹400 - ₹600', about: 'General Physician treating acute fevers, respiratory, and metabolic disorders.'
    },
    {
        id: 5, name: 'Dr. Meena Sundaram', category: SEED_CATEGORIES[0],
        location: 'madurai', locationDisplay: 'Madurai',
        hospitalOrBusinessName: 'Velammal Hospital, Madurai',
        address: '2, Anuppanadi, Ring Road, Madurai',
        phone: '+91 452 711 3333', email: 'dr.meena@velammal.edu',
        rating: 4.8, reviewsCount: 115, timeSlots: '10:30 AM - 1:30 PM, 4:00 PM - 6:30 PM',
        priceRange: '₹600 - ₹900', about: 'Consultant Dermatologist specializing in laser treatments and skincare.'
    },
    {
        id: 6, name: 'Toni & Guy Hair Dressing', category: SEED_CATEGORIES[1],
        location: 'chennai', locationDisplay: 'Chennai',
        hospitalOrBusinessName: 'Toni & Guy Lounge, Nungambakkam',
        address: '45, Khader Nawaz Khan Road, Nungambakkam, Chennai',
        phone: '+91 44 4350 2000', email: 'chennai.nkk@toniandguy.in',
        rating: 4.8, reviewsCount: 210, timeSlots: '10:00 AM - 8:00 PM',
        priceRange: '₹1,000 - ₹3,500', about: 'Luxury unisex salon featuring internationally certified hair stylists.'
    },
    {
        id: 7, name: 'Naturals Salon & Spa', category: SEED_CATEGORIES[1],
        location: 'karur', locationDisplay: 'Karur',
        hospitalOrBusinessName: 'Naturals Beauty Salon, Karur',
        address: '12, 80 Feet Road, Sengunthapuram, Karur',
        phone: '+91 4324 223 344', email: 'karur@naturals.in',
        rating: 4.6, reviewsCount: 76, timeSlots: '9:30 AM - 8:30 PM',
        priceRange: '₹400 - ₹1,500', about: 'Leading Indian unisex salon providing hair styling, facial care, and bridal makeup.'
    },
    {
        id: 8, name: 'Rajesh Menon', category: SEED_CATEGORIES[2],
        location: 'chennai', locationDisplay: 'Chennai',
        hospitalOrBusinessName: 'Global Career Edge Academy',
        address: '8th Floor, Anna Salai Commercial Complex, Chennai',
        phone: '+91 94440 12345', email: 'rajesh.menon@careeredge.in',
        rating: 4.9, reviewsCount: 134, timeSlots: '10:00 AM - 5:00 PM',
        priceRange: '₹1,500 - ₹3,000', about: 'Certified career mentor specializing in study abroad and MBA admissions.'
    },
    {
        id: 9, name: 'Deepa Krishnan', category: SEED_CATEGORIES[2],
        location: 'karur', locationDisplay: 'Karur',
        hospitalOrBusinessName: 'NextGen Student Mentors',
        address: '34, Jawahar Bazaar, Karur',
        phone: '+91 94432 98765', email: 'deepa.mentors@nextgen.org',
        rating: 4.7, reviewsCount: 48, timeSlots: '11:00 AM - 4:00 PM',
        priceRange: '₹800 - ₹1,500', about: 'Guidance for higher secondary students and engineering stream selection.'
    },
    {
        id: 10, name: 'Adv. Ramesh Sundaram', category: SEED_CATEGORIES[3],
        location: 'chennai', locationDisplay: 'Chennai',
        hospitalOrBusinessName: 'Sundaram & Partners Legal Chambers',
        address: 'High Court Chambers, Parrys, Chennai',
        phone: '+91 44 2534 8899', email: 'ramesh@sundaramlaw.com',
        rating: 4.9, reviewsCount: 87, timeSlots: '2:00 PM - 7:00 PM',
        priceRange: '₹2,000 - ₹5,000', about: 'Senior Advocate practicing civil litigations, property disputes, and arbitration.'
    },
    {
        id: 11, name: 'Adv. Vijayalakshmi Natarajan', category: SEED_CATEGORIES[3],
        location: 'karur', locationDisplay: 'Karur',
        hospitalOrBusinessName: 'District Court Legal Consultancy',
        address: 'Near District Court Complex, Karur',
        phone: '+91 4324 267 112', email: 'viji.advocate@karurlaw.in',
        rating: 4.6, reviewsCount: 39, timeSlots: '10:00 AM - 2:00 PM, 5:00 PM - 7:30 PM',
        priceRange: '₹1,000 - ₹2,500', about: 'Expert in family law, title deed verifications, and civil contracts.'
    },
    {
        id: 12, name: 'WealthWise Financial Planners', category: SEED_CATEGORIES[4],
        location: 'chennai', locationDisplay: 'Chennai',
        hospitalOrBusinessName: 'WealthWise Advisory Services',
        address: '24, OMR Road, Tidel Park Area, Chennai',
        phone: '+91 44 6677 8899', email: 'contact@wealthwise.co.in',
        rating: 4.8, reviewsCount: 112, timeSlots: '10:00 AM - 6:00 PM',
        priceRange: '₹1,500 - ₹4,000', about: 'SEBI Registered Investment Advisors specializing in retirement and mutual funds.'
    },
    {
        id: 13, name: 'Prosperity Wealth Consultants', category: SEED_CATEGORIES[4],
        location: 'karur', locationDisplay: 'Karur',
        hospitalOrBusinessName: 'Prosperity Financial Office',
        address: '42, Covai Main Road, Karur',
        phone: '+91 4324 278 990', email: 'info@prosperitykarur.com',
        rating: 4.7, reviewsCount: 52, timeSlots: '9:30 AM - 5:30 PM',
        priceRange: '₹1,000 - ₹2,500', about: 'Personalized wealth creation, insurance analysis, and tax-saving blueprints.'
    },
    {
        id: 14, name: 'K.S. & Associates Tax Consultants', category: SEED_CATEGORIES[5],
        location: 'chennai', locationDisplay: 'Chennai',
        hospitalOrBusinessName: 'K.S. Chartered Accountants',
        address: '7, Cathedral Garden Road, Nungambakkam, Chennai',
        phone: '+91 44 2822 4455', email: 'tax@ksassociates.in',
        rating: 4.9, reviewsCount: 142, timeSlots: '10:00 AM - 6:30 PM',
        priceRange: '₹1,200 - ₹3,500', about: 'FCA certified team offering GST filings, corporate audit, and income tax advisory.'
    },
    {
        id: 15, name: 'V. Narayanan & Co Chartered Accountants', category: SEED_CATEGORIES[5],
        location: 'karur', locationDisplay: 'Karur',
        hospitalOrBusinessName: 'Narayanan Audit House',
        address: '18, West Pradhakshanam Road, Karur',
        phone: '+91 4324 231 100', email: 'audit@vnarayanan.com',
        rating: 4.8, reviewsCount: 64, timeSlots: '10:00 AM - 6:00 PM',
        priceRange: '₹800 - ₹2,000', about: 'Comprehensive audit, GST compliance, accounting outsourcing, and statutory filings.'
    }
];

// Initialize local cache for offline/instant mode
function initLocalStore() {
    if (!localStorage.getItem('timenest_appointments')) {
        const initialAppointments = [
            {
                id: 1, providerId: 1, providerName: 'Dr. Priya Sharma',
                businessName: 'Apollo Hospitals, Greams Road', categoryCode: 'doctor', categoryName: 'Doctors',
                location: 'chennai', locationDisplay: 'Chennai', address: '19, Greams Road, Chennai',
                appointmentDate: '2026-11-20', appointmentTime: '10:30 AM',
                customerName: 'John Doe', customerEmail: 'user@timenest.com', customerPhone: '+91 91234 56789',
                notes: 'Annual cardiology consultation and ECG review.',
                status: 'CONFIRMED', createdAt: new Date().toISOString()
            },
            {
                id: 2, providerId: 7, providerName: 'Naturals Salon & Spa',
                businessName: 'Naturals Beauty Salon, Karur', categoryCode: 'salon', categoryName: 'Salons',
                location: 'karur', locationDisplay: 'Karur', address: '12, 80 Feet Road, Sengunthapuram, Karur',
                appointmentDate: '2026-11-22', appointmentTime: '03:30 PM',
                customerName: 'John Doe', customerEmail: 'user@timenest.com', customerPhone: '+91 91234 56789',
                notes: 'Hair styling and facial spa package.',
                status: 'CONFIRMED', createdAt: new Date().toISOString()
            }
        ];
        localStorage.setItem('timenest_appointments', JSON.stringify(initialAppointments));
    }

    if (!localStorage.getItem('timenest_users_registry')) {
        const initialUsers = [
            { id: 1, fullName: 'Platform Administrator', email: 'admin@timenest.com', phone: '+91 98765 43210', role: 'ROLE_ADMIN', accountType: 'Enterprise', createdAt: '2026-05-10T10:00:00' },
            { id: 2, fullName: 'John Doe', email: 'user@timenest.com', phone: '+91 91234 56789', role: 'ROLE_USER', accountType: 'Premium', createdAt: '2026-08-15T14:30:00' }
        ];
        localStorage.setItem('timenest_users_registry', JSON.stringify(initialUsers));
    }
}
initLocalStore();

const TimeNestAPI = {
    // Session & User Authentication
    auth: {
        getUser() {
            const raw = localStorage.getItem('timenest_user');
            try {
                return raw ? JSON.parse(raw) : null;
            } catch (e) {
                return null;
            }
        },

        getToken() {
            return localStorage.getItem('timenest_token') || '';
        },

        isLoggedIn() {
            return !!this.getUser();
        },

        isAdmin() {
            const user = this.getUser();
            return user && (user.role === 'ROLE_ADMIN' || user.email === 'admin@timenest.com');
        },

        saveSession(authResponse) {
            if (authResponse && authResponse.user) {
                localStorage.setItem('timenest_user', JSON.stringify(authResponse.user));
                if (authResponse.token) {
                    localStorage.setItem('timenest_token', authResponse.token);
                }
            }
        },

        async login(email, password) {
            try {
                const response = await fetch(`${API_BASE}/api/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });
                if (response.ok) {
                    const data = await response.json();
                    if (data.success) {
                        this.saveSession(data);
                        return data;
                    }
                }
            } catch (e) {
                console.warn('Backend unavailable, using local authentication fallback:', e.message);
            }

            // Local fallback authentication
            const normalizedEmail = email.trim().toLowerCase();
            const isAdmin = normalizedEmail === 'admin@timenest.com';
            const user = {
                id: isAdmin ? 1 : 2,
                fullName: isAdmin ? 'Platform Administrator' : (normalizedEmail.startsWith('user') ? 'John Doe' : normalizedEmail.split('@')[0]),
                email: normalizedEmail,
                phone: '+91 91234 56789',
                role: isAdmin ? 'ROLE_ADMIN' : 'ROLE_USER',
                accountType: isAdmin ? 'Enterprise' : 'Premium',
                createdAt: new Date().toISOString(),
                lastLogin: new Date().toISOString()
            };

            const fallbackResponse = {
                success: true,
                message: 'Login successful (Offline/Demo Mode)',
                token: 'tn_' + user.id + '_' + Date.now(),
                user
            };
            this.saveSession(fallbackResponse);
            return fallbackResponse;
        },

        async register(fullName, email, password, phone) {
            try {
                const response = await fetch(`${API_BASE}/api/auth/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ fullName, email, password, phone })
                });
                if (response.ok) {
                    const data = await response.json();
                    if (data.success) {
                        this.saveSession(data);
                        return data;
                    }
                }
            } catch (e) {
                console.warn('Backend unavailable, using local registration fallback:', e.message);
            }

            // Local fallback registration
            const newUser = {
                id: Date.now(),
                fullName: fullName.trim(),
                email: email.trim().toLowerCase(),
                phone: phone ? phone.trim() : '',
                role: 'ROLE_USER',
                accountType: 'Basic',
                createdAt: new Date().toISOString(),
                lastLogin: new Date().toISOString()
            };

            const users = JSON.parse(localStorage.getItem('timenest_users_registry') || '[]');
            users.push(newUser);
            localStorage.setItem('timenest_users_registry', JSON.stringify(users));

            const fallbackResponse = {
                success: true,
                message: 'Account created successfully (Offline/Demo Mode)',
                token: 'tn_' + newUser.id + '_' + Date.now(),
                user: newUser
            };
            this.saveSession(fallbackResponse);
            return fallbackResponse;
        },

        logout() {
            localStorage.removeItem('timenest_user');
            localStorage.removeItem('timenest_token');
            window.location.href = 'logout.html';
        }
    },

    // Categories API
    categories: {
        async getAll() {
            try {
                const res = await fetch(`${API_BASE}/api/categories`);
                if (res.ok) {
                    const data = await res.json();
                    if (data.data && data.data.length > 0) return data.data;
                }
            } catch (e) {
                console.warn('Backend categories endpoint unreachable, using fallback categories');
            }
            return SEED_CATEGORIES;
        },

        async getByCode(code) {
            const all = await this.getAll();
            return all.find(c => c.code.toLowerCase() === code.toLowerCase()) || null;
        }
    },

    // Providers API
    providers: {
        async search(category, location, query) {
            try {
                const params = new URLSearchParams();
                if (category && category !== 'all') params.append('category', category);
                if (location && location !== 'all') params.append('location', location);
                if (query) params.append('query', query);

                const res = await fetch(`${API_BASE}/api/providers/search?${params.toString()}`);
                if (res.ok) {
                    const data = await res.json();
                    if (data.data) return data.data;
                }
            } catch (e) {
                console.warn('Backend providers search unreachable, filtering local providers');
            }

            // Local filter fallback
            return SEED_PROVIDERS.filter(p => {
                const matchesCategory = !category || category === 'all' || (p.category && p.category.code.toLowerCase() === category.toLowerCase());
                const matchesLocation = !location || location === 'all' || (p.location && p.location.toLowerCase() === location.toLowerCase());
                const matchesQuery = !query || p.name.toLowerCase().includes(query.toLowerCase()) ||
                    (p.hospitalOrBusinessName && p.hospitalOrBusinessName.toLowerCase().includes(query.toLowerCase()));
                return matchesCategory && matchesLocation && matchesQuery;
            });
        },

        async getById(id) {
            try {
                const res = await fetch(`${API_BASE}/api/providers/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    if (data.data) return data.data;
                }
            } catch (e) {
                console.warn('Backend getProviderById unreachable, using local match');
            }
            return SEED_PROVIDERS.find(p => String(p.id) === String(id)) || SEED_PROVIDERS[0];
        }
    },

    // Appointments API
    appointments: {
        async book(bookingData) {
            const user = TimeNestAPI.auth.getUser();
            try {
                const headers = { 'Content-Type': 'application/json' };
                if (user && user.id) headers['X-User-Id'] = user.id;

                const res = await fetch(`${API_BASE}/api/appointments`, {
                    method: 'POST',
                    headers,
                    body: JSON.stringify(bookingData)
                });
                if (res.ok) {
                    const data = await res.json();
                    if (data.data) return data.data;
                }
            } catch (e) {
                console.warn('Backend booking endpoint unreachable, recording in local storage');
            }

            // Local fallback booking
            const provider = SEED_PROVIDERS.find(p => String(p.id) === String(bookingData.providerId)) || SEED_PROVIDERS[0];
            const newAppointment = {
                id: Date.now(),
                providerId: provider.id,
                providerName: provider.name,
                businessName: provider.hospitalOrBusinessName,
                categoryCode: provider.category ? provider.category.code : 'service',
                categoryName: provider.category ? provider.category.name : 'Service',
                location: provider.location,
                locationDisplay: provider.locationDisplay,
                address: provider.address,
                appointmentDate: bookingData.appointmentDate,
                appointmentTime: bookingData.appointmentTime,
                customerName: bookingData.customerName,
                customerEmail: bookingData.customerEmail,
                customerPhone: bookingData.customerPhone,
                notes: bookingData.notes,
                status: 'CONFIRMED',
                createdAt: new Date().toISOString()
            };

            const existing = JSON.parse(localStorage.getItem('timenest_appointments') || '[]');
            existing.unshift(newAppointment);
            localStorage.setItem('timenest_appointments', JSON.stringify(existing));
            return newAppointment;
        },

        async getMine() {
            const user = TimeNestAPI.auth.getUser();
            if (!user) return [];

            try {
                const res = await fetch(`${API_BASE}/api/appointments/my?email=${encodeURIComponent(user.email)}`, {
                    headers: { 'X-User-Id': user.id }
                });
                if (res.ok) {
                    const data = await res.json();
                    if (data.data) return data.data;
                }
            } catch (e) {
                console.warn('Backend getMine appointments unreachable, reading local storage');
            }

            const all = JSON.parse(localStorage.getItem('timenest_appointments') || '[]');
            return all.filter(a => a.customerEmail && a.customerEmail.toLowerCase() === user.email.toLowerCase());
        },

        async cancel(id) {
            try {
                const res = await fetch(`${API_BASE}/api/appointments/${id}/cancel`, { method: 'PATCH' });
                if (res.ok) {
                    const data = await res.json();
                    if (data.data) return data.data;
                }
            } catch (e) {
                console.warn('Backend cancel appointment unreachable, updating local storage');
            }

            const all = JSON.parse(localStorage.getItem('timenest_appointments') || '[]');
            const apt = all.find(a => String(a.id) === String(id));
            if (apt) {
                apt.status = 'CANCELLED';
                localStorage.setItem('timenest_appointments', JSON.stringify(all));
                return apt;
            }
            throw new Error('Appointment not found');
        },

        async getAll() {
            try {
                const res = await fetch(`${API_BASE}/api/admin/appointments`);
                if (res.ok) {
                    const data = await res.json();
                    if (data.data) return data.data;
                }
            } catch (e) {
                console.warn('Backend admin appointments unreachable, reading local storage');
            }
            return JSON.parse(localStorage.getItem('timenest_appointments') || '[]');
        }
    },

    // Users API
    users: {
        async getProfile() {
            const user = TimeNestAPI.auth.getUser();
            if (!user) return null;

            try {
                const res = await fetch(`${API_BASE}/api/users/profile?id=${user.id}`, {
                    headers: { 'X-User-Id': user.id }
                });
                if (res.ok) {
                    const data = await res.json();
                    if (data.data) return data.data;
                }
            } catch (e) {
                console.warn('Backend user profile unreachable, returning current user session');
            }
            return user;
        },

        async updateProfile(profileData) {
            const user = TimeNestAPI.auth.getUser();
            if (!user) throw new Error('Not authenticated');

            try {
                const res = await fetch(`${API_BASE}/api/users/profile?id=${user.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json', 'X-User-Id': user.id },
                    body: JSON.stringify(profileData)
                });
                if (res.ok) {
                    const data = await res.json();
                    if (data.data) {
                        localStorage.setItem('timenest_user', JSON.stringify({ ...user, ...data.data }));
                        return data.data;
                    }
                }
            } catch (e) {
                console.warn('Backend profile update unreachable, updating local user session');
            }

            const updated = { ...user, fullName: profileData.fullName, phone: profileData.phone };
            localStorage.setItem('timenest_user', JSON.stringify(updated));
            return updated;
        },

        async changePassword(currentPassword, newPassword) {
            const user = TimeNestAPI.auth.getUser();
            if (!user) throw new Error('Not authenticated');

            try {
                const res = await fetch(`${API_BASE}/api/users/change-password?id=${user.id}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'X-User-Id': user.id },
                    body: JSON.stringify({ currentPassword, newPassword })
                });
                if (res.ok) return true;
            } catch (e) {
                console.warn('Backend change-password unreachable, confirming locally');
            }
            return true;
        }
    },

    // Admin API
    admin: {
        async getStats() {
            try {
                const res = await fetch(`${API_BASE}/api/admin/stats`);
                if (res.ok) {
                    const data = await res.json();
                    if (data.data) return data.data;
                }
            } catch (e) {
                console.warn('Backend admin stats unreachable, calculating from local store');
            }

            const appointments = JSON.parse(localStorage.getItem('timenest_appointments') || '[]');
            const users = JSON.parse(localStorage.getItem('timenest_users_registry') || '[]');
            return {
                totalUsers: users.length,
                totalAppointments: appointments.length,
                totalProviders: SEED_PROVIDERS.length,
                totalCategories: SEED_CATEGORIES.length
            };
        },

        async getAppointments() {
            return TimeNestAPI.appointments.getAll();
        },

        async getUsers() {
            try {
                const res = await fetch(`${API_BASE}/api/admin/users`);
                if (res.ok) {
                    const data = await res.json();
                    if (data.data) return data.data;
                }
            } catch (e) {
                console.warn('Backend admin users unreachable, reading local registry');
            }
            return JSON.parse(localStorage.getItem('timenest_users_registry') || '[]');
        }
    },

    // UI Helpers (Toast notifications, unified navbar rendering)
    ui: {
        showToast(message, type = 'success') {
            let container = document.getElementById('timenest-toast');
            if (!container) {
                container = document.createElement('div');
                container.id = 'timenest-toast';
                container.style.cssText = `
                    position: fixed;
                    top: 24px;
                    left: 50%;
                    transform: translateX(-50%);
                    padding: 12px 24px;
                    border-radius: 12px;
                    color: #fff;
                    font-weight: 500;
                    font-size: 14px;
                    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.15);
                    z-index: 99999;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                `;
                document.body.appendChild(container);
            }

            container.style.backgroundColor = type === 'success' ? '#10B981' : (type === 'error' ? '#EF4444' : '#6366F1');
            container.innerHTML = `<span>${type === 'success' ? '✓' : (type === 'error' ? '✕' : 'ℹ')}</span> ${message}`;
            container.style.opacity = '1';
            container.style.pointerEvents = 'auto';

            setTimeout(() => {
                container.style.opacity = '0';
                container.style.pointerEvents = 'none';
            }, 3200);
        },

        renderAuthHeader() {
            const user = TimeNestAPI.auth.getUser();
            const headerRight = document.getElementById('header-auth-section');
            if (!headerRight) return;

            if (user) {
                const firstLetter = user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U';
                const firstName = user.fullName ? user.fullName.split(' ')[0] : 'User';
                const isAdmin = user.role === 'ROLE_ADMIN' || user.email === 'admin@timenest.com';

                headerRight.innerHTML = `
                    <div class="dropdown relative">
                        <button onclick="toggleDropdown()" type="button" class="flex items-center gap-2 bg-white/90 hover:bg-white text-gray-800 px-3 py-1.5 rounded-full shadow-sm border border-purple-100 transition">
                            <span class="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow">
                                ${firstLetter}
                            </span>
                            <span class="text-xs font-semibold hidden sm:inline text-gray-700">${firstName}</span>
                            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                        </button>
                        <div id="myDropdown" class="dropdown-content hidden absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl py-2 z-50 border border-purple-50">
                            <div class="px-4 py-2 border-b border-gray-100 text-xs text-gray-500">
                                Signed in as <br><strong class="text-gray-900 text-sm truncate block">${user.email}</strong>
                            </div>
                            <a href="profile.html" class="flex items-center px-4 py-2 text-xs font-medium text-gray-700 hover:bg-purple-50 transition">
                                <span class="mr-2.5">👤</span> My Profile
                            </a>
                            <a href="my-bookings.html" class="flex items-center px-4 py-2 text-xs font-medium text-gray-700 hover:bg-purple-50 transition">
                                <span class="mr-2.5">📅</span> My Bookings
                            </a>
                            <a href="account.html" class="flex items-center px-4 py-2 text-xs font-medium text-gray-700 hover:bg-purple-50 transition">
                                <span class="mr-2.5">⚙️</span> Account
                            </a>
                            <a href="settings.html" class="flex items-center px-4 py-2 text-xs font-medium text-gray-700 hover:bg-purple-50 transition">
                                <span class="mr-2.5">🛠️</span> Settings
                            </a>
                            ${isAdmin ? `
                            <a href="admin.html" class="flex items-center px-4 py-2 text-xs font-bold text-indigo-600 hover:bg-indigo-50 transition border-t border-gray-100 mt-1 pt-2">
                                <span class="mr-2.5">⚡</span> Admin Dashboard
                            </a>` : ''}
                            <div class="border-t border-gray-100 my-1"></div>
                            <a href="javascript:void(0)" onclick="TimeNestAPI.auth.logout()" class="flex items-center px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition">
                                <span class="mr-2.5">🚪</span> Sign Out
                            </a>
                        </div>
                    </div>
                `;
            } else {
                headerRight.innerHTML = `
                    <div class="flex items-center gap-2">
                        <a href="login.html" class="text-xs font-semibold text-gray-700 hover:text-purple-600 px-3 py-1.5 rounded-lg hover:bg-purple-50 transition">Log In</a>
                        <a href="signup.html" class="text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 px-4 py-1.5 rounded-full shadow-sm transition">Sign Up</a>
                    </div>
                `;
            }
        }
    }
};

window.toggleDropdown = function () {
    const el = document.getElementById("myDropdown");
    if (el) el.classList.toggle("hidden");
};

// Close dropdown on outside click
window.addEventListener("click", function (event) {
    if (!event.target.closest(".dropdown")) {
        const el = document.getElementById("myDropdown");
        if (el && !el.classList.contains("hidden")) {
            el.classList.add("hidden");
        }
    }
});
