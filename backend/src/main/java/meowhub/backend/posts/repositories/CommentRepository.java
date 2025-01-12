package meowhub.backend.posts.repositories;

import meowhub.backend.posts.dtos.CommentDto;
import meowhub.backend.posts.models.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CommentRepository extends JpaRepository<Comment, String> {
    @Query("""
            SELECT COUNT(c.id) > 0
              FROM Comment c
             WHERE c.id = :commentId
               AND c.isDeleted = false
               AND c.user.login = :login
            """)
    boolean existsByIdAndUserLoginAndIsDeletedFalse(@Param("commentId")String commentId, @Param("login")String login);

    @Query("""
            SELECT c
              FROM Comment c
             WHERE c.id = :commentId
               AND c.isDeleted = false
            """)
    Comment findByIdAndIsDeletedFalse(String commentId);

    @Query("""
            SELECT new meowhub.backend.posts.dtos.CommentDto(
                c.id,
                c.post.id,
                c.answeredComment.id,
                (SELECT COUNT(c2.id)
                   FROM Comment c2
                  WHERE c2.answeredComment.id = c.id
                    AND c2.isDeleted = false),
                c.createdAt,
                c.modifiedAt,
                c.content,
                new meowhub.backend.users.dtos.BasicUserInfoDto(
                    c.user.id,
                    c.user.name,
                    c.user.surname,
                    c.user.login,
                    pp.ociUrl
                ),
                c.isDeleted
            )
              FROM Comment c
              LEFT JOIN ProfilePicture pp ON pp.profile.user.id = c.user.id AND pp.isCurrentProfilePicture = true
             WHERE c.post.id = :postId
               AND c.answeredComment IS NULL
             ORDER BY c.createdAt DESC
    """)
    Page<CommentDto> findCommentsForPost(@Param("postId") String postId, Pageable pageable);

    @Query("""
                    SELECT new meowhub.backend.posts.dtos.CommentDto(
                        c.id,
                        c.post.id,
                        c.answeredComment.id,
                        (SELECT COUNT(c2.id)
                           FROM Comment c2
                          WHERE c2.answeredComment.id = c.id
                            AND c2.isDeleted = false),
                        c.createdAt,
                        c.modifiedAt,
                        c.content,
                        new meowhub.backend.users.dtos.BasicUserInfoDto(
                            c.user.id,
                            c.user.name,
                            c.user.surname,
                            c.user.login,
                            pp.ociUrl
                        ),
                        c.isDeleted
                    )
                      FROM Comment c
                      LEFT JOIN ProfilePicture pp ON pp.profile.user.id = c.user.id AND pp.isCurrentProfilePicture = true
                     WHERE c.answeredComment.id = :commentId
                     ORDER BY c.createdAt DESC
            """)
    Page<CommentDto> findCommentsForComments(@Param("commentId") String commentId, Pageable pageable);

    @Query("""
            SELECT new meowhub.backend.posts.dtos.CommentDto(
                c.id,
                c.post.id,
                c.answeredComment.id,
                (SELECT COUNT(c2.id)
                   FROM Comment c2
                  WHERE c2.answeredComment.id = c.id
                    AND c2.isDeleted = false),
                c.createdAt,
                c.modifiedAt,
                c.content,
                new meowhub.backend.users.dtos.BasicUserInfoDto(
                    c.user.id,
                    c.user.name,
                    c.user.surname,
                    c.user.login,
                    pp.ociUrl
                ),
                c.isDeleted
            )
              FROM Comment c
              JOIN Post p ON p.id = c.post.id
              LEFT JOIN ProfilePicture pp ON pp.profile.user.id = c.user.id AND pp.isCurrentProfilePicture = true
             WHERE c.id = :commentId
            """)
    CommentDto findComment(@Param("commentId") String commentId);
}