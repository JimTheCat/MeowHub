package meowhub.backend.users.facades;

import meowhub.backend.users.models.User;

public interface UserProfileServiceFacade {
    User findUserByLogin(String login);

    void validateIfUserExists(String login);
}
