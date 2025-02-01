package meowhub.backend.matching.repositories;

import meowhub.backend.matching.models.MatchingProfilePicture;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MatchingProfilePictureRepository extends JpaRepository<MatchingProfilePicture, String> {
    boolean existsByIdAndMatchingProfileUserLogin(String id, String login);

    int countAllByMatchingProfileId(String id);

    Optional<MatchingProfilePicture> findByMatchingProfileUserLoginAndIsCurrentProfilePictureTrue(String id);

    List<MatchingProfilePicture> findByMatchingProfileUserLogin(String login);
}