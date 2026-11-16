package com.timenest.controller.api;

import com.timenest.dto.ApiResponse;
import com.timenest.dto.AppointmentRequest;
import com.timenest.dto.AppointmentResponse;
import com.timenest.entity.AppointmentStatus;
import com.timenest.service.AppointmentService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "*")
public class AppointmentApiController {

    private final AppointmentService appointmentService;

    public AppointmentApiController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<AppointmentResponse>> bookAppointment(
            @Valid @RequestBody AppointmentRequest request,
            @RequestHeader(value = "X-User-Id", required = false) Long userId) {
        AppointmentResponse response = appointmentService.bookAppointment(request, userId);
        return ResponseEntity.ok(ApiResponse.ok("Appointment booked successfully!", response));
    }

    @GetMapping("/my")
    public ResponseEntity<ApiResponse<List<AppointmentResponse>>> getMyAppointments(
            @RequestHeader(value = "X-User-Id", required = false) Long userId,
            @RequestParam(value = "email", required = false) String email) {
        List<AppointmentResponse> list = appointmentService.getAppointmentsForUser(userId, email);
        return ResponseEntity.ok(ApiResponse.ok("Appointments retrieved successfully", list));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<AppointmentResponse>> getAppointmentById(@PathVariable Long id) {
        AppointmentResponse response = appointmentService.getAppointmentById(id);
        return ResponseEntity.ok(ApiResponse.ok("Appointment details", response));
    }

    @PatchMapping("/{id}/cancel")
    public ResponseEntity<ApiResponse<AppointmentResponse>> cancelAppointment(@PathVariable Long id) {
        AppointmentResponse response = appointmentService.cancelAppointment(id);
        return ResponseEntity.ok(ApiResponse.ok("Appointment cancelled successfully", response));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse<AppointmentResponse>> updateStatus(
            @PathVariable Long id,
            @RequestParam AppointmentStatus status) {
        AppointmentResponse response = appointmentService.updateStatus(id, status);
        return ResponseEntity.ok(ApiResponse.ok("Appointment status updated", response));
    }
}
