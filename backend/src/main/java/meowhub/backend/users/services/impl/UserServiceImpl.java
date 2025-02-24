package meowhub.backend.users.services.impl;

import lombok.RequiredArgsConstructor;
import meowhub.backend.chats.constants.OnlineStatus;
import meowhub.backend.users.constants.Genders;
import meowhub.backend.users.constants.PrivacySettings;
import meowhub.backend.users.constants.Roles;
import meowhub.backend.users.models.PrivacySetting;
import meowhub.backend.users.models.User;
import meowhub.backend.users.repositories.UserRepository;
import meowhub.backend.users.services.UserDictionaryQueryService;
import meowhub.backend.users.services.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserDictionaryQueryService userDictionaryQueryService;

    @Override
    public void changeUserRole(String login, String roleCode) {
        User user = userRepository.findByLogin(login)
                .orElseThrow();

        user.setRole(userDictionaryQueryService.getRoleByEnumOrThrow(Roles.valueOf(roleCode)));
        userRepository.save(user);
    }

    public User createUser(String login, String name, String surname, String email, String password, LocalDate birthdate, Genders gender) {
        PrivacySetting publicSetting = userDictionaryQueryService.getPrivacySettingByEnumOrThrow(PrivacySettings.PUBLIC);

        User user = new User();
        user.setLogin(login);
        user.setPassword(passwordEncoder.encode(password));
        user.setEmail(email);
        user.setName(name);
        user.setSurname(surname);
        user.setAccountNonLocked(false);
        user.setBirthdate(birthdate);
        user.setCredentialsNonExpired(true);
        user.setCredentialsExpiryDate(LocalDateTime.now().plusYears(1));
        user.setRole(userDictionaryQueryService.getRoleByEnumOrThrow(Roles.ROLE_USER));
        user.setPostsPrivacy(publicSetting);
        user.setFriendsPrivacy(publicSetting);
        user.setProfilePrivacy(publicSetting);
        user.setGender(userDictionaryQueryService.getGenderByEnumOrThrow(gender));
        user.setStatus(userDictionaryQueryService.getOnlineStatusDictionaryByEnumOrThrow(OnlineStatus.OFFLINE));
        userRepository.save(user);
        return user;
    }
}
