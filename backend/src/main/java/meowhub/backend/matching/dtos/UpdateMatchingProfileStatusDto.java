package meowhub.backend.matching.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import meowhub.backend.chats.constants.OnlineStatus;

@Getter
@Setter
@AllArgsConstructor
public class UpdateMatchingProfileStatusDto {
    private String id;
    private OnlineStatus status;
}
