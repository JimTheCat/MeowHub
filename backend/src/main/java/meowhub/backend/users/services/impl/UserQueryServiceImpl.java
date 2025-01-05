package meowhub.backend.users.services.impl;

import jakarta.annotation.security.RolesAllowed;
import lombok.RequiredArgsConstructor;
import meowhub.backend.constants.Genders;
import meowhub.backend.constants.Roles;
import meowhub.backend.dtos.UserDto;
import meowhub.backend.shared.constants.AlertConstants;
import meowhub.backend.users.dtos.BasicUserInfoDto;
import meowhub.backend.users.models.User;
import meowhub.backend.users.repositories.UserRepository;
import meowhub.backend.users.services.UserQueryService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserQueryServiceImpl implements UserQueryService {
    private final UserRepository userRepository;

    public Page<BasicUserInfoDto> searchUsers(String query, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        if (query == null || query.isBlank()) {
            return userRepository.findAll(pageable).map(user -> new BasicUserInfoDto(user.getId(), user.getName(), user.getSurname(), user.getLogin(), null));
        }

        return userRepository.searchByQuery(query, pageable);
    }

    @Override
    public BasicUserInfoDto getBasicUserInfo(String login) {
        return userRepository.findBasicUserInfoByLogin(login)
                .orElseThrow(() -> new UsernameNotFoundException(String.format(AlertConstants.USER_WITH_LOGIN_NOT_FOUND, login)));
    }

    @RolesAllowed("ROLE_ADMIN")
    @Override
    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream().map(this::mapToUserDto).toList();
    }

    @Override
    public User findUserByLogin(String login) {
        return userRepository.findByLogin(login)
                .orElseThrow(() -> new UsernameNotFoundException(String.format(AlertConstants.USER_WITH_LOGIN_NOT_FOUND, login)));
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
