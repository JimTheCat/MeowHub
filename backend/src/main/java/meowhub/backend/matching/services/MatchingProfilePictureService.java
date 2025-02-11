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
}
