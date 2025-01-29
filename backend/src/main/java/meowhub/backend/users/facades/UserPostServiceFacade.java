package meowhub.backend.users.facades;

import meowhub.backend.users.dtos.BasicUserInfoDto;
import meowhub.backend.users.models.User;

public interface UserPostServiceFacade {
    void validateIfUserExists(String login);

    User findUserByLogin(String login);

    BasicUserInfoDto getBasicUserInfo(String login);
}
