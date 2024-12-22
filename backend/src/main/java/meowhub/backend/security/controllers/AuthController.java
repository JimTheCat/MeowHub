package meowhub.backend.security.controllers;

import lombok.RequiredArgsConstructor;
import meowhub.backend.security.requests.LoginRequest;
import meowhub.backend.security.responses.LoginResponse;
import meowhub.backend.security.requests.SignUpRequest;
import meowhub.backend.security.services.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/public/sign-in")
    public ResponseEntity<Object> authenticateUser(@RequestBody LoginRequest request) {
        LoginResponse response = authService.authenticateUser(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/public/sign-up")
    public ResponseEntity<Object> signUpUser(@RequestBody SignUpRequest request) {
        authService.signUpUser(request);
        return ResponseEntity.ok("User registration complete");
    }
}