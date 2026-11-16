package com.timenest.repository;

import com.timenest.entity.ServiceCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ServiceCategoryRepository extends JpaRepository<ServiceCategory, Long> {
    Optional<ServiceCategory> findByCodeIgnoreCase(String code);
    List<ServiceCategory> findAllByOrderByDisplayOrderAsc();
}
