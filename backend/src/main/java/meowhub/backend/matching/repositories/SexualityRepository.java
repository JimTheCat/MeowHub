package meowhub.backend.matching.repositories;

import meowhub.backend.matching.models.Sexuality;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SexualityRepository extends JpaRepository<Sexuality, String> {
    Optional<Sexuality> findByCode(String code);
}