package meowhub.backend.security.controllers;

import lombok.RequiredArgsConstructor;
import meowhub.backend.users.dtos.UserDto;
import meowhub.backend.users.facades.UserAdminServiceFacade;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {
    private final UserAdminServiceFacade userAdminServiceFacade;

    @GetMapping("/all-users")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<UserDto> allUsers = userAdminServiceFacade.getAllUsers();
        return ResponseEntity.ok(allUsers);
    }

    @PostMapping("/user/change-role")
    public ResponseEntity<String> changeUserRole(@RequestParam String userId, @RequestParam String roleName) {
        userAdminServiceFacade.changeUserRole(userId, roleName);
        return ResponseEntity.ok("Role updated");
    }
}
