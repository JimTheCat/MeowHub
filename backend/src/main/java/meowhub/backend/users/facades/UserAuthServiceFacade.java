package meowhub.backend.users.facades;

import meowhub.backend.constants.Genders;
import meowhub.backend.constants.Roles;
import meowhub.backend.users.models.User;

import java.time.LocalDate;

public interface UserAuthServiceFacade {
    User createUser(String login, String name, String surname, String email, String password, LocalDate birthdate, Roles role, Genders gender);

    boolean existsByLogin(String login);

    boolean existsByEmail(String email);

    void validateIfUserExists(String login);

    User getUserByLogin(String login);

    void changePassword(String newPassword, String login);
}
