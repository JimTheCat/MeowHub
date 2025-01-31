package meowhub.backend.matching.services.impl;

import lombok.RequiredArgsConstructor;
import meowhub.backend.matching.dtos.MatchingProfileDto;
import meowhub.backend.matching.dtos.MatchingProfilePreferencesDto;
import meowhub.backend.matching.models.MatchingProfile;
import meowhub.backend.matching.repositories.MatchingProfileRepository;
import meowhub.backend.matching.services.MatchingProfileQueryService;
import meowhub.backend.shared.constants.AlertConstants;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

import static meowhub.backend.shared.constants.Modules.MATCHING_PROFILE;

@Service
@RequiredArgsConstructor
public class MatchingProfileQueryServiceImpl implements MatchingProfileQueryService {
    private final MatchingProfileRepository matchingProfileRepository;

    @Override
    public Page<MatchingProfileDto> getAllMatchingProfiles(Pageable pageable) {
        return matchingProfileRepository.findAll(pageable).map(MatchingProfileDto::createFromMatchingProfile);
    }

    @Override
    public MatchingProfileDto getMyProfile(String login) {
        if (findMatchingProfileByLogin(login).isEmpty()) {
            return null;
        }
        return matchingProfileRepository.findByUserLogin(login).map(MatchingProfileDto::createFromMatchingProfile).orElseThrow();
    }

    @Override
    public MatchingProfile findMatchingProfileByLoginOrThrow(String login) {
        return matchingProfileRepository.findByUserLogin(login)
                .orElseThrow(() -> new IllegalArgumentException(String.format(AlertConstants.RESOURCE_NOT_FOUND, MATCHING_PROFILE, "login", login)));
    }

    @Override
    public Optional<MatchingProfile> findMatchingProfileByLogin(String login) {
        return matchingProfileRepository.findByUserLogin(login);
    }

    @Override
    public MatchingProfilePreferencesDto getPreferences(String login) {
        return matchingProfileRepository.findByUserLogin(login)
                .map(MatchingProfilePreferencesDto::createFromMatchingProfilePreferencesFromMatchingProfile)
                .orElseThrow();
    }
}
