package meowhub.backend.matching.services.impl;

import lombok.RequiredArgsConstructor;
import meowhub.backend.chats.constants.OnlineStatus;
import meowhub.backend.chats.dtos.ChatBasicUserInfoDto;
import meowhub.backend.chats.dtos.UpdateChatUserStatusDto;
import meowhub.backend.chats.repositories.ChatUserRepository;
import meowhub.backend.matching.dtos.BasicMatchingProfileInfoDto;
import meowhub.backend.matching.models.MatchingProfile;
import meowhub.backend.matching.repositories.MatchingProfileRepository;
import meowhub.backend.matching.services.MatchingProfileQueryService;
import meowhub.backend.matching.services.MatchingRelationService;
import meowhub.backend.users.facades.UserChatServiceFacade;
import meowhub.backend.users.facades.UserMatchingServiceFacade;
import meowhub.backend.users.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MatchingChatUserService {
    private final MatchingProfileRepository matchingProfileRepository;
    private final MatchingProfileQueryService queryService;
    private final MatchingRelationService service;

    //1. Pobrać wszystkich użytkowników z relacją FRIENDS (ChatUserBasicInfoDto)
    //2. metoda na CONNECT user -> zmiana statusu na ONLINE i zapisanie w bazie
    //3. metoda na DISCONNECT user -> zmiana statusu na OFFLINE i zapisanie w bazie
    //* metoda, uruchamiana na start/wyłączenie serwera -> ustawia wszystkim użytkonikom status OFFLINE

    public UpdateChatUserStatusDto updateMatchingProfile(String login) {
        MatchingProfile profile = queryService.findMatchingProfileByLoginOrThrow(login);

//        user.setStatus(userChatServiceFacade.getOnlineStatusDictionaryByEnumOrThrow(OnlineStatus.ONLINE)); TODO
//        repository.save(user);
        return new UpdateChatUserStatusDto(profile.getId(), OnlineStatus.ONLINE);
    }

    public UpdateChatUserStatusDto disconnect(String login) {
        MatchingProfile profile = queryService.findMatchingProfileByLoginOrThrow(login);
//        user.setStatus(userChatServiceFacade.getOnlineStatusDictionaryByEnumOrThrow(OnlineStatus.OFFLINE)); TODO
//        repository.save(user);
        return new UpdateChatUserStatusDto(profile.getId(), OnlineStatus.OFFLINE);
    }

//    public Page<ChatBasicUserInfoDto> findConnectedUsers(String login, int size, int page) {
//        Pageable pageable = PageRequest.of(size, page);
//        return repository.findFriendsFor(login, pageable);
//    }

    public List<BasicMatchingProfileInfoDto> findConnectedUsers2(String login) {
        return service.getMatchedUsers(login, 0, 10).stream().toList();
    }
}
