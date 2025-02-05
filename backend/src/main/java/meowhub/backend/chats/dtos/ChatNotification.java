package meowhub.backend.chats.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class ChatNotification {
    private String chatroomId;
    private String senderLogin;
    private String receiverLogin;
    private String content;
}
