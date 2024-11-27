package meowhub.backend.security.controllers;

import lombok.RequiredArgsConstructor;
import meowhub.backend.security.requests.LoginRequest;
import meowhub.backend.security.responses.LoginResponse;
import meowhub.backend.security.requests.SignUpRequest;
import meowhub.backend.security.services.AuthService;
import org.hibernate.NonUniqueObjectException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/public/sign-in")
    public ResponseEntity<Object> authenticateUser(@RequestBody LoginRequest request) {
        try {
            LoginResponse response = authService.authenticateUser(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> map = new HashMap<>();
            map.put("message", "Bad credentials");
            map.put("status", Boolean.FALSE);
            return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/public/sign-up")
    public ResponseEntity<Object> signUpUser(@RequestBody SignUpRequest request) {
        try {
            authService.signUpUser(request);
            return ResponseEntity.ok("User registration complete");
        } catch (NonUniqueObjectException e) {
            return new ResponseEntity<>(e.getIdentifier(), HttpStatus.NOT_ACCEPTABLE);
        }
    }
}