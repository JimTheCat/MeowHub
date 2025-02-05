package meowhub.backend.chats.services;

import lombok.RequiredArgsConstructor;
import meowhub.backend.chats.dtos.ChatBasicUserInfoDto;
import meowhub.backend.chats.constants.OnlineStatus;
import meowhub.backend.chats.dtos.UpdateChatUserStatusDto;
import meowhub.backend.chats.repositories.ChatUserRepository;
import meowhub.backend.user_relations.facades.UserRelationChatServiceFacade;
import meowhub.backend.users.facades.UserChatServiceFacade;
import meowhub.backend.users.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatUserService {
    private final UserChatServiceFacade userChatServiceFacade;
    private final ChatUserRepository repository;

    //1. Pobrać wszystkich użytkowników z relacją FRIENDS (ChatUserBasicInfoDto)
    //2. metoda na CONNECT user -> zmiana statusu na ONLINE i zapisanie w bazie
    //3. metoda na DISCONNECT user -> zmiana statusu na OFFLINE i zapisanie w bazie
    //* metoda, uruchamiana na start/wyłączenie serwera -> ustawia wszystkim użytkonikom status OFFLINE

    public UpdateChatUserStatusDto updateUser(String login) {
        User user = userChatServiceFacade.findUserByLogin(login);
        user.setStatus(userChatServiceFacade.getOnlineStatusDictionaryByEnumOrThrow(OnlineStatus.ONLINE));
        repository.save(user);
        return new UpdateChatUserStatusDto(login, OnlineStatus.ONLINE);
    }

    public UpdateChatUserStatusDto disconnect(String login) {
        User user = userChatServiceFacade.findUserByLogin(login);
        user.setStatus(userChatServiceFacade.getOnlineStatusDictionaryByEnumOrThrow(OnlineStatus.OFFLINE));
        repository.save(user);
        return new UpdateChatUserStatusDto(login, OnlineStatus.OFFLINE);
    }

    public Page<ChatBasicUserInfoDto> findConnectedUsers(String login, int size, int page) {
        Pageable pageable = PageRequest.of(size, page);
        return repository.findFriendsFor(login, pageable);
    }

    public List<ChatBasicUserInfoDto> findConnectedUsers2(String login) {
        Pageable pageable = PageRequest.of(0, 10);
        return repository.findFriendsFor(login, pageable).stream().toList();
    }
}
