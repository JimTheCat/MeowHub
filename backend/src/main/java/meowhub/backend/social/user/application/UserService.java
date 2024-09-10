package meowhub.backend.social.user.application;

import meowhub.backend.social.user.application.dtos.UserDto;

import java.util.List;

public interface UserService {
    List<UserDto> getAllUsers();
}
