package com.timenest.repository;

import com.timenest.entity.ServiceProvider;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceProviderRepository extends JpaRepository<ServiceProvider, Long> {

    List<ServiceProvider> findByCategory_CodeIgnoreCase(String categoryCode);

    List<ServiceProvider> findByCategory_CodeIgnoreCaseAndLocationIgnoreCase(String categoryCode, String location);

    List<ServiceProvider> findByLocationIgnoreCase(String location);

    @Query("SELECT p FROM ServiceProvider p WHERE " +
           "(:category IS NULL OR LOWER(p.category.code) = LOWER(:category)) AND " +
           "(:location IS NULL OR LOWER(p.location) = LOWER(:location)) AND " +
           "(:query IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(p.hospitalOrBusinessName) LIKE LOWER(CONCAT('%', :query, '%')))")
    List<ServiceProvider> searchProviders(@Param("category") String category,
                                          @Param("location") String location,
                                          @Param("query") String query);
}
