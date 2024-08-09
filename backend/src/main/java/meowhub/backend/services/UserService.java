package meowhub.backend.services;

import meowhub.backend.dtos.LoginDto;
import meowhub.backend.dtos.RegisterDto;
import meowhub.backend.dtos.UserDto;
import meowhub.backend.models.User;

import java.util.List;


public interface UserService {

    UserDto getUser(Long id);

    List<UserDto> getAllUsers();

    Boolean login(LoginDto loginDto);

    UserDto register(RegisterDto registerDto);

    Boolean userExists(Long id);

}
