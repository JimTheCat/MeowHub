package meowhub.backend.users.facades;

import meowhub.backend.users.models.User;

public interface UserMatchingServiceFacade {
    User findUserByLogin(String login);
    void validateIfUserExists(String login);
}
