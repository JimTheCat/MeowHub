package meowhub.backend.users.services;

import meowhub.backend.users.dtos.UserDto;
import meowhub.backend.users.dtos.BasicUserInfoDto;
import meowhub.backend.users.models.User;
import org.springframework.data.domain.Page;

import java.util.List;

public interface UserQueryService {
    Page<BasicUserInfoDto> searchUsers(String query, int page, int size);

    List<UserDto> getAllUsers();

    BasicUserInfoDto getBasicUserInfo(String login);

    User findUserByLogin(String login);
}
