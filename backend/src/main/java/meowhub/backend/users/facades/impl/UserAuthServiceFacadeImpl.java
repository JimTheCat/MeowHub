package meowhub.backend.users.facades.impl;

import lombok.RequiredArgsConstructor;
import meowhub.backend.constants.Genders;
import meowhub.backend.constants.Roles;
import meowhub.backend.users.facades.UserAuthServiceFacade;
import meowhub.backend.users.models.User;
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

    @Override
    public User createUser(String login, String name, String surname, String email, String password, LocalDate birthdate, Roles role, Genders gender) {
        passwordValidator.validatePassword(password);
        return userService.createUser(login, name, surname, email, password, birthdate, role, gender);
    }

    @Override
    public boolean existsByLogin(String login) {
        return userValidationService.existsByLogin(login);
    }


    @Override
    public boolean existsByEmail(String email) {
        return userValidationService.existsByEmail(email);
    }
}
