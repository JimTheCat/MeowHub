package meowhub.backend.user_relations.services;

import meowhub.backend.users.dtos.BasicUserInfoDto;
import org.springframework.data.domain.Page;

public interface UserRelationQueryService {
    Page<BasicUserInfoDto> getFriendsForUser(String login, String requestedBy, int page, int size);

    Page<BasicUserInfoDto> getPendingSentRequests(String login, int page, int size);

    Page<BasicUserInfoDto> getReceivedRequests(String login, int page, int size);

    Page<BasicUserInfoDto> getRejectedRequests(String login, int page, int size);
}