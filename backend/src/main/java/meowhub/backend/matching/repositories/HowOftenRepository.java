package meowhub.backend.matching.repositories;

import meowhub.backend.matching.models.HowOften;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface HowOftenRepository extends JpaRepository<HowOften, String> {
    Optional<HowOften> findByCode (String code);
}