package meowhub.backend.dtos;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Builder
@Data
public class PostDto {
    private String content;
    private String ownerLogin;
    private LocalDate createdAt;
}
