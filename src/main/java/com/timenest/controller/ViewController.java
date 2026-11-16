package com.timenest.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {

    @GetMapping("/")
    public String index() {
        return "forward:/index.html";
    }

    @GetMapping("/login")
    public String login() {
        return "forward:/login.html";
    }

    @GetMapping("/signup")
    public String signup() {
        return "forward:/signup.html";
    }

    @GetMapping("/service-details")
    public String serviceDetails() {
        return "forward:/service-details.html";
    }

    @GetMapping("/booking")
    public String booking() {
        return "forward:/booking.html";
    }

    @GetMapping("/my-bookings")
    public String myBookings() {
        return "forward:/my-bookings.html";
    }

    @GetMapping("/profile")
    public String profile() {
        return "forward:/profile.html";
    }

    @GetMapping("/account")
    public String account() {
        return "forward:/account.html";
    }

    @GetMapping("/settings")
    public String settings() {
        return "forward:/settings.html";
    }

    @GetMapping("/admin")
    public String admin() {
        return "forward:/admin.html";
    }

    @GetMapping("/logout")
    public String logout() {
        return "forward:/logout.html";
    }
}
