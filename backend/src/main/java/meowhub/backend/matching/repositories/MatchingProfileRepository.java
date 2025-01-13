package meowhub.backend.matching.repositories;

import meowhub.backend.matching.models.MatchingProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface MatchingProfileRepository extends JpaRepository<MatchingProfile, String> {
    boolean existsByUserLogin(String login);
    Optional<MatchingProfile> findByUserLogin(String login);
}