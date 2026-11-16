package com.timenest.controller.api;

import com.timenest.dto.ApiResponse;
import com.timenest.dto.ChangePasswordRequest;
import com.timenest.dto.UpdateProfileRequest;
import com.timenest.dto.UserDto;
import com.timenest.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserApiController {

    private final UserService userService;

    public UserApiController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<UserDto>> getProfile(
            @RequestHeader(value = "X-User-Id", required = false) Long userId,
            @RequestParam(value = "id", required = false) Long paramId) {
        Long id = userId != null ? userId : paramId;
        if (id == null) {
            return ResponseEntity.badRequest().body(ApiResponse.error("User ID is required"));
        }
        UserDto profile = userService.getUserProfile(id);
        return ResponseEntity.ok(ApiResponse.ok("User profile retrieved", profile));
    }

    @PutMapping("/profile")
    public ResponseEntity<ApiResponse<UserDto>> updateProfile(
            @RequestHeader(value = "X-User-Id", required = false) Long userId,
            @RequestParam(value = "id", required = false) Long paramId,
            @Valid @RequestBody UpdateProfileRequest request) {
        Long id = userId != null ? userId : paramId;
        if (id == null) {
            return ResponseEntity.badRequest().body(ApiResponse.error("User ID is required"));
        }
        UserDto updated = userService.updateProfile(id, request);
        return ResponseEntity.ok(ApiResponse.ok("Profile updated successfully", updated));
    }

    @PostMapping("/change-password")
    public ResponseEntity<ApiResponse<Void>> changePassword(
            @RequestHeader(value = "X-User-Id", required = false) Long userId,
            @RequestParam(value = "id", required = false) Long paramId,
            @Valid @RequestBody ChangePasswordRequest request) {
        Long id = userId != null ? userId : paramId;
        if (id == null) {
            return ResponseEntity.badRequest().body(ApiResponse.error("User ID is required"));
        }
        userService.changePassword(id, request);
        return ResponseEntity.ok(ApiResponse.ok("Password changed successfully"));
    }
}
