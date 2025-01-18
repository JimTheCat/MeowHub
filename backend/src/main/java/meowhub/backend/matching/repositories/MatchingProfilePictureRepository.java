package meowhub.backend.matching.repositories;

import meowhub.backend.matching.models.MatchingProfilePicture;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MatchingProfilePictureRepository extends JpaRepository<MatchingProfilePicture, String> {
    boolean existsByIdAndMatchingProfileUserLogin(String id, String login);
    int countAllByMatchingProfileId(String id);
}