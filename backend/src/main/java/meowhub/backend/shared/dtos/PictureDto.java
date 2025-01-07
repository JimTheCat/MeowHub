package meowhub.backend.shared.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
public class PictureDto {
    private String id;
    private String url;
    private Long index;
    private LocalDateTime createdAt;
}
