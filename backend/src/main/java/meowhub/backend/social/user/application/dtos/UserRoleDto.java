package meowhub.backend.social.user.application.dtos;

import lombok.Getter;
import lombok.Setter;
import meowhub.backend.social.user.domain.models.UserRole;

@Getter
@Setter
public class UserRoleDto {
    private Long Id;
    private String name;
    private String description;

    public static UserRoleDto mapUserRoleToUserRoleDto(UserRole userRole){
        UserRoleDto userRoleDto = new UserRoleDto();

        userRoleDto.setId(userRole.getId());
        userRoleDto.setName(userRole.getName());
        userRoleDto.setDescription(userRole.getDescription());

        return userRoleDto;
    }
}
