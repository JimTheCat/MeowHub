package meowhub.backend.users.facades;

import meowhub.backend.users.constants.Genders;
import meowhub.backend.users.models.User;

import java.time.LocalDate;

public interface UserAuthServiceFacade {
    User createUser(String login, String name, String surname, String email, String password, LocalDate birthdate, Genders gender);

    boolean existsByLogin(String login);

    boolean existsByEmail(String email);

    void validateIfUserExists(String login);

    User getUserByLogin(String login);

    void changePassword(String newPassword, String login);
}
