package meowhub.backend.users.facades.impl;

import jakarta.annotation.security.RolesAllowed;
import lombok.RequiredArgsConstructor;
import meowhub.backend.dtos.UserDto;
import meowhub.backend.users.facades.UserAdminServiceFacade;
import meowhub.backend.users.services.UserQueryService;
import meowhub.backend.users.services.UserService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RolesAllowed("ROLE_ADMIN")
@RequiredArgsConstructor
public class UserAdminServiceFacadeImpl implements UserAdminServiceFacade {
    private final UserService userService;
    private final UserQueryService userQueryService;

    @Override
    public void changeUserRole(String userId, String roleName) {
        userService.changeUserRole(userId, roleName);
    }

    @Override
    public List<UserDto> getAllUsers() {
        return userQueryService.getAllUsers();
    }
}
