package meowhub.backend.profiles.repositories;

import meowhub.backend.profiles.models.ProfilePicture;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProfilePictureRepository extends JpaRepository<ProfilePicture, String> {
    Optional<ProfilePicture> findByProfileIdAndIsCurrentProfilePicture(String profileId, Boolean currentProfilePicture);
}