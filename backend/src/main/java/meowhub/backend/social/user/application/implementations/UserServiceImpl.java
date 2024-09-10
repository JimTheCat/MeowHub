package meowhub.backend.social.user.application.implementations;

import meowhub.backend.social.user.application.dtos.UserDto;
import meowhub.backend.social.user.application.UserService;
import meowhub.backend.social.user.domain.models.User;
import meowhub.backend.social.user.domain.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    public List<UserDto> getAllUsers() {
        List<User> users = userRepository.findAll();
        List<UserDto> usersDto = users.stream().map(UserDto::mapUserToUserDto).toList();

        return usersDto;
    }
}
