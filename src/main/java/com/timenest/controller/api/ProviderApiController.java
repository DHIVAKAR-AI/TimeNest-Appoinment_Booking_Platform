package com.timenest.controller.api;

import com.timenest.dto.ApiResponse;
import com.timenest.entity.ServiceProvider;
import com.timenest.service.ServiceProviderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/providers")
@CrossOrigin(origins = "*")
public class ProviderApiController {

    private final ServiceProviderService providerService;

    public ProviderApiController(ServiceProviderService providerService) {
        this.providerService = providerService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<ServiceProvider>>> getAllProviders() {
        List<ServiceProvider> providers = providerService.getAllProviders();
        return ResponseEntity.ok(ApiResponse.ok("Providers retrieved successfully", providers));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ServiceProvider>> getProviderById(@PathVariable Long id) {
        ServiceProvider provider = providerService.getProviderById(id);
        return ResponseEntity.ok(ApiResponse.ok("Provider retrieved successfully", provider));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<ServiceProvider>>> searchProviders(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String query) {
        List<ServiceProvider> providers = providerService.searchProviders(category, location, query);
        return ResponseEntity.ok(ApiResponse.ok("Providers matching search criteria", providers));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ServiceProvider>> createProvider(@RequestBody ServiceProvider provider) {
        ServiceProvider saved = providerService.saveProvider(provider);
        return ResponseEntity.ok(ApiResponse.ok("Provider created successfully", saved));
    }
}
