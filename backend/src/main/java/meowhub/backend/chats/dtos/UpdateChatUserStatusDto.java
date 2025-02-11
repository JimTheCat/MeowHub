package meowhub.backend.chats.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import meowhub.backend.chats.constants.OnlineStatus;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UpdateChatUserStatusDto {
    private String login;
    private OnlineStatus status;
}
