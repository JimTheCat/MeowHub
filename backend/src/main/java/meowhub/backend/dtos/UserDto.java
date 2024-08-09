package meowhub.backend.dtos;

import lombok.*;
import meowhub.backend.models.User;

import java.time.LocalDate;

@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private String login;
    private String email;
    private String name;
    private String secondName;
    private String lastName;
    private LocalDate birthdate;

    public UserDto(User user) {
        this.login = user.getLogin()    ;
        this.email = user.getEmail();
        this.name = user.getName();
        this.secondName = user.getSecondName();
        this.lastName = user.getLastname();
        this.birthdate = user.getBirthdate();
    }
}
