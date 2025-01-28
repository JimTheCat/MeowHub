package meowhub.backend.matching.services.impl;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import meowhub.backend.matching.dtos.CreateMatchingProfileRequestDto;
import meowhub.backend.matching.dtos.UpdateMatchingProfileRequestDto;
import meowhub.backend.matching.dtos.MatchingProfileDto;
import meowhub.backend.matching.models.MatchingProfile;
import meowhub.backend.matching.models.MatchingProfilePicture;
import meowhub.backend.matching.repositories.EducationRepository;
import meowhub.backend.matching.repositories.HowOftenRepository;
import meowhub.backend.matching.repositories.LookingForRepository;
import meowhub.backend.matching.repositories.MatchingProfilePictureRepository;
import meowhub.backend.matching.repositories.MatchingProfileRepository;
import meowhub.backend.matching.repositories.PetRepository;
import meowhub.backend.matching.repositories.SexualityRepository;
import meowhub.backend.matching.services.MatchingProfileService;
import meowhub.backend.shared.constants.AlertConstants;
import meowhub.backend.shared.constants.Modules;
import meowhub.backend.shared.dtos.PictureDto;
import meowhub.backend.shared.utils.PictureUtils;
import meowhub.backend.users.facades.UserMatchingServiceFacade;
import meowhub.backend.users.models.Gender;
import meowhub.backend.users.models.User;
import meowhub.backend.users.repositories.GenderRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MatchingProfileServiceImpl implements MatchingProfileService {
    private static final int MINIMUM_AGE = 16;
    private static final String MATCHING_PROFILE = "Matching profile";
    private static final String HOW_OFTEN = "HowOften";

    private final MatchingProfileRepository matchingProfileRepository;
    private final MatchingProfilePictureRepository matchingProfilePictureRepository;
    private final UserMatchingServiceFacade userMatchingServiceFacade;
    private final PetRepository petRepository;
    private final SexualityRepository sexualityRepository;
    private final LookingForRepository lookingForRepository;
    private final HowOftenRepository howOftenRepository;
    private final EducationRepository educationRepository;
    private final PictureUtils pictureUtils;
    private final GenderRepository genderRepository;

    @Override
    public MatchingProfileDto getMyProfile(String login) {
        if (!matchingProfileRepository.existsByUserLogin(login)) {
            return null;
        }
        return matchingProfileRepository.findByUserLogin(login).map(MatchingProfileDto::createFromMatchingProfile).orElseThrow();
    }

    @Override
    public MatchingProfileDto createMatchingProfileBasedOnAccount(String login) {
        validateIfMatchingProfileAlreadyExists(login);
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
        validateIfMatchingProfileAlreadyExists(login);

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
        MatchingProfile matchingProfile = findMatchingProfileByLoginOrThrow(login);
        updateMatchingProfile(matchingProfile, matchingProfileDto);
        matchingProfileRepository.save(matchingProfile);
        return MatchingProfileDto.createFromMatchingProfile(matchingProfile);
    }

    @Override
    @Transactional
    public List<PictureDto> addMatchingProfilePictures(List<MultipartFile> pictures, String profilePictureName, String login) {
        if (pictures == null || pictures.isEmpty() || pictures.getFirst().getContentType() == null) {
            throw new IllegalArgumentException(AlertConstants.VALUE_REQUIRED_TITLE);
        }

        MatchingProfile matchingProfile = findMatchingProfileByLoginOrThrow(login);
        int currentlyPictures = matchingProfilePictureRepository.countAllByMatchingProfileId(matchingProfile.getId());

        if (profilePictureName != null && !profilePictureName.isEmpty()) {
            //checking if given profile picture name (that is to be set as a new profile picture) exists in the list of pictures
            pictures.stream().filter(picture -> Objects.equals(picture.getOriginalFilename(), profilePictureName)).findFirst()
                    .orElseThrow(() -> new IllegalArgumentException(String.format(AlertConstants.RESOURCE_NOT_FOUND, "Matching profile picture", "name", profilePictureName)));

            //find current profile picture and set it to false if exists
            Optional<MatchingProfilePicture> currentProfilePicture = matchingProfilePictureRepository.findByMatchingProfileUserLoginAndIsCurrentProfilePictureTrue(login);
            if (currentProfilePicture.isPresent()) {
                MatchingProfilePicture current = currentProfilePicture.get();
                current.setIsCurrentProfilePicture(false);
                matchingProfilePictureRepository.save(current);
            }
        } else {
            if (currentlyPictures == 0) {
                throw new NullPointerException(String.format(AlertConstants.VALUE_REQUIRED, "profilePictureName, when there is no profile picture"));
            }
        }


        if (currentlyPictures + pictures.size() > 5) {
            throw new IllegalArgumentException(String.format(AlertConstants.TOO_MANY_PICTURES, 5, currentlyPictures + pictures.size()));
        }

        List<MatchingProfilePicture> profilePictures = new ArrayList<>();
        for (MultipartFile picture : pictures) {
            boolean isCurrentProfilePicture = profilePictureName != null && !profilePictureName.isEmpty() && Objects.equals(picture.getOriginalFilename(), profilePictureName);
            Pair<String, String> pictureInfo = pictureUtils.uploadPictureToOCIAndGetAuthorizedUrlToAccessIt(picture, login, Modules.MATCHING_PROFILE);
            profilePictures.add(new MatchingProfilePicture(matchingProfile, pictureInfo.getFirst(), pictureInfo.getSecond(), isCurrentProfilePicture));
        }
        matchingProfilePictureRepository.saveAll(profilePictures);

        return matchingProfilePictureRepository.findByMatchingProfileUserLogin(login).stream()
                .map(picture -> new PictureDto(picture.getId(), picture.getOciUrl(), picture.getCreatedAt()))
                .toList();
    }

    @Override
    public Page<MatchingProfileDto> getAllMatchingProfiles(Pageable pageable) {
        return matchingProfileRepository.findAll(pageable).map(MatchingProfileDto::createFromMatchingProfile);
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
        MatchingProfile matchingProfile = matchingProfileRepository.findByUserLogin(login)
                .orElseThrow(() -> new IllegalArgumentException(String.format(AlertConstants.RESOURCE_NOT_FOUND, MATCHING_PROFILE, "login", login)));

        matchingProfile.getMatchingProfilePictures().forEach(picture -> deleteMatchingProfilePicture(picture.getId()));
        matchingProfileRepository.delete(matchingProfile);
    }

    @Override
    @Transactional
    public void deleteMatchingProfilePicturesForUser(List<String> profilePictureIds, String login) {
        if (profilePictureIds.isEmpty()) {
            throw new IllegalArgumentException(AlertConstants.VALUE_REQUIRED_TITLE);
        }

        profilePictureIds.forEach(pictureId -> {
            if (!matchingProfilePictureRepository.existsByIdAndMatchingProfileUserLogin(pictureId, login)) {
                throw new IllegalArgumentException(String.format(AlertConstants.RESOURCE_NOT_FOUND, "Matching profile picture", "id", pictureId));
            }
        });

        profilePictureIds.forEach(this::deleteMatchingProfilePicture);
    }

    private void deleteMatchingProfilePicture(String pictureId) {
        MatchingProfilePicture picture = matchingProfilePictureRepository.findById(pictureId).orElseThrow();
        pictureUtils.deletePictureFromOCI(picture.getOciName()); //delete from OCI
        matchingProfilePictureRepository.deleteById(pictureId); //delete from db
    }

    private MatchingProfile findMatchingProfileByLoginOrThrow(String login) {
        return matchingProfileRepository.findByUserLogin(login)
                .orElseThrow(() -> new IllegalArgumentException(String.format(AlertConstants.RESOURCE_NOT_FOUND, MATCHING_PROFILE, "login", login)));
    }

    private void validateIfMatchingProfileAlreadyExists(String login) {
        if (matchingProfileRepository.existsByUserLogin(login)) {
            throw new IllegalArgumentException(String.format(AlertConstants.ALREADY_EXISTS, MATCHING_PROFILE, login));
        }
    }
}
