package meowhub.backend.users.facades.impl;

import lombok.RequiredArgsConstructor;
import meowhub.backend.users.constants.Genders;
import meowhub.backend.users.facades.UserAuthServiceFacade;
import meowhub.backend.users.models.User;
import meowhub.backend.users.services.SettingsService;
import meowhub.backend.users.services.UserQueryService;
import meowhub.backend.users.services.PasswordValidator;
import meowhub.backend.users.services.UserService;
import meowhub.backend.users.services.UserValidationService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@RequiredArgsConstructor
@Service
public class UserAuthServiceFacadeImpl implements UserAuthServiceFacade {
    private final UserService userService;
    private final UserValidationService userValidationService;
    private final PasswordValidator passwordValidator;
    private final UserQueryService userQueryService;
    private final SettingsService settingsService;

    @Override
    public User createUser(String login, String name, String surname, String email, String password, LocalDate birthdate, Genders gender) {
        passwordValidator.validatePassword(password);
        return userService.createUser(login, name, surname, email, password, birthdate, gender);
    }

    @Override
    public boolean existsByLogin(String login) {
        return userValidationService.existsByLogin(login);
    }


    @Override
    public boolean existsByEmail(String email) {
        return userValidationService.existsByEmail(email);
    }

    @Override
    public User getUserByLogin(String login) {
        return userQueryService.findUserByLogin(login);
    }

    @Override
    public void validateIfUserExists(String login) {
        userValidationService.validateIfUserExists(login);
    }

    @Override
    public void changePassword(String newPassword, String login) {
        settingsService.changePassword(newPassword, login);
    }
}
