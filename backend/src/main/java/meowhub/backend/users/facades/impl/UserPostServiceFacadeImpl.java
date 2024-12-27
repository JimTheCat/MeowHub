package meowhub.backend.users.facades.impl;

import lombok.RequiredArgsConstructor;
import meowhub.backend.users.dtos.BasicUserInfoDto;
import meowhub.backend.users.facades.UserPostServiceFacade;
import meowhub.backend.users.models.User;
import meowhub.backend.users.services.UserQueryService;
import meowhub.backend.users.services.UserValidationService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserPostServiceFacadeImpl implements UserPostServiceFacade {
    private final UserValidationService userValidationService;
    private final UserQueryService userQueryService;

    @Override
    public void validateIfUserExists(String login) {
        userValidationService.validateIfUserExists(login);
    }

    @Override
    public User findUserByLogin(String login) {
        return userQueryService.findUserByLogin(login);
    }

    @Override
    public BasicUserInfoDto getBasicUserInfo(String login) {
        return userQueryService.getBasicUserInfo(login);
    }
}
