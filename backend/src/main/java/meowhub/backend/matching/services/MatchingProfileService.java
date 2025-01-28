package meowhub.backend.matching.services;

import meowhub.backend.matching.dtos.CreateMatchingProfileRequestDto;
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

    MatchingProfileDto createMatchingProfileBasedOnAccount(String login);

    MatchingProfileDto createMatchingProfileFromScratch(CreateMatchingProfileRequestDto request, String login);

    MatchingProfileDto updateMatchingProfile(UpdateMatchingProfileRequestDto matchingProfileDto, String login);

    /***
     * Adds pictures to the matching profile.
     * @param files
     * @param profilePictureName - name of the picture in files list, that is to be set as new profile picture
     * @param login
     * @return
     */
    List<PictureDto> addMatchingProfilePictures(List<MultipartFile> files, String profilePictureName, String login);

    void deleteMatchingProfile(String login);

    void deleteMatchingProfilePicturesForUser(List<String> profilePictureIds, String login);
}
