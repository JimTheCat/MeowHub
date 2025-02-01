package meowhub.backend.users.services;

import meowhub.backend.users.constants.Genders;
import meowhub.backend.users.constants.PrivacySettings;
import meowhub.backend.users.constants.Roles;
import meowhub.backend.users.models.Gender;
import meowhub.backend.users.models.PrivacySetting;
import meowhub.backend.users.models.Role;

public interface UserDictionaryQueryService {
    Gender getGenderByEnumOrThrow(Genders gender);

    Role getRoleByEnumOrThrow(Roles role);

    PrivacySetting getPrivacySettingByEnumOrThrow(PrivacySettings privacySetting);
}
