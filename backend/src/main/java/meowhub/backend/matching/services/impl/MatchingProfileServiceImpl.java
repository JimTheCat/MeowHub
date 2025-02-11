package meowhub.backend.matching.services.impl;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import meowhub.backend.matching.dtos.CreateMatchingProfileRequestDto;
import meowhub.backend.matching.dtos.MatchingProfilePreferencesDto;
import meowhub.backend.matching.dtos.UpdateMatchingProfileRequestDto;
import meowhub.backend.matching.dtos.MatchingProfileDto;
import meowhub.backend.matching.models.MatchingProfile;
import meowhub.backend.matching.repositories.MatchingProfileRepository;
import meowhub.backend.matching.services.MatchingDictionaryQueryService;
import meowhub.backend.matching.services.MatchingProfilePictureService;
import meowhub.backend.matching.services.MatchingProfileQueryService;
import meowhub.backend.matching.services.MatchingProfileService;
import meowhub.backend.matching.services.MatchingProfileValidationService;
import meowhub.backend.shared.constants.AlertConstants;
import meowhub.backend.users.facades.UserMatchingServiceFacade;
import meowhub.backend.users.models.User;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MatchingProfileServiceImpl implements MatchingProfileService {
    private static final int MINIMUM_AGE = 16;

    private final MatchingProfilePictureService matchingProfilePictureService;
    private final MatchingProfileValidationService matchingProfileValidationService;
    private final MatchingProfileQueryService matchingProfileQueryService;
    private final MatchingDictionaryQueryService matchingDictionaryQueryService;
    private final UserMatchingServiceFacade userMatchingServiceFacade;
    private final MatchingProfileRepository matchingProfileRepository;

    @Override
    public MatchingProfileDto createMatchingProfileBasedOnAccount(String login) {
        matchingProfileValidationService.validateIfMatchingProfileAlreadyExists(login);
        User user = userMatchingServiceFacade.findUserByLogin(login);

        MatchingProfile matchingProfile = new MatchingProfile();
        matchingProfile.setUser(user);
        matchingProfile.setBirthdate(user.getBirthdate());
        matchingProfile.setGender(user.getGender());
        matchingProfile.setName(user.getName());
        matchingProfile = matchingProfileRepository.save(matchingProfile);

        return MatchingProfileDto.createFromMatchingProfile(matchingProfile);
    }

    @Override
    public MatchingProfileDto createMatchingProfileFromScratch(CreateMatchingProfileRequestDto request, String login) {
        matchingProfileValidationService.validateIfMatchingProfileAlreadyExists(login);

        if (request.getBirthdate() == null || request.getBirthdate().isAfter(LocalDate.now().minusYears(MINIMUM_AGE))) {
            throw new IllegalArgumentException(String.format(AlertConstants.ILLEGAL_ARGUMENT, "birthdate", " null and must be at least " + MINIMUM_AGE + " years old"));
        } else if (request.getName() == null || request.getName().isEmpty()) {
            throw new IllegalArgumentException(String.format(AlertConstants.VALUE_REQUIRED, "name"));
        }

        User user = userMatchingServiceFacade.findUserByLogin(login);
        MatchingProfile matchingProfile = new MatchingProfile();
        matchingProfile.setUser(user);
        matchingProfile.setBirthdate(request.getBirthdate());
        matchingProfile.setGender(userMatchingServiceFacade.getGenderByEnumOrThrow(request.getGender()));
        matchingProfile.setName(request.getName());
        matchingProfile = matchingProfileRepository.save(matchingProfile);

        return MatchingProfileDto.createFromMatchingProfile(matchingProfile);
    }

    @Override
    public MatchingProfileDto updateMatchingProfile(UpdateMatchingProfileRequestDto request, String login) {
        MatchingProfile matchingProfile = matchingProfileQueryService.findMatchingProfileByLoginOrThrow(login);

        //updating matching profile
        Optional.ofNullable(request.getPet()).ifPresent(pet -> matchingProfile.setPets(matchingDictionaryQueryService.getPetByEnumOrThrow(pet)));
        Optional.ofNullable(request.getSexuality()).ifPresent(sexuality -> matchingProfile.setSexuality(matchingDictionaryQueryService.getSexualityByEnumOrThrow(sexuality)));
        Optional.ofNullable(request.getDrinker()).ifPresent(drinker -> matchingProfile.setDrinker(matchingDictionaryQueryService.getHowOftenByEnumOrThrow(drinker)));
        Optional.ofNullable(request.getSmoker()).ifPresent(smoker -> matchingProfile.setSmoker(matchingDictionaryQueryService.getHowOftenByEnumOrThrow(smoker)));
        Optional.ofNullable(request.getLookingFor()).ifPresent(lookingFor -> matchingProfile.setLookingFor(matchingDictionaryQueryService.getLookingForByEnumOrThrow(lookingFor)));
        Optional.ofNullable(request.getExercises()).ifPresent(exercises -> matchingProfile.setExercises(matchingDictionaryQueryService.getHowOftenByEnumOrThrow(exercises)));
        Optional.ofNullable(request.getEducation()).ifPresent(education -> matchingProfile.setEducation(matchingDictionaryQueryService.getEducationByEnumOrThrow(education)));
        Optional.ofNullable(request.getHeight()).ifPresent(matchingProfile::setHeight);
        matchingProfile.setProfileDetailsHtml(request.getAboutMe());

        matchingProfileRepository.save(matchingProfile);
        return MatchingProfileDto.createFromMatchingProfile(matchingProfile);
    }

    @Override
    public void updateMatchingProfilePreferences(MatchingProfilePreferencesDto preferences, String login) {
        MatchingProfile matchingProfile = matchingProfileQueryService.findMatchingProfileByLoginOrThrow(login);
        matchingProfile.setPHeightFrom(preferences.getHeightFrom());
        matchingProfile.setPHeightTo(preferences.getHeightTo());
        matchingProfile.setPAgeFrom(preferences.getAgeFrom());
        matchingProfile.setPAgeTo(preferences.getAgeTo());
        matchingProfile.setPGender(userMatchingServiceFacade.getGenderByEnumOrThrow(preferences.getGender()));
        matchingProfile.setPLookingFor(matchingDictionaryQueryService.getLookingForByEnumOrThrow(preferences.getLookingFor()));
        matchingProfileRepository.save(matchingProfile);
    }

    @Override
    @Transactional
    public void deleteMatchingProfile(String login) {
        MatchingProfile matchingProfile = matchingProfileQueryService.findMatchingProfileByLoginOrThrow(login);

        matchingProfile.getMatchingProfilePictures().forEach(picture -> matchingProfilePictureService.intDeleteMatchingProfilePicture(picture.getId()));
        matchingProfileRepository.delete(matchingProfile);
    }

    @Override
    public void saveProfile(MatchingProfile profile) {
        matchingProfileRepository.save(profile);
    }
}
