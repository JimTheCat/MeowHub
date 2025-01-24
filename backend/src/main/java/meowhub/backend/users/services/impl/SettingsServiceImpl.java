package meowhub.backend.users.services.impl;

import lombok.RequiredArgsConstructor;
import meowhub.backend.constants.PrivacySettings;
import meowhub.backend.users.models.PrivacySetting;
import meowhub.backend.users.models.User;
import meowhub.backend.users.repositories.PrivacySettingRepository;
import meowhub.backend.users.repositories.UserRepository;
import meowhub.backend.users.services.PasswordValidator;
import meowhub.backend.users.services.SettingsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SettingsServiceImpl implements SettingsService {
    private final UserRepository userRepository;
    private final PrivacySettingRepository privacySettingRepository;
    private final PasswordEncoder passwordEncoder;
    private final PasswordValidator passwordValidator;

    @Override
    public void changePostPrivacySettings(PrivacySettings privacySettings, String login) {
        User user = userRepository.findByLogin(login).orElseThrow();
        PrivacySetting privacySetting = getPrivacySetting(privacySettings);
        user.setPostsPrivacy(privacySetting);
        userRepository.save(user);
    }

    @Override
    public void changeProfilePrivacySettings(PrivacySettings privacySettings, String login) {
        User user = userRepository.findByLogin(login).orElseThrow();
        PrivacySetting privacySetting = getPrivacySetting(privacySettings);
        user.setProfilePrivacy(privacySetting);
        userRepository.save(user);    }

    @Override
    public void changeFriendsPrivacySettings(PrivacySettings privacySettings, String login) {
        User user = userRepository.findByLogin(login).orElseThrow();
        PrivacySetting privacySetting = getPrivacySetting(privacySettings);
        user.setFriendsPrivacy(privacySetting);
        userRepository.save(user);
    }

    @Override
    public void changePassword(String newPassword, String login) {
        User user = userRepository.findByLogin(login).orElseThrow();
        passwordValidator.validatePassword(newPassword);
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    private PrivacySetting getPrivacySetting(PrivacySettings privacySettings) {
        return privacySettingRepository.findByCode(privacySettings.name()).orElseThrow();
    }
}
