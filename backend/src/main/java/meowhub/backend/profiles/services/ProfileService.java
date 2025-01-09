package meowhub.backend.profiles.services;

import meowhub.backend.profiles.dtos.ProfileDto;
import meowhub.backend.security.requests.SignUpRequest;
import org.springframework.web.multipart.MultipartFile;

public interface ProfileService {
    void createProfile(SignUpRequest signUpRequest);
    ProfileDto updateProfile(String content, String login);
    ProfileDto getProfile(String login, String requesterLogin);
    ProfileDto addProfilePicture(MultipartFile file, String login);
}
