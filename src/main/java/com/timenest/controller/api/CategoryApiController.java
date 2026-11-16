package com.timenest.controller.api;

import com.timenest.dto.ApiResponse;
import com.timenest.entity.ServiceCategory;
import com.timenest.service.ServiceCategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "*")
public class CategoryApiController {

    private final ServiceCategoryService categoryService;

    public CategoryApiController(ServiceCategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<ServiceCategory>>> getAllCategories() {
        List<ServiceCategory> categories = categoryService.getAllCategories();
        return ResponseEntity.ok(ApiResponse.ok("Categories retrieved successfully", categories));
    }

    @GetMapping("/{code}")
    public ResponseEntity<ApiResponse<ServiceCategory>> getCategoryByCode(@PathVariable String code) {
        ServiceCategory category = categoryService.getCategoryByCode(code);
        return ResponseEntity.ok(ApiResponse.ok("Category retrieved successfully", category));
    }
}
