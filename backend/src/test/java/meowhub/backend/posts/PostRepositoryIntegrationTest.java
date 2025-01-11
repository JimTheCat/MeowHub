package meowhub.backend.posts;

import meowhub.backend.InitDataTestConfig;
import meowhub.backend.posts.dtos.PostDto;
import meowhub.backend.posts.models.Post;
import meowhub.backend.posts.repositories.PostRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@DataJpaTest
@ActiveProfiles("test")
@Import(InitDataTestConfig.class)
class PostRepositoryIntegrationTest {
    @Autowired
    private PostRepository postRepository;
    private static final String NOT_FRIEND_LOGIN = "admin";
    private static final String USER_LOGIN = "user";
    private static final String USERS_FRIEND_LOGIN = "grześ";
    private static final Pageable pageable = Pageable.unpaged();

    @Test
    void testFindByUserLoginAndId() {
        String postId = postRepository.findAll().stream().filter(post -> post.getUser().getLogin().equals(USER_LOGIN)).findFirst().get().getId();
        Post post = postRepository.findById(postId).orElse(null);
        assertNotNull(post);
        assertEquals(USER_LOGIN, post.getUser().getLogin());
        assertEquals(postId, post.getId());
    }

    @Test
    void testFindIfPublicOrFriends() {
        Page<PostDto> posts = postRepository.findIfPublicOrFriends(USER_LOGIN, pageable);
        assertNotNull(posts);
        assertEquals(3, posts.stream().count());
    }

    @Test
    void testFindByUserLoginIfPublicOrFriend() {
        //test if user requesting is not a friend and requested post's author has privacy settings set to FRIENDS_ONLY
        Page<PostDto> postsRequestedByFriendWithPrivacyFriendsOnly = postRepository.findByUserLoginIfPublicOrFriend(USER_LOGIN, USERS_FRIEND_LOGIN, pageable);
        assertNotNull(postsRequestedByFriendWithPrivacyFriendsOnly);
        assertEquals(1, postsRequestedByFriendWithPrivacyFriendsOnly.stream().count());

        //test if user requesting is a friend and requested post's author has privacy settings set to FRIENDS_ONLY
        Page<PostDto> postsRequestedByNoFriendWithPrivacyFriendsOnly = postRepository.findByUserLoginIfPublicOrFriend(USER_LOGIN, NOT_FRIEND_LOGIN, pageable);
        assertEquals(0, postsRequestedByNoFriendWithPrivacyFriendsOnly.stream().count());

        //test if user requesting is not a friend and requested post's author has privacy settings set to PUBLIC
        Page<PostDto> postsForPrivacyPublic = postRepository.findByUserLoginIfPublicOrFriend(NOT_FRIEND_LOGIN, USER_LOGIN, pageable);
        assertNotNull(postsForPrivacyPublic);
        assertEquals(1, postsForPrivacyPublic.stream().count());
    }

    @Test
    void testFindOwn() {
        Page<PostDto> posts = postRepository.findOwn(USER_LOGIN, pageable);
        assertNotNull(posts);
        assertEquals(1, posts.stream().count());
    }
}
