package meowhub.backend.user_relations.repositories;

import meowhub.backend.user_relations.models.UserRelation;
import meowhub.backend.users.dtos.BasicUserInfoDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface UserRelationRepository extends JpaRepository<UserRelation, String> {
    @Query(value = """
                SELECT new meowhub.backend.users.dtos.BasicUserInfoDto (
                    receiver.id,
                    receiver.name,
                    receiver.surname,
                    receiver.login,
                    pp.ociUrl
                )
                 FROM UserRelation relation
                 JOIN User sender ON relation.sender.id = sender.id
                 JOIN User receiver ON relation.receiver.id = receiver.id
                 LEFT JOIN Profile p ON p.user.id = receiver.id
                 LEFT JOIN ProfilePicture pp ON pp.profile.id = p.id AND pp.isCurrentProfilePicture = true
                WHERE sender.login = :login
                  AND relation.relationType.code = :relationTypeCode
            """)
    Page<BasicUserInfoDto> findRelationsFor(@Param("login") String login, @Param("relationTypeCode") String relationTypeCode, Pageable pageable);

    @Query(value = """
                SELECT new meowhub.backend.users.dtos.BasicUserInfoDto (
                    sender.id,
                    sender.name,
                    sender.surname,
                    sender.login,
                    pp.ociUrl
                )
                 FROM UserRelation relation
                 JOIN User sender ON relation.sender.id = sender.id
                 JOIN User receiver ON relation.receiver.id = receiver.id
                 LEFT JOIN Profile p ON p.user.id = sender.id
                 LEFT JOIN ProfilePicture pp ON pp.profile.id = p.id AND pp.isCurrentProfilePicture = true
                WHERE receiver.login = :login
                  AND relation.relationType.code = :relationTypeCode
            """)
    Page<BasicUserInfoDto> findRelationsWhereReceiverIs(@Param("login") String receiverLogin, @Param("relationTypeCode") String relationTypeCode, Pageable pageable);

    @Query(value = """
                SELECT new meowhub.backend.users.dtos.BasicUserInfoDto (
                    sender.id,
                    sender.name,
                    sender.surname,
                    sender.login,
                    pp.ociUrl
                )
                 FROM UserRelation relation
                 JOIN User sender ON relation.sender.id = sender.id
                 JOIN User receiver ON relation.receiver.id = receiver.id
                 LEFT JOIN Profile p ON p.user.id = sender.id
                 LEFT JOIN ProfilePicture pp ON pp.profile.id = p.id AND pp.isCurrentProfilePicture = true
                WHERE receiver.login = :login
                  AND relation.relationType.code = 'FRIENDS'
                UNION
                SELECT new meowhub.backend.users.dtos.BasicUserInfoDto (
                    receiver.id,
                    receiver.name,
                    receiver.surname,
                    receiver.login,
                    pp.ociUrl
                )
                 FROM UserRelation relation
                 JOIN User sender ON relation.sender.id = sender.id
                 JOIN User receiver ON relation.receiver.id = receiver.id
                 LEFT JOIN Profile p ON p.user.id = sender.id
                 LEFT JOIN ProfilePicture pp ON pp.profile.id = p.id AND pp.isCurrentProfilePicture = true
                WHERE sender.login = :login
                  AND relation.relationType.code = 'FRIENDS'
            """)
    Page<BasicUserInfoDto> findFriendsFor (@Param("login") String login, Pageable pageable);


        @Modifying
        @Query("""
                UPDATE UserRelation relation
                   SET relation.relationType = (SELECT r FROM RelationType r WHERE r.code = :relationTypeCode), 
                       relation.answerDate = CURRENT_TIMESTAMP
                 WHERE relation.sender.login = :updateRelationWithLogin AND relation.receiver.login = :currentlyLoggedUserLogin
                   AND relation.relationType.code = 'SENT_INVITATION'
                """)
        void updateRelationType(@Param("relationTypeCode") String relationTypeCode, @Param("updateRelationWithLogin") String updateRelationWithLogin, @Param("currentlyLoggedUserLogin") String currentlyLoggedUserLogin);


        boolean existsUserRelationBySenderLoginAndReceiverLoginAndRelationTypeCode(String senderLogin, String receiverLogin, String relationTypeCode);

    /***
     * Deletes friend relation between two users. The relation is symmetric, so it doesn't matter who is the sender and who is the receiver.
     * @param login
     * @param requesterLogin
     */
    @Modifying
        @Query("""
                DELETE
                  FROM UserRelation relation 
                 WHERE (relation.sender.login = :requesterLogin 
                   AND relation.receiver.login = :login) 
                    OR (relation.receiver.login = :requesterLogin 
                   AND relation.sender.login = :login)
                """)
        void deleteFriend(@Param("login") String login, @Param("requesterLogin") String requesterLogin);

    void deleteBySenderLoginAndReceiverLogin(String senderLogin, String receiverLogin);

    @Query("""
            SELECT
                CASE WHEN EXISTS (
                    SELECT 1
                      FROM User requestedUser
                    WHERE requestedUser.login = :requestedLogin
                      AND (requestedUser.friendsPrivacy.code = 'PUBLIC'
                      OR (requestedUser.friendsPrivacy.code = 'FRIENDS'
                         AND EXISTS (
                            SELECT 1
                              FROM UserRelation relation
                             WHERE relation.relationType.code = 'FRIENDS'
                               AND (relation.sender.login = :requestedLogin AND relation.receiver.login = :requestedBy
                                    OR
                                    relation.sender.login = :requestedBy AND relation.receiver.login = :requestedLogin)
                         )
                      )
                )
                ) THEN true ELSE false END
        """)
    boolean canViewUserPosts(@Param("requestedLogin") String requestedLogin, @Param("requestedBy") String requestedBy);
}