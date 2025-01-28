package meowhub.backend.matching.services;


import meowhub.backend.matching.dtos.MatchingProfileDto;
import meowhub.backend.matching.models.MatchingProfile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface MatchingProfileQueryService {
    Page<MatchingProfileDto> getAllMatchingProfiles(Pageable pageable);

    MatchingProfileDto getMyProfile(String login);

    MatchingProfile findMatchingProfileByLoginOrThrow(String login);

    Optional<MatchingProfile> findMatchingProfileByLogin(String login);
}
