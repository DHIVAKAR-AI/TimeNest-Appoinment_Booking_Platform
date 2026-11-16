package com.timenest.repository;

import com.timenest.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    List<Appointment> findByUser_IdOrderByAppointmentDateDescCreatedAtDesc(Long userId);

    List<Appointment> findByCustomerEmailIgnoreCaseOrderByAppointmentDateDescCreatedAtDesc(String email);

    List<Appointment> findByProvider_IdOrderByAppointmentDateDescCreatedAtDesc(Long providerId);

    List<Appointment> findAllByOrderByCreatedAtDesc();
}
