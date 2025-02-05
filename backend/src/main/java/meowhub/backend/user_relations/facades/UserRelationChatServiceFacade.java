package meowhub.backend.user_relations.facades;

import meowhub.backend.users.dtos.BasicUserInfoDto;
import org.springframework.data.domain.Page;

public interface UserRelationChatServiceFacade {
    Page<BasicUserInfoDto> getFriendsForUser(String login, int page, int size);
}
