package com.timenest.controller.api;

import com.timenest.dto.ApiResponse;
import com.timenest.dto.AuthResponse;
import com.timenest.dto.LoginRequest;
import com.timenest.dto.RegisterRequest;
import com.timenest.dto.UserDto;
import com.timenest.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthApiController {

    private final UserService userService;

    public AuthApiController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        AuthResponse response = userService.register(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = userService.login(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserDto>> getCurrentUser(
            @RequestHeader(value = "X-User-Id", required = false) Long userId,
            @RequestParam(value = "email", required = false) String email) {
        if (userId != null) {
            return ResponseEntity.ok(ApiResponse.ok("Current user retrieved", userService.getUserProfile(userId)));
        } else if (email != null && !email.trim().isEmpty()) {
            return ResponseEntity.ok(ApiResponse.ok("Current user retrieved", userService.getUserByEmail(email)));
        }
        return ResponseEntity.ok(ApiResponse.error("User not authenticated"));
    }
}
