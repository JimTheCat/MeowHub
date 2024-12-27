package meowhub.backend.users.services.impl;

import lombok.RequiredArgsConstructor;
import meowhub.backend.constants.Genders;
import meowhub.backend.constants.PrivacySettings;
import meowhub.backend.constants.Roles;
import meowhub.backend.users.models.Gender;
import meowhub.backend.users.models.PrivacySetting;
import meowhub.backend.users.models.Role;
import meowhub.backend.users.models.User;
import meowhub.backend.users.repositories.GenderRepository;
import meowhub.backend.users.repositories.PrivacySettingRepository;
import meowhub.backend.users.repositories.RoleRepository;
import meowhub.backend.users.repositories.UserRepository;
import meowhub.backend.users.services.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PrivacySettingRepository privacySettingRepository;
    private final GenderRepository genderRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void changeUserRole(String login, String roleCode) {
        User user = userRepository.findByLogin(login)
                .orElseThrow();
        Role role = roleRepository.findByCode(roleCode)
                .orElseThrow();

        user.setRole(role);
        userRepository.save(user);
    }

    public User createUser(String login, String name, String surname, String email, String password, LocalDate birthdate, Roles role, Genders gender) {
        Role userRole = roleRepository.findByCode(role.name())
                .orElseGet(() -> roleRepository.save(new Role(role)));
        PrivacySetting publicSetting = privacySettingRepository.findByCode(PrivacySettings.PUBLIC.name())
                .orElseGet(() -> privacySettingRepository.save(new PrivacySetting(PrivacySettings.PUBLIC)));
        Gender userGender = genderRepository.findByCode(gender.name())
                .orElseGet(() -> genderRepository.save(new Gender(gender)));
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
        user.setRole(userRole);
        user.setPostsPrivacy(publicSetting);
        user.setFriendsPrivacy(publicSetting);
        user.setProfilePrivacy(publicSetting);
        user.setGender(userGender);
        userRepository.save(user);
        return user;
    }
}
