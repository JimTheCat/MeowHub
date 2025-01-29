package meowhub.backend.posts;

import meowhub.backend.posts.dtos.PostDto;
import meowhub.backend.posts.models.Post;
import meowhub.backend.posts.repositories.PostPictureRepository;
import meowhub.backend.posts.repositories.PostRepository;
import meowhub.backend.posts.services.impl.PostServiceImpl;
import meowhub.backend.shared.utils.PictureUtils;
import meowhub.backend.users.dtos.BasicUserInfoDto;
import meowhub.backend.users.facades.UserPostServiceFacade;
import meowhub.backend.users.models.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.mockito.Mock;
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

class PostServiceImplTest {

    @Mock
    private PostRepository postRepository;

    @Mock
    private PostPictureRepository postPictureRepository;

    @Mock
    private UserPostServiceFacade userPostServiceFacade;

    @Mock
    private PictureUtils pictureUtils;

    private PostServiceImpl postService;

    private User user;
    private PostDto postDto;
    private Post post;
    private BasicUserInfoDto basicUserInfoDto;

    @BeforeEach
    void setUp() {
        // Ręczne inicjalizowanie mocków
        MockitoAnnotations.initMocks(this);
        postService = new PostServiceImpl(userPostServiceFacade, postRepository, pictureUtils, postPictureRepository);

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
        when(userPostServiceFacade.findUserByLogin("john_doe")).thenReturn(user);
        when(userPostServiceFacade.getBasicUserInfo("john_doe")).thenReturn(basicUserInfoDto);
        when(postRepository.save(any(Post.class))).thenReturn(post);

        // When
        PostDto result = postService.createPost("john_doe", "content1", null);

        // Then
        assertNotNull(result);
        assertEquals("Initial content", result.getContent());
        verify(userPostServiceFacade, times(1)).findUserByLogin("john_doe");
        verify(postRepository, times(1)).save(any(Post.class));
    }

    @Test
    void testUpdatePost() {
        // Given
        when(postRepository.save(any(Post.class))).thenReturn(post);
        when(postRepository.findById("post-id")).thenReturn(Optional.of(post));

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
        when(postRepository.findById("post-id")).thenReturn(Optional.of(post));

        // When
        postService.deletePost("john_doe", "post-id");

        // Then
        verify(postRepository, times(1)).delete(any(Post.class));
    }

    @Test
    void testCreatePost_UserNotFound() {
        // Given
        String unknownUser = "unknown_user";
        when(userPostServiceFacade.findUserByLogin(unknownUser)).thenThrow(UsernameNotFoundException.class);

        // When
        assertThrows(UsernameNotFoundException.class,
                () -> postService.createPost(unknownUser, "content2", null));

        verify(userPostServiceFacade, times(1)).findUserByLogin(unknownUser);
    }
}

