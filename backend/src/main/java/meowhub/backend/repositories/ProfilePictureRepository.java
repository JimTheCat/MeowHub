package meowhub.backend.repositories;

import meowhub.backend.jpa_buddy.ProfilePicture;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfilePictureRepository extends JpaRepository<ProfilePicture, String> {
}