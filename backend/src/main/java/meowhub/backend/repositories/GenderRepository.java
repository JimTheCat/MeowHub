package meowhub.backend.repositories;

import meowhub.backend.jpa_buddy.Gender;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GenderRepository extends JpaRepository<Gender, String> {
    Optional<Gender> findByCode(String code);
}