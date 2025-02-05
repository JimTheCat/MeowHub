package meowhub.backend.chats.dtos;

import lombok.Getter;
import lombok.Setter;
import meowhub.backend.chats.constants.OnlineStatus;
import meowhub.backend.users.dtos.BasicUserInfoDto;

@Getter
@Setter
public class ChatBasicUserInfoDto extends BasicUserInfoDto {
    private String chatroomId;
    private String nickname;
    private OnlineStatus status;

    public ChatBasicUserInfoDto(String id, String name, String surname, String login, String profilePictureUrl, String chatroomId, String nickname, String onlineStatus) {
        super(id, name, surname, login, profilePictureUrl);
        this.chatroomId = chatroomId;
        this.nickname = nickname;
        this.status = OnlineStatus.valueOf(onlineStatus);
    }
}
