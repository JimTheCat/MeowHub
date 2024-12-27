package meowhub.backend.users.services;


public interface UserValidationService {
    boolean existsByEmail(String email);

    boolean existsByLogin(String login);

    void validateIfUserExists(String login);
}
