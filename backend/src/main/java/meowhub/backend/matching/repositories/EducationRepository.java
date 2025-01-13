package meowhub.backend.matching.repositories;

import meowhub.backend.matching.models.Education;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EducationRepository extends JpaRepository<Education, String> {
  Optional<Education> findByCode(String code);
}