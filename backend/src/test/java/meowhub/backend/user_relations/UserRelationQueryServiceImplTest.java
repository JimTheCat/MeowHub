package meowhub.backend.user_relations;

import meowhub.backend.user_relations.constants.RelationType;
import meowhub.backend.shared.exceptions.RelationException;
import meowhub.backend.user_relations.repositories.UserRelationRepository;
import meowhub.backend.user_relations.services.impl.UserRelationQueryServiceImpl;
import meowhub.backend.users.dtos.BasicUserInfoDto;
import meowhub.backend.users.facades.UserRelationServiceFacade;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.Collections;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class UserRelationQueryServiceImplTest {

    @Mock
    private UserRelationRepository userRelationRepository;

    @Mock
    private UserRelationServiceFacade userRelationServiceFacade;

    @InjectMocks
    private UserRelationQueryServiceImpl userRelationQueryService;

    private BasicUserInfoDto testUserInfo;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this); // Inicjalizacja mocków
        testUserInfo = new BasicUserInfoDto();
    }

    @Test
    void testGetFriendsForUser_Success() {
        // Arrange
        String login = "targetUser";
        String requestedBy = "requestingUser";
        int page = 0;
        int size = 10;
        Pageable pageable = PageRequest.of(page, size);

        Page<BasicUserInfoDto> friendsPage = new PageImpl<>(Collections.singletonList(testUserInfo));
        when(userRelationRepository.canViewUserFriends(login, requestedBy)).thenReturn(true);
        when(userRelationRepository.findFriendsFor(login, pageable)).thenReturn(friendsPage);

        // Act
        Page<BasicUserInfoDto> result = userRelationQueryService.getFriendsForUser(login, requestedBy, page, size);

        // Assert
        assertNotNull(result);
        assertEquals(1, result.getTotalElements());
        verify(userRelationServiceFacade, times(1)).validateIfUserExists(login);
        verify(userRelationRepository, times(1)).canViewUserFriends(login, requestedBy);
        verify(userRelationRepository, times(1)).findFriendsFor(login, pageable);
    }

    @Test
    void testGetFriendsForUser_Failure() {
        // Arrange
        String login = "targetUser";
        String requestedBy = "requestingUser";
        int page = 0;
        int size = 10;

        when(userRelationRepository.canViewUserFriends(login, requestedBy)).thenReturn(false);

        // Act & Assert
        assertThrows(RelationException.class, () ->
                userRelationQueryService.getFriendsForUser(login, requestedBy, page, size)
        );

        verify(userRelationServiceFacade, times(1)).validateIfUserExists(login);
        verify(userRelationRepository, times(1)).canViewUserFriends(login, requestedBy);
        verify(userRelationRepository, never()).findFriendsFor(anyString(), any(Pageable.class));
    }

    @Test
    void testGetPendingSentRequests() {
        // Arrange
        String login = "testUser";
        int page = 0;
        int size = 10;
        Pageable pageable = PageRequest.of(page, size);

        Page<BasicUserInfoDto> pendingRequestsPage = new PageImpl<>(Collections.singletonList(testUserInfo));
        when(userRelationRepository.findRelationsFor(login, RelationType.SENT_INVITATION.name(), pageable))
                .thenReturn(pendingRequestsPage);

        // Act
        Page<BasicUserInfoDto> result = userRelationQueryService.getPendingSentRequests(login, page, size);

        // Assert
        assertNotNull(result);
        assertEquals(1, result.getTotalElements());
        verify(userRelationRepository, times(1))
                .findRelationsFor(login, RelationType.SENT_INVITATION.name(), pageable);
    }

    @Test
    void testGetReceivedRequests() {
        // Arrange
        String login = "testUser";
        int page = 0;
        int size = 10;
        Pageable pageable = PageRequest.of(page, size);

        Page<BasicUserInfoDto> receivedRequestsPage = new PageImpl<>(Collections.singletonList(testUserInfo));
        when(userRelationRepository.findRelationsWhereReceiverIs(login, RelationType.SENT_INVITATION.name(), pageable))
                .thenReturn(receivedRequestsPage);

        // Act
        Page<BasicUserInfoDto> result = userRelationQueryService.getReceivedRequests(login, page, size);

        // Assert
        assertNotNull(result);
        assertEquals(1, result.getTotalElements());
        verify(userRelationRepository, times(1))
                .findRelationsWhereReceiverIs(login, RelationType.SENT_INVITATION.name(), pageable);
    }

    @Test
    void testGetRejectedRequests() {
        // Arrange
        String login = "testUser";
        int page = 0;
        int size = 10;
        Pageable pageable = PageRequest.of(page, size);

        Page<BasicUserInfoDto> rejectedRequestsPage = new PageImpl<>(Collections.singletonList(testUserInfo));
        when(userRelationRepository.findRelationsWhereReceiverIs(login, RelationType.REJECTED.name(), pageable))
                .thenReturn(rejectedRequestsPage);

        // Act
        Page<BasicUserInfoDto> result = userRelationQueryService.getRejectedRequests(login, page, size);

        // Assert
        assertNotNull(result);
        assertEquals(1, result.getTotalElements());
        verify(userRelationRepository, times(1))
                .findRelationsWhereReceiverIs(login, RelationType.REJECTED.name(), pageable);
    }
}