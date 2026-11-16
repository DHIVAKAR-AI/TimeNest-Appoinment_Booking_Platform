package com.timenest.service;

import com.timenest.entity.ServiceCategory;
import com.timenest.exception.ResourceNotFoundException;
import com.timenest.repository.ServiceCategoryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class ServiceCategoryService {

    private final ServiceCategoryRepository categoryRepository;

    public ServiceCategoryService(ServiceCategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<ServiceCategory> getAllCategories() {
        return categoryRepository.findAllByOrderByDisplayOrderAsc();
    }

    public ServiceCategory getCategoryByCode(String code) {
        return categoryRepository.findByCodeIgnoreCase(code)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with code: " + code));
    }

    @Transactional
    public ServiceCategory saveCategory(ServiceCategory category) {
        return categoryRepository.save(category);
    }
}
