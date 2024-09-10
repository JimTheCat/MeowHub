package meowhub.backend.social.user.application.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import meowhub.backend.social.user.domain.models.User;

import java.time.LocalDate;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

    private long id;

    private String login;

    private String name;

    private String secondName;

    private String lastName;

    private String password;

    private String salt;

    private UserRoleDto role;

    private LocalDate birthdate;

    private String email;

    private UserStatusDto status;

    public static UserDto mapUserToUserDto(User user){
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setName(user.getName());
        userDto.setSecondName(user.getSecondName());
        userDto.setLastName(user.getLastName());
        userDto.setRole(UserRoleDto.mapUserRoleToUserRoleDto(user.getRole()));

        return userDto;
    }
}
