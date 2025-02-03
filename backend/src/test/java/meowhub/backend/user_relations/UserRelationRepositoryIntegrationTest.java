package meowhub.backend.user_relations;

import meowhub.backend.InitDataTestConfig;
import meowhub.backend.user_relations.repositories.UserRelationRepository;
import meowhub.backend.users.dtos.BasicUserInfoDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@DataJpaTest
@ActiveProfiles("test")
@Import(InitDataTestConfig.class)
class UserRelationRepositoryIntegrationTest {
    @Autowired
    private UserRelationRepository userRelationRepository;

    private static final String USER_LOGIN = "user";
    private static final String FRIEND_LOGIN = "grześ";
    private static final String NON_FRIEND_LOGIN = "admin";
    private static final Pageable pageable = PageRequest.of(0, 10);

    @Test
    void testFindRelationsFor() {
        Page<BasicUserInfoDto> sentInvitations = userRelationRepository.findRelationsFor("admin", "SENT_INVITATION", pageable);
        assertNotNull(sentInvitations);
        assertEquals(1, sentInvitations.getContent().size());
        assertEquals(USER_LOGIN, sentInvitations.getContent().get(0).getLogin());
    }

    @Test
    void testFindRelationsWhereReceiverIs() {
        Page<BasicUserInfoDto> receivedInvitations = userRelationRepository.findRelationsWhereReceiverIs(USER_LOGIN, "SENT_INVITATION", pageable);
        assertNotNull(receivedInvitations);
        assertEquals(1, receivedInvitations.getContent().size());
        assertEquals("admin", receivedInvitations.getContent().get(0).getLogin());
    }

    @Test
    void testFindFriendsFor() {
        Page<BasicUserInfoDto> friends = userRelationRepository.findFriendsFor(FRIEND_LOGIN, pageable);
        assertNotNull(friends);
        assertEquals(1, friends.getContent().size());
        assertEquals(USER_LOGIN, friends.getContent().get(0).getLogin());
    }

    @Test
    void testCanViewUserFriends_PublicPrivacy() {
        boolean canView = userRelationRepository.canViewUserFriends(USER_LOGIN, NON_FRIEND_LOGIN);
        assertEquals(true, canView); // User with public privacy settings is viewable by others.
    }

    @Test
    void testCanViewUserFriends_FriendsOnlyPrivacy_NoFriendship() {
        boolean canView = userRelationRepository.canViewUserFriends("admin", USER_LOGIN);
        assertEquals(false, canView); // User with friends-only privacy should not be viewable by non-friends.
    }

    @Test
    void testCanViewUserFriends_FriendsOnlyPrivacy_WithFriendship() {
        boolean canView = userRelationRepository.canViewUserFriends(USER_LOGIN, FRIEND_LOGIN);
        assertEquals(true, canView); // Friends should be able to view each other's posts.
    }

    @Test
    void testDeleteFriend() {
        // Before deletion, verify the relation exists
        Page<BasicUserInfoDto> friends = userRelationRepository.findFriendsFor(FRIEND_LOGIN, pageable);
        assertEquals(1, friends.getContent().size());

        // Perform deletion
        userRelationRepository.deleteFriend(USER_LOGIN, FRIEND_LOGIN);

        // Verify the relation is removed
        friends = userRelationRepository.findFriendsFor(FRIEND_LOGIN, pageable);
        assertEquals(0, friends.getContent().size());
    }

    @Test
    void testExistsUserRelationBySenderLoginAndReceiverLoginAndRelationTypeCode() {
        boolean exists = userRelationRepository.existsUserRelationBySenderLoginAndReceiverLoginAndRelationTypeCode("admin", USER_LOGIN, "SENT_INVITATION");
        assertEquals(true, exists);

        exists = userRelationRepository.existsUserRelationBySenderLoginAndReceiverLoginAndRelationTypeCode("user", "admin", "FRIENDS");
        assertEquals(false, exists);
    }
}

