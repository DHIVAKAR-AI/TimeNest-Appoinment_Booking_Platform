package com.timenest.service;

import com.timenest.dto.AppointmentRequest;
import com.timenest.dto.AppointmentResponse;
import com.timenest.entity.Appointment;
import com.timenest.entity.AppointmentStatus;
import com.timenest.entity.ServiceProvider;
import com.timenest.entity.User;
import com.timenest.exception.ResourceNotFoundException;
import com.timenest.repository.AppointmentRepository;
import com.timenest.repository.ServiceProviderRepository;
import com.timenest.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final ServiceProviderRepository providerRepository;
    private final UserRepository userRepository;

    public AppointmentService(AppointmentRepository appointmentRepository,
                              ServiceProviderRepository providerRepository,
                              UserRepository userRepository) {
        this.appointmentRepository = appointmentRepository;
        this.providerRepository = providerRepository;
        this.userRepository = userRepository;
    }

    public AppointmentResponse bookAppointment(AppointmentRequest request, Long userId) {
        ServiceProvider provider = providerRepository.findById(request.getProviderId())
                .orElseThrow(() -> new ResourceNotFoundException("Provider not found with id: " + request.getProviderId()));

        User user = null;
        if (userId != null) {
            user = userRepository.findById(userId).orElse(null);
        } else if (request.getCustomerEmail() != null) {
            user = userRepository.findByEmail(request.getCustomerEmail().trim().toLowerCase()).orElse(null);
        }

        Appointment appointment = new Appointment();
        appointment.setProvider(provider);
        appointment.setUser(user);
        appointment.setAppointmentDate(request.getAppointmentDate());
        appointment.setAppointmentTime(request.getAppointmentTime());
        appointment.setCustomerName(request.getCustomerName().trim());
        appointment.setCustomerEmail(request.getCustomerEmail().trim().toLowerCase());
        appointment.setCustomerPhone(request.getCustomerPhone() != null ? request.getCustomerPhone().trim() : null);
        appointment.setNotes(request.getNotes());
        appointment.setStatus(AppointmentStatus.CONFIRMED);
        appointment.setCreatedAt(LocalDateTime.now());

        Appointment saved = appointmentRepository.save(appointment);
        return new AppointmentResponse(saved);
    }

    @Transactional(readOnly = true)
    public List<AppointmentResponse> getAppointmentsForUser(Long userId, String email) {
        if (userId != null) {
            return appointmentRepository.findByUser_IdOrderByAppointmentDateDescCreatedAtDesc(userId)
                    .stream()
                    .map(AppointmentResponse::new)
                    .collect(Collectors.toList());
        } else if (email != null && !email.trim().isEmpty()) {
            return appointmentRepository.findByCustomerEmailIgnoreCaseOrderByAppointmentDateDescCreatedAtDesc(email.trim())
                    .stream()
                    .map(AppointmentResponse::new)
                    .collect(Collectors.toList());
        }
        return List.of();
    }

    @Transactional(readOnly = true)
    public List<AppointmentResponse> getAllAppointments() {
        return appointmentRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(AppointmentResponse::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public AppointmentResponse getAppointmentById(Long id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment not found with id: " + id));
        return new AppointmentResponse(appointment);
    }

    public AppointmentResponse updateStatus(Long id, AppointmentStatus status) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment not found with id: " + id));
        appointment.setStatus(status);
        Appointment updated = appointmentRepository.save(appointment);
        return new AppointmentResponse(updated);
    }

    public AppointmentResponse cancelAppointment(Long id) {
        return updateStatus(id, AppointmentStatus.CANCELLED);
    }
}
