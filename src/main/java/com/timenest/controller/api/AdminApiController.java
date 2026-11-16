package com.timenest.controller.api;

import com.timenest.dto.ApiResponse;
import com.timenest.dto.AppointmentResponse;
import com.timenest.dto.UserDto;
import com.timenest.repository.AppointmentRepository;
import com.timenest.repository.ServiceCategoryRepository;
import com.timenest.repository.ServiceProviderRepository;
import com.timenest.repository.UserRepository;
import com.timenest.service.AppointmentService;
import com.timenest.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminApiController {

    private final UserRepository userRepository;
    private final ServiceCategoryRepository categoryRepository;
    private final ServiceProviderRepository providerRepository;
    private final AppointmentRepository appointmentRepository;
    private final AppointmentService appointmentService;
    private final UserService userService;

    public AdminApiController(UserRepository userRepository,
                              ServiceCategoryRepository categoryRepository,
                              ServiceProviderRepository providerRepository,
                              AppointmentRepository appointmentRepository,
                              AppointmentService appointmentService,
                              UserService userService) {
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.providerRepository = providerRepository;
        this.appointmentRepository = appointmentRepository;
        this.appointmentService = appointmentService;
        this.userService = userService;
    }

    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", userRepository.count());
        stats.put("totalAppointments", appointmentRepository.count());
        stats.put("totalProviders", providerRepository.count());
        stats.put("totalCategories", categoryRepository.count());
        return ResponseEntity.ok(ApiResponse.ok("Admin stats retrieved", stats));
    }

    @GetMapping("/appointments")
    public ResponseEntity<ApiResponse<List<AppointmentResponse>>> getAllAppointments() {
        List<AppointmentResponse> list = appointmentService.getAllAppointments();
        return ResponseEntity.ok(ApiResponse.ok("All appointments", list));
    }

    @GetMapping("/users")
    public ResponseEntity<ApiResponse<List<UserDto>>> getAllUsers() {
        List<UserDto> users = userService.getAllUsers();
        return ResponseEntity.ok(ApiResponse.ok("All users", users));
    }
}
