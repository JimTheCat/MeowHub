package meowhub.backend.security.services.impl;

import lombok.RequiredArgsConstructor;
import meowhub.backend.constants.Roles;
import meowhub.backend.profiles.services.facades.ProfileAuthServiceFacade;
import meowhub.backend.shared.constants.AlertConstants;
import meowhub.backend.shared.exceptions.NotUniqueObjectException;
import meowhub.backend.users.facades.UserAuthServiceFacade;
import meowhub.backend.security.jwt.JwtUtils;
import meowhub.backend.security.requests.LoginRequest;
import meowhub.backend.security.requests.SignUpRequest;
import meowhub.backend.security.responses.LoginResponse;
import meowhub.backend.security.services.AuthService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;
    private final UserAuthServiceFacade userAuthServiceFacade;
    private final ProfileAuthServiceFacade profileAuthServiceFacade;

    @Override
    public LoginResponse authenticateUser(LoginRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getLogin(), request.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String jwtToken = jwtUtils.generateTokenFromUsername(userDetails);

            List<String> roles = userDetails.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .toList();

            return new LoginResponse(jwtToken, userDetails.getUsername(), roles);
        } catch (AuthenticationException e) {
            throw new BadCredentialsException("");
        }
    }

    @Override
    public void signUpUser(SignUpRequest request) {
        validateSignUpRequest(request);
        userAuthServiceFacade.createUser(request.getLogin(), request.getName(), request.getSurname(), request.getEmail(), request.getPassword(), request.getBirthdate(), Roles.ROLE_USER, request.getGender());
        profileAuthServiceFacade.createProfile(request);
    }

    private void validateSignUpRequest(SignUpRequest request) {
        boolean isLoginNotUnique = userAuthServiceFacade.existsByLogin(request.getLogin());
        if (isLoginNotUnique) {
            throw new NotUniqueObjectException(String.format(AlertConstants.NOT_UNIQUE_OBJECT, "login", request.getLogin()));
        }

        boolean isEmailNotUnique = userAuthServiceFacade.existsByEmail(request.getEmail());
        if (isEmailNotUnique) {
            throw new NotUniqueObjectException(String.format(AlertConstants.NOT_UNIQUE_OBJECT, "email", request.getEmail()));
        }
    }
}
