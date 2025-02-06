package meowhub.backend.users.facades.impl;

import lombok.RequiredArgsConstructor;
import meowhub.backend.chats.constants.OnlineStatus;
import meowhub.backend.users.facades.UserChatServiceFacade;
import meowhub.backend.users.models.OnlineStatusDictionary;
import meowhub.backend.users.models.User;
import meowhub.backend.users.services.UserDictionaryQueryService;
import meowhub.backend.users.services.UserQueryService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserChatServiceFacadeImpl implements UserChatServiceFacade {
   private final UserQueryService userQueryService;
   private final UserDictionaryQueryService userDictionaryQueryService;

    @Override
    public User findUserByLogin(String login) {
        return userQueryService.findUserByLogin(login);
    }

    @Override
    public OnlineStatusDictionary getOnlineStatusDictionaryByEnumOrThrow(OnlineStatus onlineStatus) {
        return userDictionaryQueryService.getOnlineStatusDictionaryByEnumOrThrow(onlineStatus);
    }
}
