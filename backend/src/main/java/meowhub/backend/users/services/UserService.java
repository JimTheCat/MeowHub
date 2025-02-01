package meowhub.backend.users.services;

import meowhub.backend.users.constants.Genders;
import meowhub.backend.users.models.User;

import java.time.LocalDate;

public interface UserService {
    void changeUserRole(String userId, String roleName);

    User createUser(String login, String name, String surname, String email, String password, LocalDate birthdate, Genders gender);
}
