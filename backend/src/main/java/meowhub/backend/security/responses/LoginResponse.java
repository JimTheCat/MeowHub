package meowhub.backend.security.responses;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class LoginResponse {
    private String jwtToken;
    private String login;
    private List<String> roles;
}
