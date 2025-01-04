package meowhub.backend.user_relations;

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

import java.util.Collections;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserRelationQueryServiceImplTest {

    @Mock
    private UserRelationRepository userRelationRepository;

    @Mock
    private UserRelationServiceFacade userRelationServiceFacade;

    @InjectMocks
    private UserRelationQueryServiceImpl userRelationQueryService;

    private static final String VALID_LOGIN = "user";
    private static final String OTHER_USER = "requestedUser";

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getFriends_ShouldReturnFriends() {
        // Given
        PageRequest pageable = PageRequest.of(0, 10);
        Page<BasicUserInfoDto> mockPage = new PageImpl<>(Collections.emptyList());
        when(userRelationRepository.findFriendsFor(VALID_LOGIN, pageable)).thenReturn(mockPage);

        // When
        Page<BasicUserInfoDto> result = userRelationQueryService.getFriends(VALID_LOGIN, 0, 10);

        // Then
        assertNotNull(result);
        assertTrue(result.isEmpty());
        verify(userRelationRepository, times(1)).findFriendsFor(VALID_LOGIN, pageable);
    }

    @Test
    void getFriendsForUser_ShouldReturnFriendsForUserWhenPermitted() {
        // Given
        PageRequest pageable = PageRequest.of(0, 10);
        Page<BasicUserInfoDto> mockPage = new PageImpl<>(Collections.emptyList());
        when(userRelationRepository.canViewUserPosts(OTHER_USER, VALID_LOGIN)).thenReturn(true);
        when(userRelationRepository.findFriendsFor(OTHER_USER, pageable)).thenReturn(mockPage);

        // When
        Page<BasicUserInfoDto> result = userRelationQueryService.getFriendsForUser(OTHER_USER, VALID_LOGIN, 0, 10);

        // Then
        assertNotNull(result);
        assertTrue(result.isEmpty());
        verify(userRelationServiceFacade, times(1)).validateIfUserExists(OTHER_USER);
        verify(userRelationRepository, times(1)).canViewUserPosts(OTHER_USER, VALID_LOGIN);
        verify(userRelationRepository, times(1)).findFriendsFor(OTHER_USER, pageable);
    }

    @Test
    void getFriendsForUser_ShouldThrowExceptionWhenNotPermitted() {
        // Given
        when(userRelationRepository.canViewUserPosts(OTHER_USER, VALID_LOGIN)).thenReturn(false);

        // When & Assert
        assertThrows(RelationException.class, () ->
                userRelationQueryService.getFriendsForUser(OTHER_USER, VALID_LOGIN, 0, 10));
        verify(userRelationServiceFacade, times(1)).validateIfUserExists(OTHER_USER);
        verify(userRelationRepository, times(1)).canViewUserPosts(OTHER_USER, VALID_LOGIN);
        verify(userRelationRepository, never()).findFriendsFor(anyString(), any());
    }

    @Test
    void getPendingSentRequests_ShouldReturnPendingRequests() {
        // Given
        PageRequest pageable = PageRequest.of(0, 10);
        Page<BasicUserInfoDto> mockPage = new PageImpl<>(Collections.emptyList());
        when(userRelationRepository.findRelationsFor(VALID_LOGIN, "SENT_INVITATION", pageable)).thenReturn(mockPage);

        // When
        Page<BasicUserInfoDto> result = userRelationQueryService.getPendingSentRequests(VALID_LOGIN, 0, 10);

        // Then
        assertNotNull(result);
        assertTrue(result.isEmpty());
        verify(userRelationRepository, times(1)).findRelationsFor(VALID_LOGIN, "SENT_INVITATION", pageable);
    }

    @Test
    void getReceivedRequests_ShouldReturnReceivedRequests() {
        // Given
        PageRequest pageable = PageRequest.of(0, 10);
        Page<BasicUserInfoDto> mockPage = new PageImpl<>(Collections.emptyList());
        when(userRelationRepository.findRelationsWhereReceiverIs(VALID_LOGIN, "SENT_INVITATION", pageable)).thenReturn(mockPage);

        // When
        Page<BasicUserInfoDto> result = userRelationQueryService.getReceivedRequests(VALID_LOGIN, 0, 10);

        // Then
        assertNotNull(result);
        assertTrue(result.isEmpty());
        verify(userRelationRepository, times(1)).findRelationsWhereReceiverIs(VALID_LOGIN, "SENT_INVITATION", pageable);
    }

    @Test
    void getRejectedRequests_ShouldReturnRejectedRequests() {
        // Given
        PageRequest pageable = PageRequest.of(0, 10);
        Page<BasicUserInfoDto> mockPage = new PageImpl<>(Collections.emptyList());
        when(userRelationRepository.findRelationsWhereReceiverIs(VALID_LOGIN, "REJECTED", pageable)).thenReturn(mockPage);

        // When
        Page<BasicUserInfoDto> result = userRelationQueryService.getRejectedRequests(VALID_LOGIN, 0, 10);

        // Then
        assertNotNull(result);
        assertTrue(result.isEmpty());
        verify(userRelationRepository, times(1)).findRelationsWhereReceiverIs(VALID_LOGIN, "REJECTED", pageable);
    }
}

