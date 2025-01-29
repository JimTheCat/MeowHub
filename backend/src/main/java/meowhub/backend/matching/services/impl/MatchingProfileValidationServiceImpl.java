package meowhub.backend.matching.services.impl;

import lombok.RequiredArgsConstructor;
import meowhub.backend.matching.repositories.MatchingProfileRepository;
import meowhub.backend.matching.services.MatchingProfileValidationService;
import meowhub.backend.shared.constants.AlertConstants;
import org.springframework.stereotype.Service;

import static meowhub.backend.shared.constants.Modules.MATCHING_PROFILE;

@Service
@RequiredArgsConstructor
public class MatchingProfileValidationServiceImpl implements MatchingProfileValidationService {
    private final MatchingProfileRepository matchingProfileRepository;

    @Override
    public void validateIfMatchingProfileAlreadyExists(String login) {
        if (matchingProfileRepository.existsByUserLogin(login)) {
            throw new IllegalArgumentException(String.format(AlertConstants.ALREADY_EXISTS, MATCHING_PROFILE, login));
        }
    }
}
