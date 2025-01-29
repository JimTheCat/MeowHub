package meowhub.backend.matching.services.impl;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import meowhub.backend.matching.models.MatchingProfile;
import meowhub.backend.matching.models.MatchingProfilePicture;
import meowhub.backend.matching.repositories.MatchingProfilePictureRepository;
import meowhub.backend.matching.services.MatchingProfilePictureService;
import meowhub.backend.matching.services.MatchingProfileQueryService;
import meowhub.backend.shared.constants.AlertConstants;
import meowhub.backend.shared.constants.Modules;
import meowhub.backend.shared.dtos.PictureDto;
import meowhub.backend.shared.utils.PictureUtils;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class MatchingProfilePictureServiceImpl implements MatchingProfilePictureService {
    private static final String MATCHING_PROFILE_PICTURE = "Matching profile picture";

    private final MatchingProfilePictureRepository matchingProfilePictureRepository;
    private final MatchingProfileQueryService matchingProfileQueryService;
    private final PictureUtils pictureUtils;

    @Override
    @Transactional
    public PictureDto addMatchingProfilePicture(MultipartFile file, Long index, String login) {
        MatchingProfile matchingProfile = matchingProfileQueryService.findMatchingProfileByLoginOrThrow(login);
        boolean isCurrentProfilePicture = index == 0;

        //find current profile picture and set it to false if exists or if it does not and added picture is not a current profile picture - throw exception
        int currentlyPictures = matchingProfilePictureRepository.countAllByMatchingProfileId(matchingProfile.getId());
        Optional<MatchingProfilePicture> currentProfilePicture = matchingProfilePictureRepository.findByMatchingProfileUserLoginAndIsCurrentProfilePictureTrue(login);
        if (currentProfilePicture.isPresent()) {
            MatchingProfilePicture current = currentProfilePicture.get();
            current.setIsCurrentProfilePicture(false);
            matchingProfilePictureRepository.save(current);

        } else {
            if (!isCurrentProfilePicture && currentlyPictures == 0) {
                throw new NullPointerException(String.format(AlertConstants.VALUE_REQUIRED, "profilePictureName, when there is no profile picture"));
            }
        }

        //we allow to have max 5 profile pictures
        if (currentlyPictures >= 5) {
            throw new IllegalArgumentException(String.format(AlertConstants.TOO_MANY_PICTURES, 5, currentlyPictures + 1));
        }

        //upload picture to OCI and save it to db
        Pair<String, String> pictureInfo = pictureUtils.uploadPictureToOCIAndGetAuthorizedUrlToAccessIt(file, login, Modules.MATCHING_PROFILE);
        MatchingProfilePicture matchingProfilePicture = new MatchingProfilePicture(matchingProfile, pictureInfo.getFirst(), pictureInfo.getSecond(), isCurrentProfilePicture, index);
        matchingProfilePicture.setCreatedAt(LocalDateTime.now());
        matchingProfilePicture = matchingProfilePictureRepository.save(matchingProfilePicture);

        return matchingProfilePictureRepository.findById(matchingProfilePicture.getId())
                .map(picture -> new PictureDto(picture.getId(), picture.getOciUrl(), picture.getIndex(), picture.getCreatedAt()))
                .orElseThrow();
    }

    @Override
    @Transactional
    public List<PictureDto> setIndexes(Map<String, Long> pictureIndexes, String login) {
        List<String> pictureIds = new ArrayList<>(pictureIndexes.keySet());
        pictureIds.forEach(pictureId -> validateIfExists(pictureId, login));

        pictureIds.forEach(pictureId -> {
            MatchingProfilePicture picture = matchingProfilePictureRepository.findById(pictureId).orElseThrow();
            picture.setIndex(pictureIndexes.get(pictureId));
            matchingProfilePictureRepository.save(picture);
        });

        return matchingProfilePictureRepository.findByMatchingProfileUserLogin(login).stream()
                .map(picture -> new PictureDto(picture.getId(), picture.getOciUrl(), picture.getIndex(), picture.getCreatedAt()))
                .toList();
    }

    @Override
    public void deleteMatchingProfilePictureForUser(String pictureId, String login) {
        validateIfExists(pictureId, login);
        intDeleteMatchingProfilePicture(pictureId);
    }

    @Override
    public void intDeleteMatchingProfilePicture(String pictureId) {
        MatchingProfilePicture picture = matchingProfilePictureRepository.findById(pictureId).orElseThrow();
        pictureUtils.deletePictureFromOCI(picture.getOciName()); //delete from OCI
        matchingProfilePictureRepository.deleteById(pictureId); //delete from db
    }

    @Override
    public List<PictureDto> addMatchingProfilePictures(List<MultipartFile> pictures, String profilePictureName, String login) {
        if (pictures == null || pictures.isEmpty() || pictures.getFirst().getContentType() == null) {
            throw new IllegalArgumentException(AlertConstants.VALUE_REQUIRED_TITLE);
        }

        MatchingProfile matchingProfile = matchingProfileQueryService.findMatchingProfileByLoginOrThrow(login);
        int currentlyPictures = matchingProfilePictureRepository.countAllByMatchingProfileId(matchingProfile.getId());

        if (profilePictureName != null && !profilePictureName.isEmpty()) {
            //checking if given profile picture name (that is to be set as a new profile picture) exists in the list of pictures
            pictures.stream().filter(picture -> Objects.equals(picture.getOriginalFilename(), profilePictureName)).findFirst()
                    .orElseThrow(() -> new IllegalArgumentException(String.format(AlertConstants.RESOURCE_NOT_FOUND, MATCHING_PROFILE_PICTURE, "name", profilePictureName)));

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
            profilePictures.add(new MatchingProfilePicture(matchingProfile, pictureInfo.getFirst(), pictureInfo.getSecond(), isCurrentProfilePicture, 0L));
        }
        matchingProfilePictureRepository.saveAll(profilePictures);

        return matchingProfilePictureRepository.findByMatchingProfileUserLogin(login).stream()
                .map(picture -> new PictureDto(picture.getId(), picture.getOciUrl(), picture.getCreatedAt()))
                .toList();
    }

    @Override
    public void deleteMatchingProfilePicturesForUser(List<String> profilePictureIds, String login) {
        if (profilePictureIds.isEmpty()) {
            throw new IllegalArgumentException(AlertConstants.VALUE_REQUIRED_TITLE);
        }

        //validate ids
        profilePictureIds.forEach(pictureId -> validateIfExists(pictureId, login));

        profilePictureIds.forEach(this::intDeleteMatchingProfilePicture);
    }

    private void validateIfExists(String pictureId, String login) {
        if (!matchingProfilePictureRepository.existsByIdAndMatchingProfileUserLogin(pictureId, login)) {
            throw new IllegalArgumentException(String.format(AlertConstants.RESOURCE_NOT_FOUND, MATCHING_PROFILE_PICTURE, "id", pictureId));
        }
    }
}
