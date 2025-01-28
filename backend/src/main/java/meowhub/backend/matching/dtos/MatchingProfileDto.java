package meowhub.backend.matching.dtos;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import meowhub.backend.constants.Genders;
import meowhub.backend.matching.constants.Education;
import meowhub.backend.matching.constants.HowOften;
import meowhub.backend.matching.constants.LookingFor;
import meowhub.backend.matching.constants.Pets;
import meowhub.backend.matching.constants.Sexuality;
import meowhub.backend.matching.models.MatchingProfile;
import meowhub.backend.matching.models.MatchingProfilePicture;
import meowhub.backend.shared.dtos.PictureDto;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class MatchingProfileDto {
    //profile information
    private String id;
    private String name;
    private Long age;
    private List<PictureDto> pictures;
    private String aboutMe;
    private LookingFor lookingFor;
    private Genders gender;

    //preferences - TODO: in the future

    //personal information
    private Sexuality sexuality;
    private Education education;
    private HowOften drinker;
    private HowOften smoker;
    private HowOften exercises;
    private Pets pet;

    public static MatchingProfileDto createFromMatchingProfile(MatchingProfile matchingProfile) {
        MatchingProfileDto profile = new MatchingProfileDto();
        profile.id = matchingProfile.getId();
        profile.name = matchingProfile.getName();
        profile.age = ChronoUnit.YEARS.between(matchingProfile.getBirthdate(), LocalDate.now());
        profile.gender = matchingProfile.getGender() == null ? null : Genders.valueOf(matchingProfile.getGender().getCode());
        profile.pictures = matchingProfile.getMatchingProfilePictures().stream().map(MatchingProfileDto::createFromPicture).toList();
        profile.aboutMe = matchingProfile.getProfileDetailsHtml();
        profile.lookingFor = matchingProfile.getLookingFor() == null ? null : LookingFor.valueOf(matchingProfile.getLookingFor().getCode());
        profile.sexuality = matchingProfile.getSexuality() == null ? null : Sexuality.valueOf(matchingProfile.getSexuality().getCode());
        profile.education = matchingProfile.getEducation() == null ? null : Education.valueOf(matchingProfile.getEducation().getCode());
        profile.drinker = matchingProfile.getDrinker() == null ? null : HowOften.valueOf(matchingProfile.getDrinker().getCode());
        profile.smoker = matchingProfile.getSmoker() == null ? null : HowOften.valueOf(matchingProfile.getSmoker().getCode());
        profile.exercises = matchingProfile.getExercises() == null ? null : HowOften.valueOf(matchingProfile.getExercises().getCode());
        profile.pet = matchingProfile.getPets() == null ? null : Pets.valueOf(matchingProfile.getPets().getCode());
        return profile;
    }

    private static PictureDto createFromPicture(MatchingProfilePicture picture) {
        return new PictureDto(picture.getId(), picture.getOciUrl(), picture.getCreatedAt());
    }
}
