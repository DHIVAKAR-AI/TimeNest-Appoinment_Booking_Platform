package com.timenest.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "service_providers")
public class ServiceProvider {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id", nullable = false)
    private ServiceCategory category;

    @Column(nullable = false)
    private String location; // lowercase city code, e.g., chennai, karur, madurai

    private String locationDisplay;

    private String hospitalOrBusinessName;

    @Column(length = 500)
    private String address;

    private String phone;

    private String email;

    private Double rating = 4.5;

    private Integer reviewsCount = 10;

    private String timeSlots;

    private String priceRange = "₹500 - ₹1,500";

    @Column(length = 1000)
    private String about;

    private String imageUrl;

    public ServiceProvider() {
    }

    public ServiceProvider(String name, ServiceCategory category, String location, String locationDisplay,
                           String hospitalOrBusinessName, String address, String phone, String email,
                           Double rating, Integer reviewsCount, String timeSlots, String priceRange, String about) {
        this.name = name;
        this.category = category;
        this.location = location != null ? location.toLowerCase() : "";
        this.locationDisplay = locationDisplay;
        this.hospitalOrBusinessName = hospitalOrBusinessName;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.rating = rating;
        this.reviewsCount = reviewsCount;
        this.timeSlots = timeSlots;
        this.priceRange = priceRange;
        this.about = about;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ServiceCategory getCategory() {
        return category;
    }

    public void setCategory(ServiceCategory category) {
        this.category = category;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location != null ? location.toLowerCase() : "";
    }

    public String getLocationDisplay() {
        return locationDisplay;
    }

    public void setLocationDisplay(String locationDisplay) {
        this.locationDisplay = locationDisplay;
    }

    public String getHospitalOrBusinessName() {
        return hospitalOrBusinessName;
    }

    public void setHospitalOrBusinessName(String hospitalOrBusinessName) {
        this.hospitalOrBusinessName = hospitalOrBusinessName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public Integer getReviewsCount() {
        return reviewsCount;
    }

    public void setReviewsCount(Integer reviewsCount) {
        this.reviewsCount = reviewsCount;
    }

    public String getTimeSlots() {
        return timeSlots;
    }

    public void setTimeSlots(String timeSlots) {
        this.timeSlots = timeSlots;
    }

    public String getPriceRange() {
        return priceRange;
    }

    public void setPriceRange(String priceRange) {
        this.priceRange = priceRange;
    }

    public String getAbout() {
        return about;
    }

    public void setAbout(String about) {
        this.about = about;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
