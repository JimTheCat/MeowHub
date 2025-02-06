package meowhub.backend.users.facades;

import meowhub.backend.chats.constants.OnlineStatus;
import meowhub.backend.users.constants.Genders;
import meowhub.backend.users.models.Gender;
import meowhub.backend.users.models.OnlineStatusDictionary;
import meowhub.backend.users.models.User;

public interface UserMatchingServiceFacade {
    User findUserByLogin(String login);

    void validateIfUserExists(String login);

    Gender getGenderByEnumOrThrow(Genders gender);

    OnlineStatusDictionary getOnlineStatusDictionaryByEnumOrThrow(OnlineStatus onlineStatus);
}
