package com.timenest.dto;

import com.timenest.entity.Appointment;
import com.timenest.entity.AppointmentStatus;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class AppointmentResponse {

    private Long id;
    private Long providerId;
    private String providerName;
    private String categoryName;
    private String categoryCode;
    private String businessName;
    private String location;
    private String locationDisplay;
    private String address;
    private LocalDate appointmentDate;
    private String appointmentTime;
    private String customerName;
    private String customerEmail;
    private String customerPhone;
    private String notes;
    private AppointmentStatus status;
    private LocalDateTime createdAt;

    public AppointmentResponse() {
    }

    public AppointmentResponse(Appointment appointment) {
        if (appointment != null) {
            this.id = appointment.getId();
            if (appointment.getProvider() != null) {
                this.providerId = appointment.getProvider().getId();
                this.providerName = appointment.getProvider().getName();
                this.businessName = appointment.getProvider().getHospitalOrBusinessName();
                this.location = appointment.getProvider().getLocation();
                this.locationDisplay = appointment.getProvider().getLocationDisplay();
                this.address = appointment.getProvider().getAddress();
                if (appointment.getProvider().getCategory() != null) {
                    this.categoryName = appointment.getProvider().getCategory().getName();
                    this.categoryCode = appointment.getProvider().getCategory().getCode();
                }
            }
            this.appointmentDate = appointment.getAppointmentDate();
            this.appointmentTime = appointment.getAppointmentTime();
            this.customerName = appointment.getCustomerName();
            this.customerEmail = appointment.getCustomerEmail();
            this.customerPhone = appointment.getCustomerPhone();
            this.notes = appointment.getNotes();
            this.status = appointment.getStatus();
            this.createdAt = appointment.getCreatedAt();
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getProviderId() {
        return providerId;
    }

    public void setProviderId(Long providerId) {
        this.providerId = providerId;
    }

    public String getProviderName() {
        return providerName;
    }

    public void setProviderName(String providerName) {
        this.providerName = providerName;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getCategoryCode() {
        return categoryCode;
    }

    public void setCategoryCode(String categoryCode) {
        this.categoryCode = categoryCode;
    }

    public String getBusinessName() {
        return businessName;
    }

    public void setBusinessName(String businessName) {
        this.businessName = businessName;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getLocationDisplay() {
        return locationDisplay;
    }

    public void setLocationDisplay(String locationDisplay) {
        this.locationDisplay = locationDisplay;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public LocalDate getAppointmentDate() {
        return appointmentDate;
    }

    public void setAppointmentDate(LocalDate appointmentDate) {
        this.appointmentDate = appointmentDate;
    }

    public String getAppointmentTime() {
        return appointmentTime;
    }

    public void setAppointmentTime(String appointmentTime) {
        this.appointmentTime = appointmentTime;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerEmail() {
        return customerEmail;
    }

    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }

    public String getCustomerPhone() {
        return customerPhone;
    }

    public void setCustomerPhone(String customerPhone) {
        this.customerPhone = customerPhone;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public AppointmentStatus getStatus() {
        return status;
    }

    public void setStatus(AppointmentStatus status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
