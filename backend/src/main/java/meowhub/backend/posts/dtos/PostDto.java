package meowhub.backend.posts.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import meowhub.backend.shared.dtos.PictureDto;
import meowhub.backend.users.dtos.BasicUserInfoDto;

import java.time.LocalDateTime;
import java.util.List;

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
    private List<PictureDto> pictures;

    //used for postRepository "find" queries
    public PostDto(String id, String content, BasicUserInfoDto author, Long numberOfComments, LocalDateTime createdAt) {
        this.id = id;
        this.content = content;
        this.author = author;
        this.numberOfComments = numberOfComments;
        this.createdAt = createdAt;
    }
}
