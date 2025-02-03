package meowhub.backend.users.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import meowhub.backend.users.constants.PrivacySettings;

@Getter
@Setter
@AllArgsConstructor
public class PrivacySettingsDto {
    private PrivacySettings postPrivacy;
    private PrivacySettings profilePrivacy;
    private PrivacySettings friendsPrivacy;
}
