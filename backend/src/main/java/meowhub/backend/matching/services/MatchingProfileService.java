package meowhub.backend.matching.services;

import meowhub.backend.matching.dtos.CreateMatchingProfileRequestDto;
import meowhub.backend.matching.dtos.MatchingProfilePreferencesDto;
import meowhub.backend.matching.dtos.UpdateMatchingProfileRequestDto;
import meowhub.backend.matching.dtos.MatchingProfileDto;

public interface MatchingProfileService {

    MatchingProfileDto createMatchingProfileBasedOnAccount(String login);

    MatchingProfileDto createMatchingProfileFromScratch(CreateMatchingProfileRequestDto request, String login);

    MatchingProfileDto updateMatchingProfile(UpdateMatchingProfileRequestDto matchingProfileDto, String login);

    void updateMatchingProfilePreferences(MatchingProfilePreferencesDto preferences, String login);

    void deleteMatchingProfile(String login);
}
