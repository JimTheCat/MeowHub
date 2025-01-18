package meowhub.backend.profiles.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class ProfileDto {
    private String profilePictureUrl;
    private String content;
    private LocalDateTime createdAt;
    private String gender;
}
