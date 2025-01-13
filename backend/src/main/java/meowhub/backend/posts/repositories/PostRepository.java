package meowhub.backend.posts.repositories;

import meowhub.backend.posts.dtos.PostDto;
import meowhub.backend.posts.models.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<Post, String> {
    Optional<Post> findById(String id);

    @Query(value = """
                SELECT new meowhub.backend.posts.dtos.PostDto (
                    p.id,
                    p.contentHtml,
                    new meowhub.backend.users.dtos.BasicUserInfoDto (
                        u.id,
                        u.name,
                        u.surname,
                        u.login,
                        pp.ociUrl
                    ),
                    (SELECT COUNT(c.id) FROM Comment c WHERE c.post.id = p.id),
                    p.createdAt
                )
                FROM User u
                JOIN u.posts p
                LEFT JOIN Profile profile ON profile.user.id = u.id
                LEFT JOIN ProfilePicture pp ON pp.profile.id = profile.id
                LEFT JOIN u.postsPrivacy postsPrivacy
                WHERE postsPrivacy.code = 'PUBLIC'
                       OR (postsPrivacy.code = 'FRIENDS_ONLY' AND u.id IN (u.id,
                            (SELECT r.receiver.id
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
                              AND receiver.login = :requestedBy
                       )))
            """)
    Page<PostDto> findIfPublicOrFriends(@Param("requestedBy") String requestedBy, Pageable pageable);

    @Query("""
                SELECT new meowhub.backend.posts.dtos.PostDto (
                    p.id,
                    p.contentHtml,
                    new meowhub.backend.users.dtos.BasicUserInfoDto (
                        u.id,
                        u.name,
                        u.surname,
                        u.login,
                        pp.ociUrl
                    ),
                    (SELECT COUNT(c.id) FROM Comment c WHERE c.post.id = p.id),
                    p.createdAt
                )
                FROM User u
                JOIN u.posts p
                LEFT JOIN Profile profile ON profile.user.id = u.id
                LEFT JOIN ProfilePicture pp ON pp.profile.id = profile.id
                LEFT JOIN u.postsPrivacy postsPrivacy
                WHERE u.login = :login
                  AND (postsPrivacy.code = 'PUBLIC'
                       OR (postsPrivacy.code = 'FRIENDS_ONLY' AND u.id IN (
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
    Page<PostDto> findByUserLoginIfPublicOrFriend(@Param("login") String login, @Param("requestedBy") String requestedBy, Pageable pageable);

    @Query("""
                SELECT new meowhub.backend.posts.dtos.PostDto (
                    p.id,
                    p.contentHtml,
                    new meowhub.backend.users.dtos.BasicUserInfoDto (
                        u.id,
                        u.name,
                        u.surname,
                        u.login,
                        pp.ociUrl
                    ),
                    (SELECT COUNT(c.id) FROM Comment c WHERE c.post.id = p.id),
                    p.createdAt
                )
                FROM User u
                JOIN u.posts p
                LEFT JOIN Profile profile ON profile.user.id = u.id
                LEFT JOIN ProfilePicture pp ON pp.profile.id = profile.id AND pp.isCurrentProfilePicture = true
                LEFT JOIN u.postsPrivacy postsPrivacy
                WHERE u.login = :login
                ORDER BY p.createdAt DESC
            """)
    Page<PostDto> findOwn(@Param("login") String login, Pageable pageable);


    @Query("""
            SELECT CASE WHEN COUNT(p) > 0 THEN TRUE ELSE FALSE END
              FROM Comment c
              JOIN Post p ON p.id = c.post.id
             WHERE c.id = :commentId
                AND (p.user.postsPrivacy.code = 'PUBLIC'
                OR (p.user.postsPrivacy.code = 'FRIENDS_ONLY' AND (SELECT COUNT(*)
                                                                     FROM UserRelation ur
                                                                    WHERE ((ur.receiver.login = p.user.login AND ur.sender.login = :login)
                                                                       OR (ur.sender.login = p.user.login AND ur.receiver.login = :login))
                                                                      AND ur.relationType.code = 'FRIENDS') > 0))
            """)
    boolean isPostPublicOrUserHasAccessToPostByCommentId(@Param("commentId")String commentId, @Param("login") String login);

    @Query("""
            SELECT CASE WHEN COUNT(p) > 0 THEN TRUE ELSE FALSE END
              FROM Post p
             WHERE p.id = :postId
                AND (p.user.postsPrivacy.code = 'PUBLIC'
                OR (p.user.postsPrivacy.code = 'FRIENDS_ONLY' AND (SELECT COUNT(*)
                                                                     FROM UserRelation ur
                                                                    WHERE ((ur.receiver.login = p.user.login AND ur.sender.login = :login)
                                                                       OR (ur.sender.login = p.user.login AND ur.receiver.login = :login))
                                                                      AND ur.relationType.code = 'FRIENDS') > 0))
            """)
    boolean isPostPublicOrUserHasAccessToPost(@Param("postId")String postId, @Param("login") String login);}