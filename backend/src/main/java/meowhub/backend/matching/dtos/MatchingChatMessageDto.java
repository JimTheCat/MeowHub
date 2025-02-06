package meowhub.backend.matching.dtos;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class MatchingChatMessageDto {
    private String matchingChatMessageId;
    private String matchingChatId;
    private String senderId;
    private String receiverId;
    private String content;
    private LocalDateTime timestamp;
}
