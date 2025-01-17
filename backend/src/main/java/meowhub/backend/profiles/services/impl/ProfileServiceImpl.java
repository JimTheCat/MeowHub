package meowhub.backend.profiles.services.impl;

import lombok.RequiredArgsConstructor;
import meowhub.backend.profiles.dtos.ProfileDto;
import meowhub.backend.profiles.models.Profile;
import meowhub.backend.profiles.models.ProfilePicture;
import meowhub.backend.profiles.repositories.ProfilePictureRepository;
import meowhub.backend.profiles.repositories.ProfileRepository;
import meowhub.backend.profiles.services.ProfileService;
import meowhub.backend.security.requests.SignUpRequest;
import meowhub.backend.shared.constants.AlertConstants;
import meowhub.backend.shared.utils.PictureUtils;
import meowhub.backend.users.facades.UserProfileServiceFacade;
import meowhub.backend.users.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService {
    private final UserProfileServiceFacade userProfileServiceFacade;
    private final ProfileRepository profileRepository;
    private final ProfilePictureRepository profilePictureRepository;
    private final PictureUtils pictureUtils;

    @Override
    public void createProfile(SignUpRequest signUpRequest) {
        User user = userProfileServiceFacade.findUserByLogin(signUpRequest.getLogin());

        Profile profile = new Profile();
        profile.setUser(user);
        profileRepository.save(profile);
    }

    @Override
    public ProfileDto updateProfile(String content, String login) {
        Profile profile = profileRepository.findByUserLogin(login)
                .orElseThrow(() -> new NullPointerException(AlertConstants.USER_WITH_LOGIN_NOT_FOUND + login));
        profile.setProfileDetailsHtml(content);
        profileRepository.save(profile);

        return profileRepository.getOwnProfile(login);
    }

    @Override
    public ProfileDto addProfilePicture(MultipartFile file, String login) {
        if(file == null || file.getContentType() == null || file.getContentType().isEmpty()){
            throw new NullPointerException(AlertConstants.VALUE_REQUIRED_TITLE);
        }
        Profile profile = profileRepository.findByUserLogin(login)
                .orElseThrow(() -> new NullPointerException(AlertConstants.USER_WITH_LOGIN_NOT_FOUND + login));

        //setting current profile picture to false if exists
        Optional<ProfilePicture> currentProfilePicture = profilePictureRepository.findProfilePictureByProfileIdAndIsCurrentProfilePicture(profile.getId(), Boolean.TRUE);
        if(currentProfilePicture.isPresent()){
            currentProfilePicture.get().setIsCurrentProfilePicture(Boolean.FALSE);
            profilePictureRepository.save(currentProfilePicture.get());
        }

        Pair<String, String> pictureDetails = pictureUtils.uploadPictureToOCIAndGetAuthorizedUrlToAccessIt(file, login);
        ProfilePicture profilePicture = new ProfilePicture();
        profilePicture.setProfile(profile);
        profilePicture.setOciName(pictureDetails.getFirst());
        profilePicture.setOciUrl(pictureDetails.getSecond());
        profilePicture.setIsCurrentProfilePicture(Boolean.TRUE);
        profilePictureRepository.save(profilePicture);

        return profileRepository.getOwnProfile(login);
    }

    @Override
    public ProfileDto getProfile(String login, String requesterLogin) {
        userProfileServiceFacade.validateIfUserExists(login);

        if(login.equals(requesterLogin)){
            return profileRepository.getOwnProfile(login);
        } else {
            return profileRepository.getProfileIfPublicOrFriends(login, requesterLogin);
        }
    }


    @Override
    public Page<String> getUserMedia(String login, String requesterLogin, int page, int size) {
        userProfileServiceFacade.validateIfUserExists(login);
        Pageable pageable = PageRequest.of(page, size);

        if(login.equals(requesterLogin)){
            return profilePictureRepository.getOwnMedia(login, pageable);
        } else {
            return profilePictureRepository.getAnotherUserMediaIfPublicOrFriends(login, requesterLogin, pageable);
        }
    }
}
