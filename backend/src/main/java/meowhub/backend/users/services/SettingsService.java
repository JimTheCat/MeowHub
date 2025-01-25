package meowhub.backend.users.services;

import meowhub.backend.constants.PrivacySettings;

public interface SettingsService {
    void changePostPrivacySettings(PrivacySettings privacySettings, String login);

    void changeProfilePrivacySettings(PrivacySettings privacySettings, String login);

    void changeFriendsPrivacySettings(PrivacySettings privacySettings, String login);

    void changePassword(String newPassword, String login);

    void deleteUser(String login);
}
