package meowhub.backend.posts.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import meowhub.backend.users.dtos.BasicUserInfoDto;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CommentDto {
    private String id;
    private String postId;
    private String parentId;
    private Long countOfReplies;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private String content;
    private BasicUserInfoDto author;
    private Boolean isDeleted;
}
