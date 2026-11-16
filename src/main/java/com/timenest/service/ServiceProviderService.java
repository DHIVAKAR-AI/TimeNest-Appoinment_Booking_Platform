package com.timenest.service;

import com.timenest.entity.ServiceProvider;
import com.timenest.exception.ResourceNotFoundException;
import com.timenest.repository.ServiceProviderRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class ServiceProviderService {

    private final ServiceProviderRepository providerRepository;

    public ServiceProviderService(ServiceProviderRepository providerRepository) {
        this.providerRepository = providerRepository;
    }

    public List<ServiceProvider> getAllProviders() {
        return providerRepository.findAll();
    }

    public ServiceProvider getProviderById(Long id) {
        return providerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Service Provider not found with id: " + id));
    }

    public List<ServiceProvider> searchProviders(String category, String location, String query) {
        String catParam = (category != null && !category.trim().isEmpty() && !category.equalsIgnoreCase("all")) ? category.trim() : null;
        String locParam = (location != null && !location.trim().isEmpty() && !location.equalsIgnoreCase("all")) ? location.trim().toLowerCase() : null;
        String queryParam = (query != null && !query.trim().isEmpty()) ? query.trim() : null;

        if (catParam == null && locParam == null && queryParam == null) {
            return providerRepository.findAll();
        }

        return providerRepository.searchProviders(catParam, locParam, queryParam);
    }

    @Transactional
    public ServiceProvider saveProvider(ServiceProvider provider) {
        return providerRepository.save(provider);
    }

    @Transactional
    public void deleteProvider(Long id) {
        if (!providerRepository.existsById(id)) {
            throw new ResourceNotFoundException("Provider not found with id: " + id);
        }
        providerRepository.deleteById(id);
    }
}
