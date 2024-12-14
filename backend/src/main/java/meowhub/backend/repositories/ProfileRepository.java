package meowhub.backend.repositories;

import meowhub.backend.jpa_buddy.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileRepository extends JpaRepository<Profile, String> {
}