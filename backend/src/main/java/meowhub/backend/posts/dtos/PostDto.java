package meowhub.backend.posts.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import meowhub.backend.users.dtos.BasicUserInfoDto;

import java.time.LocalDateTime;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostDto {
    private String id;
    private String content;
    private BasicUserInfoDto author;
    private Long numberOfComments;
    private LocalDateTime createdAt;
}
