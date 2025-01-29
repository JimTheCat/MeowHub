package meowhub.backend.users.services.impl;

import lombok.RequiredArgsConstructor;
import meowhub.backend.shared.constants.AlertConstants;
import meowhub.backend.users.repositories.UserRepository;
import meowhub.backend.users.services.UserValidationService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserValidationServiceImpl implements UserValidationService {
    private final UserRepository userRepository;
    @Override
    public boolean existsByEmail (String email) {
        return userRepository.existsByEmail(email);
    }
    @Override
    public boolean existsByLogin(String login) {
        return userRepository.existsByLogin(login);
    }
    @Override
    public void validateIfUserExists(String login) {
        userRepository.findByLogin(login).orElseThrow(() ->
                new UsernameNotFoundException(String.format(AlertConstants.USER_WITH_LOGIN_NOT_FOUND, login))
        );
    }
}
