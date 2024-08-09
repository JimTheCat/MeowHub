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
public class RegisterDto {
    private String login;
    private String password;
    private String email;
    private String name;
    private String secondName;
    private String lastName;
    private LocalDate birthdate;

    public boolean checkIfValid(){
        if(login.isBlank() || login.replaceAll("\\s", "").length() < 3) throw new IllegalArgumentException("Login has to have at least 3 characters without whitespaces");
        if(password.isBlank() || password.replaceAll("\\s", "").length() < 3) throw new IllegalArgumentException("Password has to have at least 3 characters without whitespaces");
        // reszta sprawdzeń - todo

        return true;
    }

    public User mapToUser(){
        //każdy użytkownik domyślnie tworzy się jako zwykły user. Potem admin może to zmienić
        User user = User.builder()
                .email(email)
                .login(login)
                .name(name)
                .secondName(secondName)
                .lastname(lastName)
                .birthdate(birthdate)
                .password(password)
                .build();

        return user;
    }
}
