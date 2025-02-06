package meowhub.backend.matching.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class MatchingChatNotification {
    private String matchingChatId;
    private String senderId;
    private String receiverId;
    private String content;
}
