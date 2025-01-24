package meowhub.backend.shared.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PictureDto {
    private String id;
    private String url;
    private boolean isCurrentProfilePicture;
    private LocalDateTime createdAt;
}
