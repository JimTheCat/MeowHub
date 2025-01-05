package meowhub.backend.users.facades;

import meowhub.backend.users.models.User;

public interface UserRelationServiceFacade {
    User findUserByLogin(String login);

    void validateIfUserExists(String login);
}
