package meowhub.backend.matching.repositories;

import meowhub.backend.matching.models.LookingFor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LookingForRepository extends JpaRepository<LookingFor, String> {
    Optional<LookingFor> findByCode(String code);
}