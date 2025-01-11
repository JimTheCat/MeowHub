package meowhub.backend.profiles.repositories;

import meowhub.backend.profiles.models.ProfilePicture;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ProfilePictureRepository extends JpaRepository<ProfilePicture, String> {
    Optional<ProfilePicture> findByProfileIdAndIsCurrentProfilePicture(String profileId, Boolean currentProfilePicture);

    @Query("""
            SELECT pp.ociUrl
              FROM ProfilePicture pp
              WHERE pp.profile.user.login = :login
              UNION
            SELECT pp.ociUrl
              FROM PostPicture pp
             WHERE pp.post.user.login = :login
            """)
    Page<String> getOwnMedia(@Param("login") String login, Pageable pageable);

    @Query("""
            SELECT pp.ociUrl
              FROM ProfilePicture pp
              JOIN User u ON pp.profile.user.id = u.id
              WHERE u.login = :login
                AND u.profilePrivacy.code = 'PUBLIC' OR (u.profilePrivacy.code = 'FRIENDS_ONLY'
                                                    AND (SELECT COUNT(*)
                                                           FROM UserRelation ur
                                                          WHERE ur.relationType.code = 'FRIENDS'
                                                            AND (ur.receiver.id = u.id AND ur.sender.login = :requesterLogin)
                                                            AND (ur.receiver.login = :requesterLogin AND ur.sender.id = u.id)) > 0)
              UNION
            SELECT pp.ociUrl
              FROM PostPicture pp
              JOIN User u ON pp.post.user.id = u.id
             WHERE pp.post.user.login = :login
               AND u.postsPrivacy.code = 'PUBLIC' OR (u.profilePrivacy.code = 'FRIENDS_ONLY'
                                                    AND (SELECT COUNT(*)
                                                           FROM UserRelation ur
                                                          WHERE ur.relationType.code = 'FRIENDS'
                                                            AND (ur.receiver.id = u.id AND ur.sender.login = :requesterLogin)
                                                            AND (ur.receiver.login = :requesterLogin AND ur.sender.id = u.id)) > 0)
            """)
    Page<String> getAnotherUserMediaIfPublicOrFriends(@Param("login") String login, @Param("requesterLogin") String requesterLogin, Pageable pageable);
}