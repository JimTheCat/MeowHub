package meowhub.backend.matching.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class BasicMatchingProfileInfoDto {
    private String id;
    private String name;
    private String pictureUrl;
}
