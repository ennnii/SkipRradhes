package com.SkipRradhes.repository;

import com.SkipRradhes.model.Business;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface BusinessRepository extends JpaRepository<Business, Long> {
    Optional<Business> findByBranch(String branch);
}