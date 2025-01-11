package meowhub.backend.users.facades.impl;

import lombok.RequiredArgsConstructor;
import meowhub.backend.users.facades.UserProfileServiceFacade;
import meowhub.backend.users.models.User;
import meowhub.backend.users.services.UserQueryService;
import meowhub.backend.users.services.UserValidationService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserProfileServiceFacadeImpl implements UserProfileServiceFacade {
    private final UserQueryService userQueryService;
    private final UserValidationService userValidationService;

    @Override
    public User findUserByLogin(String login) {
        return userQueryService.findUserByLogin(login);
    }

    @Override
    public void validateIfUserExists(String login) {
        userValidationService.validateIfUserExists(login);
    }
}
