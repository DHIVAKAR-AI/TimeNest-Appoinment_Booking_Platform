const fs = require('fs');
const path = require('path');

const ROOT_DIR = 'A:\\GitHub\\TimeNest-Appoinment_Booking_Platform';
const STATIC_DIR = path.join(ROOT_DIR, 'src', 'main', 'resources', 'static');

const results = {
    passed: 0,
    failed: 0,
    tests: []
};

function assert(condition, message) {
    if (condition) {
        results.passed++;
        results.tests.push({ status: 'PASS', message });
        console.log(`  ✓ [PASS] ${message}`);
    } else {
        results.failed++;
        results.tests.push({ status: 'FAIL', message });
        console.error(`  ✗ [FAIL] ${message}`);
    }
}

console.log('====================================================');
console.log('   TIMENEST PLATFORM - COMPREHENSIVE ACCURACY TEST   ');
console.log('====================================================\n');

// ----------------------------------------------------
// TEST SUITE 1: FILE EXISTENCE & LINK ACCURACY
// ----------------------------------------------------
console.log('--- Test Suite 1: File Existence & Link Integrity ---');
const requiredPages = [
    'index.html',
    'service-details.html',
    'booking.html',
    'my-bookings.html',
    'profile.html',
    'account.html',
    'settings.html',
    'login.html',
    'signup.html',
    'logout.html',
    'admin.html'
];

requiredPages.forEach(page => {
    const staticPath = path.join(STATIC_DIR, page);
    const rootPath = path.join(ROOT_DIR, page);
    assert(fs.existsSync(staticPath), `Spring Boot Static Page exists: ${page}`);
    assert(fs.existsSync(rootPath), `Root Workspace Page exists: ${page}`);
});

// Verify API library exists
const apiJsPath = path.join(STATIC_DIR, 'js', 'api.js');
assert(fs.existsSync(apiJsPath), 'API library js/api.js exists');

// Check every internal link in all pages
console.log('\n--- Checking Internal Navigation Links in HTML ---');
requiredPages.forEach(page => {
    const content = fs.readFileSync(path.join(STATIC_DIR, page), 'utf8');
    // Extract hrefs
    const hrefMatches = content.match(/href="([^"#:]+?)(?:\?[^"]*)?"/g) || [];
    hrefMatches.forEach(m => {
        const link = m.replace(/href="([^"?#]+).*/, '$1');
        if (link.endsWith('.html')) {
            const target = path.join(STATIC_DIR, link);
            assert(fs.existsSync(target), `Link in ${page} -> ${link} targets existing file`);
        }
    });

    // Extract script srcs
    const scriptMatches = content.match(/src="([^"]+?)"/g) || [];
    scriptMatches.forEach(s => {
        const src = s.replace(/src="([^"]+)"/, '$1');
        if (!src.startsWith('http') && !src.startsWith('//')) {
            const target = path.join(STATIC_DIR, src.replace(/^\//, ''));
            assert(fs.existsSync(target), `Script in ${page} -> ${src} exists`);
        }
    });
});

// ----------------------------------------------------
// TEST SUITE 2: CLIENT API ACCURACY (SEED & LOGIC)
// ----------------------------------------------------
console.log('\n--- Test Suite 2: Client API & Data Accuracy ---');
const apiContent = fs.readFileSync(apiJsPath, 'utf8');

// Mock localStorage for Node test
const mockStore = {};
global.localStorage = {
    getItem(k) { return mockStore[k] || null; },
    setItem(k, v) { mockStore[k] = String(v); },
    removeItem(k) { delete mockStore[k]; },
    clear() { Object.keys(mockStore).forEach(k => delete mockStore[k]); }
};
global.window = {
    location: {
        origin: 'http://localhost:8081',
        protocol: 'http:',
        port: '8081'
    }
};

// Evaluate api.js in Node context
try {
    eval(apiContent);
    assert(typeof TimeNestAPI !== 'undefined', 'TimeNestAPI initialized successfully');
} catch (e) {
    assert(false, `TimeNestAPI initialization error: ${e.message}`);
}

async function testApiAccuracy() {
    // 1. Categories
    const categories = await TimeNestAPI.categories.getAll();
    assert(categories.length === 6, `Exactly 6 service categories defined (Got: ${categories.length})`);
    const expectedCodes = ['doctor', 'salon', 'counselor', 'lawyer', 'advisor', 'accountant'];
    const actualCodes = categories.map(c => c.code);
    assert(expectedCodes.every(c => actualCodes.includes(c)), `All 6 expected category codes present: ${expectedCodes.join(', ')}`);

    // 2. Providers
    const allProviders = await TimeNestAPI.providers.search('all', 'all');
    assert(allProviders.length >= 15, `At least 15 verified specialists in catalog (Got: ${allProviders.length})`);

    // Category filter accuracy
    const doctors = await TimeNestAPI.providers.search('doctor', 'all');
    assert(doctors.length > 0 && doctors.every(d => d.category.code === 'doctor'), 'Category filter: "doctor" returns exclusively doctors');

    // Location filter accuracy
    const karurProviders = await TimeNestAPI.providers.search('all', 'karur');
    assert(karurProviders.length > 0 && karurProviders.every(p => p.location.toLowerCase() === 'karur'), 'Location filter: "karur" returns exclusively Karur providers');

    // Combined filter accuracy
    const chennaiDoctors = await TimeNestAPI.providers.search('doctor', 'chennai');
    assert(chennaiDoctors.length === 2 && chennaiDoctors.some(d => d.name.includes('Priya Sharma')), 'Combined filter: "doctor" in "chennai" accurately returns Dr. Priya Sharma and Fortis Malar doctor');

    // Keyword search accuracy
    const apolloSearch = await TimeNestAPI.providers.search('all', 'all', 'Apollo');
    assert(apolloSearch.length >= 1 && apolloSearch[0].hospitalOrBusinessName.includes('Apollo'), 'Keyword search: "Apollo" matches Apollo Hospitals');

    // Provider by ID lookup
    const provider1 = await TimeNestAPI.providers.getById(1);
    assert(provider1 && provider1.name === 'Dr. Priya Sharma', `Provider ID 1 lookup matches Dr. Priya Sharma`);

    // 3. Authentication Accuracy
    // Login as Demo User
    const userLogin = await TimeNestAPI.auth.login('user@timenest.com', 'user123');
    assert(userLogin.success && userLogin.user.email === 'user@timenest.com', 'Login accuracy: User login succeeded for user@timenest.com');
    assert(TimeNestAPI.auth.isLoggedIn(), 'auth.isLoggedIn() accurately returns true after login');
    assert(!TimeNestAPI.auth.isAdmin(), 'Standard user is accurately identified as non-admin');

    // Login as Admin
    const adminLogin = await TimeNestAPI.auth.login('admin@timenest.com', 'admin123');
    assert(adminLogin.success && adminLogin.user.role === 'ROLE_ADMIN', 'Login accuracy: Admin login has ROLE_ADMIN');
    assert(TimeNestAPI.auth.isAdmin(), 'auth.isAdmin() accurately returns true for administrator');

    // New Registration
    const newReg = await TimeNestAPI.auth.register('Alice Green', 'alice@test.com', 'pass123', '+91 99999 88888');
    assert(newReg.success && newReg.user.fullName === 'Alice Green', 'Registration accuracy: Successfully registered new user Alice Green');

    // Logout
    TimeNestAPI.auth.logout();
    assert(!TimeNestAPI.auth.isLoggedIn(), 'Logout accuracy: Session cleared, user no longer logged in');

    // 4. Appointment Booking Accuracy
    // Re-login as Alice Green for booking
    await TimeNestAPI.auth.login('alice@test.com', 'pass123');
    const bookingPayload = {
        providerId: 3, // Dr. Anjali Devi in Karur
        appointmentDate: '2026-11-28',
        appointmentTime: '11:00 AM',
        customerName: 'Alice Green',
        customerEmail: 'alice@test.com',
        customerPhone: '+91 99999 88888',
        notes: 'Child fever consultation'
    };
    const booked = await TimeNestAPI.appointments.book(bookingPayload);
    assert(booked && booked.id && booked.status === 'CONFIRMED', `Appointment booked successfully with ID: ${booked.id}`);
    assert(booked.providerName.includes('Anjali Devi'), `Booking recorded correct provider: ${booked.providerName}`);
    assert(booked.appointmentDate === '2026-11-28', `Booking recorded correct date: ${booked.appointmentDate}`);
    assert(booked.appointmentTime === '11:00 AM', `Booking recorded correct time slot: ${booked.appointmentTime}`);

    // Retrieve appointments
    const myBookings = await TimeNestAPI.appointments.getMine();
    assert(myBookings.some(b => b.id === booked.id), 'Newly booked appointment is accurately retrieved in getMine()');

    // Cancel appointment
    const cancelled = await TimeNestAPI.appointments.cancel(booked.id);
    assert(cancelled && cancelled.status === 'CANCELLED', `Appointment cancellation accuracy: Status updated to CANCELLED`);

    // Verify cancellation status persisted
    const updatedBookings = await TimeNestAPI.appointments.getMine();
    const targetApt = updatedBookings.find(b => b.id === booked.id);
    assert(targetApt && targetApt.status === 'CANCELLED', 'Cancelled status accurately persisted in storage');

    // 5. User Profile & Password Update Accuracy
    const profile = await TimeNestAPI.users.getProfile();
    assert(profile && profile.email === 'alice@test.com', 'getProfile() accurately returns active user');

    const updatedProfile = await TimeNestAPI.users.updateProfile({ fullName: 'Alice Green-Smith', phone: '+91 88888 77777' });
    assert(updatedProfile.fullName === 'Alice Green-Smith' && updatedProfile.phone === '+91 88888 77777', 'updateProfile() accurately updates and persists full name & phone');

    const passChange = await TimeNestAPI.users.changePassword('pass123', 'newpass456');
    assert(passChange === true, 'changePassword() returns true on password update');

    // 6. Admin Metrics Accuracy
    const stats = await TimeNestAPI.admin.getStats();
    assert(stats.totalUsers >= 2, `Admin stats: Total users >= 2 (Got: ${stats.totalUsers})`);
    assert(stats.totalAppointments >= 1, `Admin stats: Total appointments >= 1 (Got: ${stats.totalAppointments})`);
    assert(stats.totalProviders >= 15, `Admin stats: Total providers matches catalog count (Got: ${stats.totalProviders})`);
    assert(stats.totalCategories === 6, `Admin stats: Total categories is 6 (Got: ${stats.totalCategories})`);

    const allAdminApts = await TimeNestAPI.admin.getAppointments();
    assert(allAdminApts.length === stats.totalAppointments, `Admin appointments count matches stats count (${allAdminApts.length})`);

    const allAdminUsers = await TimeNestAPI.admin.getUsers();
    assert(allAdminUsers.length === stats.totalUsers, `Admin users count matches stats count (${allAdminUsers.length})`);
}

// ----------------------------------------------------
// TEST SUITE 3: JAVA CODE STRUCTURE & CONFIG ACCURACY
// ----------------------------------------------------
console.log('\n--- Test Suite 3: Java Full Stack Code Accuracy ---');
const JAVA_DIR = path.join(ROOT_DIR, 'src', 'main', 'java', 'com', 'timenest');

const javaFiles = [
    'TimeNestApplication.java',
    'config/SecurityConfig.java',
    'config/DataInitializer.java',
    'entity/User.java',
    'entity/Role.java',
    'entity/ServiceCategory.java',
    'entity/ServiceProvider.java',
    'entity/Appointment.java',
    'entity/AppointmentStatus.java',
    'repository/UserRepository.java',
    'repository/ServiceCategoryRepository.java',
    'repository/ServiceProviderRepository.java',
    'repository/AppointmentRepository.java',
    'service/UserService.java',
    'service/ServiceCategoryService.java',
    'service/ServiceProviderService.java',
    'service/AppointmentService.java',
    'controller/ViewController.java',
    'controller/api/AuthApiController.java',
    'controller/api/CategoryApiController.java',
    'controller/api/ProviderApiController.java',
    'controller/api/AppointmentApiController.java',
    'controller/api/UserApiController.java',
    'controller/api/AdminApiController.java',
    'dto/ApiResponse.java',
    'dto/AppointmentRequest.java',
    'dto/AppointmentResponse.java',
    'dto/AuthResponse.java',
    'dto/UserDto.java',
    'exception/GlobalExceptionHandler.java'
];

javaFiles.forEach(file => {
    const fullPath = path.join(JAVA_DIR, file);
    assert(fs.existsSync(fullPath), `Java source file exists: ${file}`);
});

// Check application.properties port
const appProps = fs.readFileSync(path.join(ROOT_DIR, 'src', 'main', 'resources', 'application.properties'), 'utf8');
assert(appProps.includes('server.port=${PORT:8081}'), 'application.properties correctly configures port 8081');
assert(appProps.includes('spring.datasource.url=jdbc:h2:mem:timenestdb'), 'application.properties correctly configures H2 in-memory DB');
assert(appProps.includes('spring.h2.console.enabled=true'), 'application.properties enables H2 web console');

// Execute async API tests
testApiAccuracy().then(() => {
    console.log('\n====================================================');
    console.log(`   TEST EXECUTION COMPLETE: ${results.passed} PASSED, ${results.failed} FAILED   `);
    console.log('====================================================');
    if (results.failed > 0) {
        process.exit(1);
    }
});
