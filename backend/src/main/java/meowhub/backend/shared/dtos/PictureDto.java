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
    private Long index;
    private LocalDateTime createdAt;

    //for any other than matching profile picture
    public PictureDto(String id, String url, LocalDateTime createdAt) {
        this.id = id;
        this.url = url;
        this.createdAt = createdAt;
    }
}
