package meowhub.backend.posts;

import meowhub.backend.InitDataTestConfig;
import meowhub.backend.posts.dtos.CommentDto;
import meowhub.backend.posts.models.Comment;
import meowhub.backend.posts.models.Post;
import meowhub.backend.posts.repositories.CommentRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.ActiveProfiles;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

@DataJpaTest
@ActiveProfiles("test")
@Import(InitDataTestConfig.class)
class CommentRepositoryIntegrationTest {
    @Autowired
    private CommentRepository commentRepository;

    private static final String USER_LOGIN = "user";
    private static final String OTHER_USER_LOGIN = "admin";
    private static final Pageable pageable = Pageable.unpaged();

    @Test
    void testExistsByIdAndUserLoginAndIsDeletedFalse() {
        // Find a comment created by the user
        String commentId = commentRepository.findAll()
                .stream()
                .filter(comment -> comment.getUser().getLogin().equals(USER_LOGIN))
                .findFirst()
                .get()
                .getId();

        boolean exists = commentRepository.existsByIdAndUserLoginAndIsDeletedFalse(commentId, USER_LOGIN);
        assertTrue(exists);

        boolean doesNotExist = commentRepository.existsByIdAndUserLoginAndIsDeletedFalse(commentId, OTHER_USER_LOGIN);
        assertFalse(doesNotExist);
    }

    @Test
    void testFindByIdAndIsDeletedFalse() {
        String commentId = commentRepository.findAll()
                .stream()
                .filter(comment -> !comment.getIsDeleted())
                .findFirst()
                .get()
                .getId();

        Comment comment = commentRepository.findByIdAndIsDeletedFalse(commentId);
        assertNotNull(comment);
        assertEquals(commentId, comment.getId());
    }

    @Test
    void testFindCommentsForPost() {
        String postId = commentRepository.findAll()
                .stream()
                .map(Comment::getPost)
                .map(Post::getId)
                .findFirst()
                .orElseThrow();

        Page<CommentDto> comments = commentRepository.findCommentsForPost(postId, pageable);
        assertNotNull(comments);
        assertTrue(comments.stream().allMatch(commentDto -> commentDto.getPostId().equals(postId)));
    }

    @Test
    void testFindCommentsForComments() {
        String parentCommentId = commentRepository.findAll()
                .stream()
                .filter(comment -> comment.getAnsweredComment() != null)
                .map(comment -> comment.getAnsweredComment().getId())
                .findFirst()
                .orElseThrow();

        Page<CommentDto> replies = commentRepository.findCommentsForComments(parentCommentId, pageable);
        assertNotNull(replies);
        assertTrue(replies.stream().allMatch(reply -> reply.getParentId().equals(parentCommentId)));
    }

    @Test
    void testFindComment() {
        String commentId = commentRepository.findAll()
                .stream()
                .map(Comment::getId)
                .findFirst()
                .orElseThrow();

        Optional<Comment> comment = commentRepository.findById(commentId);

        CommentDto commentDto = commentRepository.findComment(commentId);
        assertNotNull(commentDto);
        assertEquals(commentId, commentDto.getId());
    }
}

