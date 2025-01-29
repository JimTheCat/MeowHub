package meowhub.backend.matching.services;

import meowhub.backend.shared.dtos.PictureDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface MatchingProfilePictureService {
    PictureDto addMatchingProfilePicture(MultipartFile file, Long index, String login);

    List<PictureDto> setIndexes(Map<String, Long> pictureIndexes, String login);

    void deleteMatchingProfilePictureForUser(String pictureId, String login);

    void intDeleteMatchingProfilePicture(String pictureId);

    /***
     * Adds pictures to the matching profile.
     * Since currently frontend does not support adding multiple pictures in single request to the profile, this method is deprecated.
     * @param files, max 5 pictures
     * @param profilePictureName - name of the picture in files list, that is to be set as new profile picture
     * @param login
     * @return
     * @deprecated
     */
    @Deprecated
    List<PictureDto> addMatchingProfilePictures(List<MultipartFile> files, String profilePictureName, String login);

    /**
     * Since currently frontend does not support deleting multiple pictures in single request, this method is deprecated.
     * @deprecated
     */
    @Deprecated
    void deleteMatchingProfilePicturesForUser(List<String> profilePictureIds, String login);
}
