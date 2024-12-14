package meowhub.backend.posts;

import meowhub.backend.posts.dtos.PostDto;
import meowhub.backend.posts.models.Post;
import meowhub.backend.posts.repositories.PostRepository;
import meowhub.backend.posts.services.impl.PostServiceImpl;
import meowhub.backend.users.dtos.BasicUserInfoDto;
import meowhub.backend.users.models.User;
import meowhub.backend.users.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class PostServiceImplTest {

    @Mock
    private PostRepository postRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private PostServiceImpl postService;

    private User user;
    private PostDto postDto;
    private Post post;
    private BasicUserInfoDto basicUserInfoDto;

    @BeforeEach
    void setUp() {
        // Setup mock user and post
        user = new User();
        user.setId("user-id");
        user.setLogin("john_doe");

        postDto = new PostDto();
        postDto.setId("post-id");
        postDto.setContent("Initial content");
        postDto.setAuthor(new BasicUserInfoDto());

        post = new Post();
        post.setId("post-id");
        post.setContentHtml("Initial content");
        post.setUser(user);

        basicUserInfoDto = new BasicUserInfoDto();
    }

    @Test
    void testGetPosts() {
        // Given
        Page<PostDto> mockPage = new PageImpl<>(List.of(postDto));
        when(postRepository.findIfPublicOrFriends(any(String.class), any(PageRequest.class))).thenReturn(mockPage);

        // When
        Page<PostDto> result = postService.getPosts("john_doe", 0, 10);

        // Then
        assertNotNull(result);
        assertEquals(1, result.getContent().size());
        verify(postRepository, times(1)).findIfPublicOrFriends(any(String.class), any(PageRequest.class));
    }

    @Test
    void testGetPostsForUser() {
        // Given
        Page<PostDto> mockPage = new PageImpl<>(List.of(postDto));
        when(userRepository.findByLogin("john_doe")).thenReturn(Optional.of(user));
        when(postRepository.findByUserLoginIfPublicOrFriend(any(String.class), any(String.class), any(PageRequest.class))).thenReturn(mockPage);
        when(postRepository.findOwn(any(String.class), any(PageRequest.class))).thenReturn(mockPage);

        // When
        Page<PostDto> resultOther = postService.getPostsForUser("john_doe", "user", 0, 10);
        Page<PostDto> resultOwn = postService.getPostsForUser("john_doe", "john_doe", 0, 10);

        // Then
        assertNotNull(resultOther);
        assertNotNull(resultOwn);
        assertEquals(1, resultOther.getContent().size());
        assertEquals(1, resultOwn.getContent().size());
        verify(postRepository, times(1)).findByUserLoginIfPublicOrFriend(any(String.class), any(String.class), any(PageRequest.class));
        verify(postRepository, times(1)).findOwn(any(String.class), any(PageRequest.class));
    }

    @Test
    void testCreatePost() {
        // Given
        when(userRepository.findByLogin("john_doe")).thenReturn(Optional.of(user));
        when(userRepository.findBasicUserInfoByLogin("john_doe")).thenReturn(Optional.of(basicUserInfoDto));
        when(postRepository.save(any(Post.class))).thenReturn(post);

        // When
        PostDto result = postService.createPost("john_doe", "New content");

        // Then
        assertNotNull(result);
        assertEquals("Initial content", result.getContent());
        verify(userRepository, times(1)).findByLogin("john_doe");
        verify(postRepository, times(1)).save(any(Post.class));
    }

    @Test
    void testUpdatePost() {
        // Given
        when(userRepository.findByLogin("john_doe")).thenReturn(Optional.of(user));
        when(userRepository.findBasicUserInfoByLogin("john_doe")).thenReturn(Optional.of(basicUserInfoDto));
        when(postRepository.save(any(Post.class))).thenReturn(post);
        when(postRepository.findByUserLoginAndId("john_doe", "post-id")).thenReturn(Optional.of(post));

        // When
        PostDto result = postService.updatePost("john_doe", "post-id", "Updated content");

        // Then
        assertNotNull(result);
        assertEquals("Updated content", result.getContent());
        verify(postRepository, times(1)).save(any(Post.class));
    }

    @Test
    void testDeletePost() {
        // Given
        when(userRepository.findByLogin("john_doe")).thenReturn(Optional.of(user));
        when(postRepository.findByUserLoginAndId("john_doe", "post-id")).thenReturn(Optional.of(post));

        // When
        postService.deletePost("john_doe", "post-id");

        // Then
        verify(postRepository, times(1)).delete(any(Post.class));
    }

    @Test
    void testCreatePost_UserNotFound() {
        // Given
        when(userRepository.findByLogin("unknown_user")).thenReturn(Optional.empty());

        // When & Then
        assertThrows(UsernameNotFoundException.class,
                () -> postService.createPost("unknown_user", "content"));
        verify(userRepository, times(1)).findByLogin("unknown_user");
    }
}

