package meowhub.backend.matching.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import meowhub.backend.chats.constants.OnlineStatus;
import meowhub.backend.users.models.OnlineStatusDictionary;

@Getter
@Setter
@AllArgsConstructor
public class BasicMatchingProfileInfoDto {
    private String id;
    private String name;
    private OnlineStatus status;
    private String pictureUrl;

    public BasicMatchingProfileInfoDto(String id, String name, OnlineStatusDictionary status, String pictureUrl) {
        this.id = id;
        this.name = name;
        this.status = OnlineStatus.valueOf(status.getCode());
        this.pictureUrl = pictureUrl;
    }
}
