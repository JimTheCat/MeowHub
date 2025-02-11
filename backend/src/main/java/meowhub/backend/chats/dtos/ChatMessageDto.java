package meowhub.backend.chats.dtos;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ChatMessageDto {
    private String chatMessageId;
    private String chatroomId;
    private String senderLogin;
    private String receiverLogin;
    private String content;
    private LocalDateTime timestamp;
}
