package meowhub.backend.user_relations.services.impl;

import lombok.AllArgsConstructor;
import meowhub.backend.dtos.RelationType;
import meowhub.backend.shared.exceptions.RelationException;
import meowhub.backend.user_relations.repositories.UserRelationRepository;
import meowhub.backend.user_relations.services.UserRelationQueryService;
import meowhub.backend.users.dtos.BasicUserInfoDto;
import meowhub.backend.users.facades.UserRelationServiceFacade;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserRelationQueryServiceImpl implements UserRelationQueryService {
    private final UserRelationRepository userRelationRepository;
    private final UserRelationServiceFacade userRelationServiceFacade;

    @Override
    public Page<BasicUserInfoDto> getFriends(String login, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return userRelationRepository.findFriendsFor(login, pageable);
    }

    @Override
    public Page<BasicUserInfoDto> getFriendsForUser(String login, String requestedBy, int page, int size) {
        userRelationServiceFacade.validateIfUserExists(login);

        if(userRelationRepository.canViewUserPosts(login, requestedBy)) {
            Pageable pageable = PageRequest.of(page, size);
            return userRelationRepository.findFriendsFor(login, pageable);
        } else {
            throw new RelationException("User cannot view friends of this user");
        }
    }

    @Override
    public Page<BasicUserInfoDto> getPendingSentRequests(String login, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return userRelationRepository.findRelationsFor(login, RelationType.SENT_INVITATION.name(), pageable);
    }

    @Override
    public Page<BasicUserInfoDto> getReceivedRequests(String login, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return userRelationRepository.findRelationsWhereReceiverIs(login, RelationType.SENT_INVITATION.name(), pageable);
    }

    @Override
    public Page<BasicUserInfoDto> getRejectedRequests(String login, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return userRelationRepository.findRelationsWhereReceiverIs(login, RelationType.REJECTED.name(), pageable);
    }
}
