package meowhub.backend.users.services;

import meowhub.backend.users.constants.PrivacySettings;
import meowhub.backend.users.dtos.PrivacySettingsDto;

public interface SettingsService {
    PrivacySettingsDto getPrivacySettings(String login);

    void changePostPrivacySettings(PrivacySettings privacySettings, String login);

    void changeProfilePrivacySettings(PrivacySettings privacySettings, String login);

    void changeFriendsPrivacySettings(PrivacySettings privacySettings, String login);

    void changePassword(String newPassword, String login);

    void deleteUser(String login);
}
