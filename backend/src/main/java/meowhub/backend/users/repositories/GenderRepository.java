package meowhub.backend.users.repositories;

import meowhub.backend.users.models.Gender;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GenderRepository extends JpaRepository<Gender, String> {
    Optional<Gender> findByCode(String code);
}