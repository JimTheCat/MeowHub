package meowhub.backend.users.services;

import meowhub.backend.dtos.UserDto;
import meowhub.backend.users.dtos.BasicUserInfoDto;
import meowhub.backend.users.models.User;

import java.util.List;

public interface UserQueryService {
    List<UserDto> getAllUsers();

    BasicUserInfoDto getBasicUserInfo(String login);

    User findUserByLogin(String login);
}
