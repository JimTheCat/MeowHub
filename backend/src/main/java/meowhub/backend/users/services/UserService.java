package meowhub.backend.users.services;

import meowhub.backend.dtos.UserDto;
import meowhub.backend.users.dtos.BasicUserInfoDto;

import java.util.List;

public interface UserService {
    List<UserDto> getAllUsers();

    UserDto getUserById(String userId);

    void changeUserRole(String userId, String roleName);

    BasicUserInfoDto getBasicUserInfo(String login);
}
