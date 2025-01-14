package meowhub.backend.profiles.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import meowhub.backend.users.models.Gender;

@Getter
@Setter
@AllArgsConstructor
public class ProfileDto {
    private String profilePicture;
    private String content;
    private Gender gender;
}
