package meowhub.backend.users.dtos;

import lombok.Builder;
import lombok.Data;
import meowhub.backend.users.constants.Genders;
import meowhub.backend.users.constants.Roles;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
public class UserDto {
    private String userId;
    private String login;
    private String email;
    private String name;
    private String surname;
    private LocalDate birthdate;
    private Genders gender;
    private LocalDateTime createdAt;
    private Roles role;
    private boolean isAccountNonExpired;
}
