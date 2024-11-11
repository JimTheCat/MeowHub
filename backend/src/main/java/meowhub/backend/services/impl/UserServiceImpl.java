package meowhub.backend.services.impl;

import meowhub.backend.dtos.UserDto;
import meowhub.backend.models.ApplicationRole;
import meowhub.backend.models.Role;
import meowhub.backend.models.User;
import meowhub.backend.repositories.RoleRepository;
import meowhub.backend.repositories.UserRepository;
import meowhub.backend.services.UserService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public UserServiceImpl(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @Override
    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream().map(this::mapToUserDto).toList();
    }

    @Override
    public UserDto getUserById(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow();

        return mapToUserDto(user);
    }

    @Override
    public void changeUserRole(String userId, String roleName) {
        User user = userRepository.findById(userId).orElseThrow();
        ApplicationRole applicationRole = ApplicationRole.valueOf(roleName);
        Role role = roleRepository.findByRoleName(applicationRole).orElseThrow();

        user.setRole(role);
        userRepository.save(user);
    }

    private UserDto mapToUserDto(User user) {
        if (user == null) throw new NullPointerException();

        return UserDto.builder()
                .userId(user.getUserId())
                .login(user.getLogin())
                .email(user.getEmail())
                .name(user.getName())
                .surname(user.getSurname())
                .birthdate(user.getBirthdate())
                .isAccountNonExpired(user.isAccountNonExpired())
                .gender(user.getGender())
                .createdAt(user.getCreatedDate())
                .applicationRole(user.getRole().getRoleName())
                .build();
    }
}
