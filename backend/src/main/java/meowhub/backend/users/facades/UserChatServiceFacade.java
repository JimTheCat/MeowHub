package meowhub.backend.users.facades;

import meowhub.backend.chats.constants.OnlineStatus;
import meowhub.backend.users.models.OnlineStatusDictionary;
import meowhub.backend.users.models.User;

public interface UserChatServiceFacade {
    User findUserByLogin(String login);

    OnlineStatusDictionary getOnlineStatusDictionaryByEnumOrThrow(OnlineStatus onlineStatus);
}
