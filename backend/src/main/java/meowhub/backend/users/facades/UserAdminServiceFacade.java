package meowhub.backend.users.facades;

import meowhub.backend.dtos.UserDto;

import java.util.List;

public interface UserAdminServiceFacade {
    void changeUserRole(String userId, String roleName);

    List<UserDto> getAllUsers();
}
