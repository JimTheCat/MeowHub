package meowhub.backend.dtos;

import lombok.Builder;
import lombok.Data;
import meowhub.backend.models.ApplicationRole;
import meowhub.backend.models.Gender;

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
    private Gender gender;
    private LocalDateTime createdAt;
    private ApplicationRole applicationRole;
    private boolean isAccountNonExpired;
}
