package meowhub.backend.user_relations.facades.impl;

import lombok.RequiredArgsConstructor;
import meowhub.backend.user_relations.facades.UserRelationChatServiceFacade;
import meowhub.backend.user_relations.services.UserRelationQueryService;
import meowhub.backend.users.dtos.BasicUserInfoDto;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserRelationChatServiceFacadeImpl implements UserRelationChatServiceFacade {
    private final UserRelationQueryService userRelationQueryService;

    @Override
    public Page<BasicUserInfoDto> getFriendsForUser(String login, int page, int size) {
        return userRelationQueryService.getFriendsForUser(login, login, page, size);
    }
}
