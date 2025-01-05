package meowhub.backend.users.controllers;

import lombok.RequiredArgsConstructor;
import meowhub.backend.users.dtos.BasicUserInfoDto;
import meowhub.backend.users.services.UserQueryService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserQueryService userQueryService;

    @GetMapping("/basic-user-info")
    public ResponseEntity<BasicUserInfoDto> getBasicUserInfoTemp(String login) {
        return ResponseEntity.ok(userQueryService.getBasicUserInfo(login));
    }

    @GetMapping("/search")
    public ResponseEntity<Page<BasicUserInfoDto>> searchUsers(@RequestParam(required = false) String query, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        Page<BasicUserInfoDto> users = userQueryService.searchUsers(query, page, size);
        return ResponseEntity.ok(users);
    }
}
