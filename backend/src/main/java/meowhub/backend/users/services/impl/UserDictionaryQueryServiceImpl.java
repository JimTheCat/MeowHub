package meowhub.backend.users.services.impl;

import lombok.RequiredArgsConstructor;
import meowhub.backend.chats.constants.OnlineStatus;
import meowhub.backend.shared.constants.AlertConstants;
import meowhub.backend.users.constants.Genders;
import meowhub.backend.users.constants.PrivacySettings;
import meowhub.backend.users.constants.Roles;
import meowhub.backend.users.models.Gender;
import meowhub.backend.users.models.OnlineStatusDictionary;
import meowhub.backend.users.models.PrivacySetting;
import meowhub.backend.users.models.Role;
import meowhub.backend.users.repositories.GenderRepository;
import meowhub.backend.users.repositories.OnlineStatusDictionaryRepository;
import meowhub.backend.users.repositories.PrivacySettingRepository;
import meowhub.backend.users.repositories.RoleRepository;
import meowhub.backend.users.services.UserDictionaryQueryService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserDictionaryQueryServiceImpl implements UserDictionaryQueryService {
    private final GenderRepository genderRepository;
    private final PrivacySettingRepository privacySettingRepository;
    private final OnlineStatusDictionaryRepository onlineStatusDictionaryRepository;
    private final RoleRepository roleRepository;


    @Override
    public Gender getGenderByEnumOrThrow(Genders gender) {
        return genderRepository.findByCode(gender.name())
                .orElseThrow(() -> new IllegalArgumentException(String.format(AlertConstants.RESOURCE_NOT_FOUND, "Gender", "code", gender)));
    }

    @Override
    public OnlineStatusDictionary getOnlineStatusDictionaryByEnumOrThrow(OnlineStatus onlineStatus) {
        return onlineStatusDictionaryRepository.findByCode(onlineStatus.name())
                .orElseThrow(() -> new IllegalArgumentException(String.format(AlertConstants.RESOURCE_NOT_FOUND, "OnlineStatus", "code", onlineStatus)));
    }

    @Override
    public Role getRoleByEnumOrThrow(Roles role) {
        return roleRepository.findByCode(role.name())
                .orElseThrow(() -> new IllegalArgumentException(String.format(AlertConstants.RESOURCE_NOT_FOUND, "Role", "code", role)));
    }

    @Override
    public PrivacySetting getPrivacySettingByEnumOrThrow(PrivacySettings privacySetting) {
        return privacySettingRepository.findByCode(privacySetting.name())
                .orElseThrow(() -> new IllegalArgumentException(String.format(AlertConstants.RESOURCE_NOT_FOUND, "PrivacySetting", "code", privacySetting)));
    }
}
