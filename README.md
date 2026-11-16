# TimeNest - Appointment Booking Platform ⏳

[![Java](https://img.shields.io/badge/Java-21%20LTS-orange.svg)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3.5-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![Spring Data JPA](https://img.shields.io/badge/Spring%20Data-JPA-blue.svg)](https://spring.io/projects/spring-data-jpa)
[![Database](https://img.shields.io/badge/Database-H2%20%7C%20MySQL-lightgrey.svg)](https://www.h2database.com/)
[![Tailwind CSS](https://img.shields.io/badge/Frontend-TailwindCSS%20%2B%20JS-38bdf8.svg)](https://tailwindcss.com/)

**TimeNest** is an enterprise-grade **Java Full Stack Appointment Booking Platform** designed to connect customers with verified professional service providers across multiple categories (Doctors, Salons, Career Counselors, Lawyers, Financial Advisors, Chartered Accountants) in real-time.

---

## 🚀 Key Highlights & Architecture

- **Backend**: Spring Boot 3.3.5, Java 21 LTS
- **Security & Password Hashing**: Spring Security 6 with BCrypt cryptographic password encoding
- **Persistence**: Spring Data JPA (Hibernate ORM)
- **Database**:
  - **Zero-Setup Default**: Embedded H2 Database (with web console at `/h2-console`)
  - **Production Ready**: One-line switch to MySQL / PostgreSQL in `application.properties`
- **Frontend**: Responsive Single-Page UI powered by Tailwind CSS, modern gradients, and dynamic JavaScript REST API client (`/js/api.js`)
- **API Architecture**: Fully RESTful JSON APIs for Authentication, Providers, Categories, Bookings, Users, and Admin Management.

---

## 📂 Project Directory Structure

```text
TimeNest-Appoinment_Booking_Platform/
├── pom.xml                               # Maven Build Descriptor (Spring Boot 3 + Java 21)
├── mvnw / mvnw.cmd                       # Maven Wrapper for Cross-Platform Execution
├── .mvn/wrapper/maven-wrapper.properties # Wrapper Configuration
├── src/
│   ├── main/
│   │   ├── java/com/timenest/
│   │   │   ├── TimeNestApplication.java  # Main Spring Boot Entrypoint
│   │   │   ├── config/
│   │   │   │   ├── SecurityConfig.java   # Spring Security, CORS, BCrypt configuration
│   │   │   │   └── DataInitializer.java  # Pre-seeds Demo Data, Providers & Users
│   │   │   ├── controller/
│   │   │   │   ├── ViewController.java   # Route forwards to HTML pages
│   │   │   │   └── api/
│   │   │   │       ├── AuthApiController.java        # /api/auth
│   │   │   │       ├── CategoryApiController.java    # /api/categories
│   │   │   │       ├── ProviderApiController.java    # /api/providers
│   │   │   │       ├── AppointmentApiController.java # /api/appointments
│   │   │   │       ├── UserApiController.java        # /api/users
│   │   │   │       └── AdminApiController.java       # /api/admin
│   │   │   ├── dto/                      # Data Transfer Objects & API Payloads
│   │   │   ├── entity/                   # JPA Entities (User, Appointment, Provider, etc.)
│   │   │   ├── exception/                # Global Controller Advice & Custom Exceptions
│   │   │   ├── repository/               # Spring Data JPA Repositories
│   │   │   └── service/                  # Business Logic Layer
│   │   └── resources/
│   │       ├── application.properties    # App Configuration & DB Properties
│   │       └── static/                   # Production Web Assets (Served at root)
│   │           ├── index.html            # Homepage & Service Discovery
│   │           ├── service-details.html  # Location & Provider Filtering
│   │           ├── booking.html          # Interactive Appointment Booking
│   │           ├── my-bookings.html      # User Booking History & Cancellation
│   │           ├── login.html            # User Login with 1-click Demo Fillers
│   │           ├── signup.html           # User Registration
│   │           ├── profile.html          # User Profile & Profile Editing
│   │           ├── account.html          # Account Tier & Security Summary
│   │           ├── settings.html         # Change Password & Preferences
│   │           ├── admin.html            # Administrator Portal & Management
│   │           ├── logout.html           # Session Cleanup
│   │           └── js/api.js             # Centralized Client REST API Library
│   └── test/                             # JUnit 5 & Spring Boot Tests
└── README.md
```

---

## 👥 Pre-Configured Demo Accounts

The application automatically seeds test accounts on first launch:

| Role | Email | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **Administrator** | `admin@timenest.com` | `admin123` | Full Admin Portal (`/admin`), user & booking directory |
| **Standard User** | `user@timenest.com` | `user123` | Booking history, appointment scheduling, profile editing |
| **Doctor/Provider** | `dr.priyasharma@apollo.com` | `doctor123` | Service provider listing |

---

## 🛠️ Getting Started & How to Run

### 1. Prerequisites
- **Java Development Kit (JDK) 21** or higher.
- (Optional) Apache Maven 3.8+ (A Maven wrapper `mvnw` / `mvnw.cmd` is included).

### 2. Run the Application

#### Option A: Using Maven Wrapper (Windows PowerShell / CMD)
```powershell
.\mvnw.cmd spring-boot:run
```

#### Option B: Using Maven Wrapper (Linux / macOS / Bash)
```bash
chmod +x ./mvnw
./mvnw spring-boot:run
```

#### Option C: Using Local Maven
```bash
mvn clean spring-boot:run
```

#### Option D: In Any Java IDE (IntelliJ IDEA / VS Code / Eclipse)
1. Open the project root folder.
2. Allow Maven to import dependencies from `pom.xml`.
3. Locate `src/main/java/com/timenest/TimeNestApplication.java`.
4. Right-click and select **Run 'TimeNestApplication'**.

---

## 🌐 Application Endpoints

Once the application is running:

| Page / Resource | URL | Description |
| :--- | :--- | :--- |
| **Homepage** | [http://localhost:8081/](http://localhost:8081/) | Service discovery, location selector, featured providers |
| **Service Providers** | [http://localhost:8081/service-details.html](http://localhost:8081/service-details.html) | Search specialists by service category & location |
| **Book Appointment** | [http://localhost:8081/booking.html](http://localhost:8081/booking.html) | Interactive date picker, time slot chips & instant booking |
| **My Bookings** | [http://localhost:8081/my-bookings.html](http://localhost:8081/my-bookings.html) | User appointment history with live cancellation |
| **Log In** | [http://localhost:8081/login.html](http://localhost:8081/login.html) | Authentication with 1-click demo buttons |
| **Sign Up** | [http://localhost:8081/signup.html](http://localhost:8081/signup.html) | User registration with input validation |
| **User Profile** | [http://localhost:8081/profile.html](http://localhost:8081/profile.html) | View & edit member info |
| **Admin Portal** | [http://localhost:8081/admin.html](http://localhost:8081/admin.html) | Live platform stats, all appointments & users |
| **H2 Web Console** | [http://localhost:8081/h2-console](http://localhost:8081/h2-console) | Database browser (JDBC URL: `jdbc:h2:mem:timenestdb`, User: `sa`, Password: empty) |

---

## 📡 RESTful API Documentation

### Authentication (`/api/auth`)
- `POST /api/auth/register` - Create a new user account
- `POST /api/auth/login` - Authenticate user & receive session token
- `GET /api/auth/me` - Fetch authenticated user details

### Service Categories (`/api/categories`)
- `GET /api/categories` - List all service categories (Doctors, Salons, Counselors, Lawyers, Advisors, Accountants)
- `GET /api/categories/{code}` - Get category details by code

### Service Providers (`/api/providers`)
- `GET /api/providers` - Get all service providers
- `GET /api/providers/{id}` - Get provider by ID
- `GET /api/providers/search?category={cat}&location={loc}&query={q}` - Filter providers by category, location, and name/specialty
- `POST /api/providers` - Add a new service provider

### Appointments (`/api/appointments`)
- `POST /api/appointments` - Book a new appointment
- `GET /api/appointments/my` - Get appointments for current user/email
- `GET /api/appointments/{id}` - Get appointment details by ID
- `PATCH /api/appointments/{id}/cancel` - Cancel a scheduled appointment
- `PATCH /api/appointments/{id}/status?status={STATUS}` - Update appointment status (`CONFIRMED`, `PENDING`, `COMPLETED`, `CANCELLED`)

### User Profile & Settings (`/api/users`)
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update full name & phone number
- `POST /api/users/change-password` - Securely change password (verified with BCrypt)

### Admin Management (`/api/admin`)
- `GET /api/admin/stats` - Platform metrics (Total Users, Appointments, Providers, Categories)
- `GET /api/admin/appointments` - Global appointments list
- `GET /api/admin/users` - Global user registry

---

## 🗄️ Database Configuration

By default, TimeNest runs with an embedded **H2 in-memory database**, requiring zero installation or setup.

### Switching to MySQL (Optional)
To use MySQL in production, edit `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/timenest_db?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.datasource.driverClassName=com.mysql.cj.jdbc.Driver
spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
spring.jpa.hibernate.ddl-auto=update
```

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
