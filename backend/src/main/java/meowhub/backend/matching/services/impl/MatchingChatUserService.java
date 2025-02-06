package meowhub.backend.matching.services.impl;

import lombok.RequiredArgsConstructor;
import meowhub.backend.chats.constants.OnlineStatus;
import meowhub.backend.matching.dtos.BasicMatchingProfileInfoDto;
import meowhub.backend.matching.dtos.UpdateMatchingProfileStatusDto;
import meowhub.backend.matching.models.MatchingProfile;
import meowhub.backend.matching.services.MatchingProfileQueryService;
import meowhub.backend.matching.services.MatchingProfileService;
import meowhub.backend.matching.services.MatchingRelationService;
import meowhub.backend.users.facades.UserMatchingServiceFacade;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MatchingChatUserService {
    private final MatchingProfileQueryService queryService;
    private final MatchingProfileService service;
    private final UserMatchingServiceFacade userMatchingServiceFacade;
    private final MatchingRelationService relationService;

    public UpdateMatchingProfileStatusDto updateMatchingProfile(String login) {
        MatchingProfile profile = queryService.findMatchingProfileByLoginOrThrow(login);

        profile.setStatus(userMatchingServiceFacade.getOnlineStatusDictionaryByEnumOrThrow(OnlineStatus.ONLINE));
        service.saveProfile(profile);
        return new UpdateMatchingProfileStatusDto(profile.getId(), OnlineStatus.ONLINE);
    }

    public UpdateMatchingProfileStatusDto disconnect(String login) {
        MatchingProfile profile = queryService.findMatchingProfileByLoginOrThrow(login);
        profile.setStatus(userMatchingServiceFacade.getOnlineStatusDictionaryByEnumOrThrow(OnlineStatus.OFFLINE));
        service.saveProfile(profile);
        return new UpdateMatchingProfileStatusDto(profile.getId(), OnlineStatus.OFFLINE);
    }

    public Page<BasicMatchingProfileInfoDto> findConnectedUsers(String login, int page, int size) {
        return relationService.getMatchedUsers(login, page, size);
    }
}
