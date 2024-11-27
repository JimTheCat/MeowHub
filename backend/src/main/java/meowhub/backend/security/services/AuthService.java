package meowhub.backend.security.services;

import meowhub.backend.security.requests.LoginRequest;
import meowhub.backend.security.requests.SignUpRequest;
import meowhub.backend.security.responses.LoginResponse;

public interface AuthService {
    LoginResponse authenticateUser(LoginRequest request);

    void signUpUser(SignUpRequest request);
}
