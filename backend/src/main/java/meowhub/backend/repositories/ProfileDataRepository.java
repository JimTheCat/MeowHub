package meowhub.backend.repositories;

import meowhub.backend.jpa_buddy.ProfileData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileDataRepository extends JpaRepository<ProfileData, String> {
}