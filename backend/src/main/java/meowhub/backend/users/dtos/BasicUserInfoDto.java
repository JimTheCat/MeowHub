package meowhub.backend.users.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class BasicUserInfoDto {
    private String id;
    private String name;
    private String surname;
    private String login;
    private byte[] profilePicture;
}
