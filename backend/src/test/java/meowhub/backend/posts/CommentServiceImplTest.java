package meowhub.backend.posts;

import meowhub.backend.posts.dtos.CommentDto;
import meowhub.backend.posts.models.Comment;
import meowhub.backend.posts.models.Post;
import meowhub.backend.posts.repositories.CommentRepository;
import meowhub.backend.posts.repositories.PostRepository;
import meowhub.backend.posts.services.impl.CommentServiceImpl;
import meowhub.backend.shared.constants.AlertConstants;
import meowhub.backend.users.facades.UserPostServiceFacade;
import meowhub.backend.users.models.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.webjars.NotFoundException;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

class CommentServiceImplTest {

    @Mock
    private PostRepository postRepository;

    @Mock
    private CommentRepository commentRepository;

    @Mock
    private UserPostServiceFacade userPostServiceFacade;

    private CommentServiceImpl commentService;

    private User user;
    private Comment comment;
    private CommentDto commentDto;
    private Post post;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
        commentService = new CommentServiceImpl(postRepository, commentRepository, userPostServiceFacade);

        user = new User();
        user.setId("user-id");
        user.setLogin("john_doe");

        post = new Post();
        post.setId("post-id");

        comment = new Comment();
        comment.setId("comment-id");
        comment.setContent("Initial comment content");
        comment.setUser(user);
        comment.setPost(post);

        commentDto = new CommentDto();
        commentDto.setId("comment-id");
        commentDto.setContent("Initial comment content");
    }

    @Test
    void testGetCommentsForPost() {
        Page<CommentDto> mockPage = new PageImpl<>(List.of(commentDto));
        when(postRepository.isPostPublicOrUserHasAccessToPost(eq("post-id"), eq("john_doe"))).thenReturn(true);
        when(commentRepository.findCommentsForPost(eq("post-id"), any(PageRequest.class))).thenReturn(mockPage);

        Page<CommentDto> result = commentService.getCommentsForPost("post-id", "john_doe", 0, 10);

        assertNotNull(result);
        assertEquals(1, result.getContent().size());
        verify(postRepository, times(1)).isPostPublicOrUserHasAccessToPost(eq("post-id"), eq("john_doe"));
        verify(commentRepository, times(1)).findCommentsForPost(eq("post-id"), any(PageRequest.class));
    }

    @Test
    void testCreateComment() {
        when(postRepository.isPostPublicOrUserHasAccessToPost(eq("post-id"), eq("john_doe"))).thenReturn(true);
        when(userPostServiceFacade.findUserByLogin(eq("john_doe"))).thenReturn(user);
        when(postRepository.findById(eq("post-id"))).thenReturn(Optional.of(post));
        when(commentRepository.save(any(Comment.class))).thenReturn(comment);
        when(commentRepository.findComment(eq("comment-id"))).thenReturn(commentDto);

        CommentDto result = commentService.createComment("john_doe", "post-id", "This is a comment");

        assertNotNull(result);
        assertEquals("Initial comment content", result.getContent());
        verify(postRepository, times(1)).isPostPublicOrUserHasAccessToPost(eq("post-id"), eq("john_doe"));
        verify(commentRepository, times(1)).save(any(Comment.class));
    }

    @Test
    void testUpdateComment() {
        when(commentRepository.existsByIdAndUserLoginAndIsDeletedFalse(eq("comment-id"), eq("john_doe"))).thenReturn(true);
        when(postRepository.isPostPublicOrUserHasAccessToPostByCommentId(eq("comment-id"), eq("john_doe"))).thenReturn(true);
        when(commentRepository.findByIdAndIsDeletedFalse(eq("comment-id"))).thenReturn(comment);
        when(commentRepository.save(any(Comment.class))).thenReturn(comment);
        when(commentRepository.findComment(eq("comment-id"))).thenReturn(commentDto);

        CommentDto result = commentService.updateComment("john_doe", "comment-id", "Updated content");

        assertNotNull(result);
        assertEquals("Initial comment content", result.getContent());
        verify(commentRepository, times(1)).save(any(Comment.class));
    }

    @Test
    void testDeleteComment() {
        when(commentRepository.existsByIdAndUserLoginAndIsDeletedFalse(eq("comment-id"), eq("john_doe"))).thenReturn(true);
        when(postRepository.isPostPublicOrUserHasAccessToPostByCommentId(eq("comment-id"), eq("john_doe"))).thenReturn(true);
        when(commentRepository.findByIdAndIsDeletedFalse(eq("comment-id"))).thenReturn(comment);

        commentService.deleteComment("john_doe", "comment-id");

        verify(commentRepository, times(1)).save(any(Comment.class));
    }

    @Test
    void testCreateComment_PostNotFound() {
        when(postRepository.isPostPublicOrUserHasAccessToPost(eq("invalid-post-id"), eq("john_doe"))).thenReturn(false);

        Exception exception = assertThrows(NotFoundException.class,
                () -> commentService.createComment("john_doe", "invalid-post-id", "Comment content"));

        assertEquals(String.format(AlertConstants.RESOURCE_NOT_FOUND, "Post", "postId", "invalid-post-id"), exception.getMessage());
        verify(postRepository, times(1)).isPostPublicOrUserHasAccessToPost(eq("invalid-post-id"), eq("john_doe"));
    }
}

