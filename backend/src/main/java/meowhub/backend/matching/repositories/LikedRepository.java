package meowhub.backend.matching.repositories;

import meowhub.backend.matching.dtos.BasicMatchingProfileInfoDto;
import meowhub.backend.matching.models.Liked;
import meowhub.backend.matching.models.MatchingProfile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface LikedRepository extends JpaRepository<Liked, String> {
    @Query("""
            SELECT new meowhub.backend.matching.dtos.BasicMatchingProfileInfoDto (
                liked.receiver.id,
                liked.receiver.name,
                pp.ociUrl
            )
             FROM MatchingProfile mp
             JOIN Liked liked on liked.sender.id = mp.id
             LEFT JOIN MatchingProfilePicture pp ON pp.matchingProfile.id = liked.receiver.id AND pp.isCurrentProfilePicture = true
            WHERE mp.user.login = :login
              AND liked.likeType.code = :likeType
            """)
    Page<BasicMatchingProfileInfoDto> getLikedUsers(@Param("login") String login, @Param("likeType") String likeType, Pageable pageable);

    Optional<Liked> findBySenderAndReceiver(MatchingProfile sender, MatchingProfile receiver);
}