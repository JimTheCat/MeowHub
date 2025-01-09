package meowhub.backend.profiles.services.facades;

import lombok.RequiredArgsConstructor;
import meowhub.backend.profiles.services.ProfileService;
import meowhub.backend.security.requests.SignUpRequest;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProfileAuthServiceFacadeImpl implements ProfileAuthServiceFacade {
    private final ProfileService profileService;

    @Override
    public void createProfile(SignUpRequest signUpRequest) {
        profileService.createProfile(signUpRequest);
    }
}
