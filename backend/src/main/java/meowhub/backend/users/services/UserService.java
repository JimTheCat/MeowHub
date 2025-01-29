package meowhub.backend.users.services;

import meowhub.backend.constants.Genders;
import meowhub.backend.constants.Roles;
import meowhub.backend.users.models.User;

import java.time.LocalDate;

public interface UserService {
    void changeUserRole(String userId, String roleName);

    User createUser(String login, String name, String surname, String email, String password, LocalDate birthdate, Roles role, Genders gender);
}
