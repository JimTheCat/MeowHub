package meowhub.backend.matching.services;

import meowhub.backend.matching.dtos.UpdateMatchingProfileRequestDto;
import meowhub.backend.matching.dtos.MatchingProfileDto;
import meowhub.backend.shared.dtos.PictureDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface MatchingProfileService {
    Page<MatchingProfileDto> getAllMatchingProfiles(Pageable pageable);

    MatchingProfileDto getMyProfile(String login);

    MatchingProfileDto createMatchingProfile(String login);

    MatchingProfileDto updateMatchingProfile(UpdateMatchingProfileRequestDto matchingProfileDto, String login);

    List<PictureDto> addMatchingProfilePictures(List<MultipartFile> files, String profilePictureName, String login);

    void deleteMatchingProfile(String login);

    void deleteMatchingProfilePicturesForUser(List<String> profilePictureIds, String login);
}
