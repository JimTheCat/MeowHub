package meowhub.backend.services.impl;

import lombok.RequiredArgsConstructor;
import meowhub.backend.constants.Genders;
import meowhub.backend.constants.Roles;
import meowhub.backend.dtos.UserDto;
import meowhub.backend.jpa_buddy.Role;
import meowhub.backend.jpa_buddy.User;
import meowhub.backend.repositories.RoleRepository;
import meowhub.backend.repositories.UserRepository;
import meowhub.backend.services.UserService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

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
    public void changeUserRole(String userId, String roleCode) {
        User user = userRepository.findById(userId).orElseThrow();
        Role role = roleRepository.findByCode(roleCode).orElseThrow();

        user.setRole(role);
        userRepository.save(user);
    }

    private UserDto mapToUserDto(User user) {
        if (user == null) throw new NullPointerException();

        Genders gender = Genders.valueOf(user.getGender().getCode());
        Roles role = Roles.valueOf(user.getRole().getCode());

        return UserDto.builder()
                .userId(user.getId())
                .login(user.getLogin())
                .email(user.getEmail())
                .name(user.getName())
                .surname(user.getSurname())
                .birthdate(user.getBirthdate())
                .gender(gender)
                .createdAt(user.getCreatedAt())
                .role(role)
                .build();
    }
}
