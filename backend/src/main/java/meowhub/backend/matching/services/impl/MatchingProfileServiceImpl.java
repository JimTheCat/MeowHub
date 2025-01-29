package meowhub.backend.matching.services.impl;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import meowhub.backend.matching.dtos.CreateMatchingProfileRequestDto;
import meowhub.backend.matching.dtos.UpdateMatchingProfileRequestDto;
import meowhub.backend.matching.dtos.MatchingProfileDto;
import meowhub.backend.matching.models.MatchingProfile;
import meowhub.backend.matching.repositories.EducationRepository;
import meowhub.backend.matching.repositories.HowOftenRepository;
import meowhub.backend.matching.repositories.LookingForRepository;
import meowhub.backend.matching.repositories.MatchingProfileRepository;
import meowhub.backend.matching.repositories.PetRepository;
import meowhub.backend.matching.repositories.SexualityRepository;
import meowhub.backend.matching.services.MatchingProfilePictureService;
import meowhub.backend.matching.services.MatchingProfileQueryService;
import meowhub.backend.matching.services.MatchingProfileService;
import meowhub.backend.matching.services.MatchingProfileValidationService;
import meowhub.backend.shared.constants.AlertConstants;
import meowhub.backend.users.facades.UserMatchingServiceFacade;
import meowhub.backend.users.models.Gender;
import meowhub.backend.users.models.User;
import meowhub.backend.users.repositories.GenderRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class MatchingProfileServiceImpl implements MatchingProfileService {
    private static final int MINIMUM_AGE = 16;
    private static final String HOW_OFTEN = "HowOften";

    private final MatchingProfilePictureService matchingProfilePictureService;
    private final MatchingProfileValidationService matchingProfileValidationService;
    private final MatchingProfileQueryService matchingProfileQueryService;
    private final UserMatchingServiceFacade userMatchingServiceFacade;

    private final MatchingProfileRepository matchingProfileRepository;
    private final PetRepository petRepository;
    private final SexualityRepository sexualityRepository;
    private final LookingForRepository lookingForRepository;
    private final HowOftenRepository howOftenRepository;
    private final EducationRepository educationRepository;
    private final GenderRepository genderRepository;



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
        Gender gender = genderRepository.findByCode(request.getGender().name())
                .orElseThrow(() -> new IllegalArgumentException(String.format(AlertConstants.RESOURCE_NOT_FOUND, "Gender", "code", request.getGender())));

        MatchingProfile matchingProfile = new MatchingProfile();
        matchingProfile.setUser(user);
        matchingProfile.setBirthdate(request.getBirthdate());
        matchingProfile.setGender(gender);
        matchingProfile.setName(request.getName());
        matchingProfile = matchingProfileRepository.save(matchingProfile);

        return MatchingProfileDto.createFromMatchingProfile(matchingProfile);
    }

    @Override
    public MatchingProfileDto updateMatchingProfile(UpdateMatchingProfileRequestDto matchingProfileDto, String login) {
        MatchingProfile matchingProfile = matchingProfileQueryService.findMatchingProfileByLoginOrThrow(login);
        updateMatchingProfile(matchingProfile, matchingProfileDto);
        matchingProfileRepository.save(matchingProfile);
        return MatchingProfileDto.createFromMatchingProfile(matchingProfile);
    }

    private void updateMatchingProfile(MatchingProfile matchingProfile, UpdateMatchingProfileRequestDto request) {
        if (request.getPet() != null) {
            matchingProfile.setPets(petRepository.findByCode(request.getPet().name())
                    .orElseThrow(() -> new IllegalArgumentException(String.format(AlertConstants.RESOURCE_NOT_FOUND, "Pet", "id", request.getPet()))));
        } else {
            matchingProfile.setPets(null);
        }

        if (request.getSexuality() != null) {
            matchingProfile.setSexuality(sexualityRepository.findByCode(request.getSexuality().name())
                    .orElseThrow(() -> new IllegalArgumentException(String.format(AlertConstants.RESOURCE_NOT_FOUND, "Sexuality", "id", request.getSexuality()))));
        } else {
            matchingProfile.setSexuality(null);
        }

        if (request.getLookingFor() != null) {
            matchingProfile.setLookingFor(lookingForRepository.findByCode(request.getLookingFor().name())
                    .orElseThrow(() -> new IllegalArgumentException(String.format(AlertConstants.RESOURCE_NOT_FOUND, "LookingFor", "id", request.getLookingFor()))));
        } else {
            matchingProfile.setLookingFor(null);
        }

        if (request.getDrinker() != null) {
            matchingProfile.setDrinker(howOftenRepository.findByCode(request.getDrinker().name())
                    .orElseThrow(() -> new IllegalArgumentException(String.format(AlertConstants.RESOURCE_NOT_FOUND, HOW_OFTEN, "id", request.getDrinker()))));
        } else {
            matchingProfile.setDrinker(null);
        }

        if (request.getSmoker() != null) {
            matchingProfile.setSmoker(howOftenRepository.findByCode(request.getSmoker().name())
                    .orElseThrow(() -> new IllegalArgumentException(String.format(AlertConstants.RESOURCE_NOT_FOUND, HOW_OFTEN, "id", request.getSmoker()))));
        } else {
            matchingProfile.setSmoker(null);
        }

        if (request.getExercises() != null) {
            matchingProfile.setExercises(howOftenRepository.findByCode(request.getExercises().name())
                    .orElseThrow(() -> new IllegalArgumentException(String.format(AlertConstants.RESOURCE_NOT_FOUND, HOW_OFTEN, "id", request.getExercises()))));
        } else {
            matchingProfile.setExercises(null);
        }

        if (request.getEducation() != null) {
            matchingProfile.setEducation(educationRepository.findByCode(request.getEducation().name())
                    .orElseThrow(() -> new IllegalArgumentException(String.format(AlertConstants.RESOURCE_NOT_FOUND, "Education", "id", request.getEducation()))));
        } else {
            matchingProfile.setEducation(null);
        }

        if (request.getHeight() == 0) {
            //do nothing
        } else if (request.getHeight() > 140) {
            matchingProfile.setHeight(request.getHeight());
        } else {
            throw new IllegalArgumentException(AlertConstants.HEIGHT_TOO_LOW);
        }
        matchingProfile.setProfileDetailsHtml(request.getAboutMe());
    }

    @Override
    @Transactional
    public void deleteMatchingProfile(String login) {
        MatchingProfile matchingProfile = matchingProfileQueryService.findMatchingProfileByLoginOrThrow(login);

        matchingProfile.getMatchingProfilePictures().forEach(picture -> matchingProfilePictureService.intDeleteMatchingProfilePicture(picture.getId()));
        matchingProfileRepository.delete(matchingProfile);
    }
}
