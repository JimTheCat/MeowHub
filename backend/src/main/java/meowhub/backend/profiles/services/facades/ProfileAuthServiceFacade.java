package meowhub.backend.profiles.services.facades;

import meowhub.backend.security.requests.SignUpRequest;

public interface ProfileAuthServiceFacade {
    void createProfile(SignUpRequest signUpRequest);
}
