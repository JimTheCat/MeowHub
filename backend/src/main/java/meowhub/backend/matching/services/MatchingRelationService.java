package meowhub.backend.matching.services;

import meowhub.backend.matching.dtos.BasicMatchingProfileInfoDto;
import org.springframework.data.domain.Page;

public interface MatchingRelationService {
    Page<BasicMatchingProfileInfoDto> getLikedUsers(String login, int page, int size);

    Page<BasicMatchingProfileInfoDto> getDislikedUsers(String login, int page, int size);

    Page<BasicMatchingProfileInfoDto> getMatchedUsers(String login, int page, int size);

    void likeUser(String matchingProfileId, String login);

    void dislikeUser(String matchingProfileId, String login);

    void deleteMatch(String matchingProfileId, String login);
}
