package meowhub.backend.profiles.dtos;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
public class ProfileDto {
    private String profilePicture;
    private String content;
    private LocalDate createdAt;

    public ProfileDto(String profilePicture, String content, LocalDateTime createdAt) {
        this.profilePicture = profilePicture;
        this.content = content;
        this.createdAt = createdAt.toLocalDate();
    }
}
