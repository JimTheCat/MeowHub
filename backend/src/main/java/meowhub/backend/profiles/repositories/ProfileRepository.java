package meowhub.backend.profiles.repositories;

import meowhub.backend.profiles.dtos.ProfileDto;
import meowhub.backend.profiles.models.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ProfileRepository extends JpaRepository<Profile, String> {

    @Query("""
        SELECT new meowhub.backend.profiles.dtos.ProfileDto(pp.ociUrl, p.profileDetailsHtml, p.user.createdAt, p.user.gender.code)
          FROM Profile p
          LEFT JOIN ProfilePicture pp ON pp.profile.id = p.id AND pp.isCurrentProfilePicture = true
        WHERE p.user.login = :login
       """)
    ProfileDto getOwnProfile(@Param("login")  String login);

    @Query("""
        SELECT new meowhub.backend.profiles.dtos.ProfileDto(pp.ociUrl, p.profileDetailsHtml, p.user.createdAt, p.user.gender.code)
          FROM Profile p
          LEFT JOIN ProfilePicture pp ON pp.profile.id = p.id AND pp.isCurrentProfilePicture = true
          JOIN User u ON u.id = p.user.id
          JOIN u.profilePrivacy profilePrivacy
        WHERE u.login = :login
                  AND (profilePrivacy.code = 'PUBLIC'
                       OR (profilePrivacy.code = 'FRIENDS_ONLY' AND u.id IN (
                            SELECT r.receiver.id
                            FROM User sender
                            JOIN sender.userRelationsSender r
                            JOIN r.relationType relType
                            WHERE relType.code = 'FRIENDS'
                              AND sender.login = :requestedBy
                            UNION
                            SELECT r.sender.id
                            FROM User receiver
                            JOIN receiver.userRelationsReceiver r
                            JOIN r.relationType relType
                            WHERE relType.code = 'FRIENDS'
                              AND receiver.login = :requestedBy)
                       )) ORDER BY p.createdAt DESC
            """)
    ProfileDto getProfileIfPublicOrFriends(@Param("login") String login, @Param("requestedBy") String requestedBy);

    Optional<Profile> findByUserLogin(String login);
}