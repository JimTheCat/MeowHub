package meowhub.backend.users.controllers;

import lombok.RequiredArgsConstructor;
import meowhub.backend.users.dtos.BasicUserInfoDto;
import meowhub.backend.users.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.webjars.NotFoundException;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("get-basic-user-info")
    public ResponseEntity<BasicUserInfoDto> getBasicUserInfo(String login) {
        try {
            userService.getBasicUserInfo(login);
            return ResponseEntity.ok(userService.getBasicUserInfo(login));
        } catch (NotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
