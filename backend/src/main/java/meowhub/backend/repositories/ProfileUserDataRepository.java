package meowhub.backend.repositories;

import meowhub.backend.jpa_buddy.ProfileUserData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileUserDataRepository extends JpaRepository<ProfileUserData, String> {
}