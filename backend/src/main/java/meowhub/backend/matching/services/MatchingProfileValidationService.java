package meowhub.backend.matching.services;

public interface MatchingProfileValidationService {
    void validateIfMatchingProfileAlreadyExists(String login);
}