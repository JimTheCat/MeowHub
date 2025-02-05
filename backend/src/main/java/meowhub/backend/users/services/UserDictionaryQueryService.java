package meowhub.backend.users.services;

import meowhub.backend.chats.constants.OnlineStatus;
import meowhub.backend.users.constants.Genders;
import meowhub.backend.users.constants.PrivacySettings;
import meowhub.backend.users.constants.Roles;
import meowhub.backend.users.models.Gender;
import meowhub.backend.users.models.OnlineStatusDictionary;
import meowhub.backend.users.models.PrivacySetting;
import meowhub.backend.users.models.Role;

public interface UserDictionaryQueryService {
    Gender getGenderByEnumOrThrow(Genders gender);

    OnlineStatusDictionary getOnlineStatusDictionaryByEnumOrThrow(OnlineStatus onlineStatus);

    Role getRoleByEnumOrThrow(Roles role);

    PrivacySetting getPrivacySettingByEnumOrThrow(PrivacySettings privacySetting);
}
