package meowhub.backend.matching.dtos;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Getter;
import lombok.Setter;
import meowhub.backend.matching.constants.LookingFor;
import meowhub.backend.matching.constants.Sexuality;
import meowhub.backend.matching.models.MatchingProfile;

@Setter
@Getter
public class MatchingProfilePreferencesDto {
    @Min(120)
    @Max(300)
    @Nullable
    private Short heightFrom;

    @Min(120)
    @Max(300)
    @Nullable
    private Short heightTo;

    @Min(16)
    @Max(100)
    @Nullable
    private Short ageFrom;

    @Min(16)
    @Max(100)
    @Nullable
    private Short ageTo;

    private Sexuality sexuality;

    private LookingFor lookingFor;

    public static MatchingProfilePreferencesDto createFromMatchingProfilePreferencesFromMatchingProfile(MatchingProfile matchingProfile) {
        MatchingProfilePreferencesDto matchingProfilePreferencesDto = new MatchingProfilePreferencesDto();
        matchingProfilePreferencesDto.setHeightFrom(matchingProfile.getPHeightFrom());
        matchingProfilePreferencesDto.setHeightTo(matchingProfile.getPHeightTo());
        matchingProfilePreferencesDto.setAgeFrom(matchingProfile.getPAgeFrom());
        matchingProfilePreferencesDto.setAgeTo(matchingProfile.getPAgeTo());
        matchingProfilePreferencesDto.setSexuality(Sexuality.valueOf(matchingProfile.getPSexuality().getCode()));
        matchingProfilePreferencesDto.setLookingFor(LookingFor.valueOf(matchingProfile.getPLookingFor().getCode()));
        return matchingProfilePreferencesDto;
    }
}
