package meowhub.backend.security.requests;

import lombok.Getter;
import lombok.Setter;
import meowhub.backend.users.constants.Genders;

import java.time.LocalDate;

@Getter
@Setter
public class SignUpRequest {
    private String name;
    private String surname;
    private LocalDate birthdate;
    private Genders gender;
    private String email;
    private String login;
    private String password;
}
