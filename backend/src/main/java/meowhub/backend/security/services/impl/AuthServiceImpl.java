package meowhub.backend.security.services.impl;

import lombok.RequiredArgsConstructor;
import meowhub.backend.constants.PrivacySettings;
import meowhub.backend.constants.Roles;
import meowhub.backend.jpa_buddy.Gender;
import meowhub.backend.jpa_buddy.PrivacySetting;
import meowhub.backend.jpa_buddy.Role;
import meowhub.backend.jpa_buddy.User;
import meowhub.backend.repositories.GenderRepository;
import meowhub.backend.repositories.PrivacySettingRepository;
import meowhub.backend.repositories.RoleRepository;
import meowhub.backend.repositories.UserRepository;
import meowhub.backend.security.jwt.JwtUtils;
import meowhub.backend.security.requests.LoginRequest;
import meowhub.backend.security.requests.SignUpRequest;
import meowhub.backend.security.responses.LoginResponse;
import meowhub.backend.security.services.AuthService;
import org.hibernate.NonUniqueObjectException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PrivacySettingRepository privacySettingRepository;
    private final GenderRepository genderRepository;
    private final PasswordEncoder passwordEncoder;

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

        Role userRole = roleRepository.findByCode(Roles.ROLE_USER.name())
                .orElseGet(() -> roleRepository.save(new Role(Roles.ROLE_USER)));

        Gender gender = genderRepository.findByCode(request.getGender().name())
                .orElseThrow(IllegalArgumentException::new);

        PrivacySetting publicSettings = privacySettingRepository.findByCode(PrivacySettings.PUBLIC.name())
                .orElseGet(() -> privacySettingRepository.save(new PrivacySetting(PrivacySettings.PUBLIC)));

        User user = User.builder()
                .email(request.getEmail())
                .name(request.getName())
                .surname(request.getSurname())
                .login(request.getLogin())
                .birthdate(request.getBirthdate())
                .gender(gender)
                .profilePrivacy(publicSettings)
                .postsPrivacy(publicSettings)
                .friendsPrivacy(publicSettings)
                .birthdate(request.getBirthdate())
                .salt("salt")
                .password(passwordEncoder.encode(request.getPassword()))
                .role(userRole)
                .build();

        userRepository.save(user);
    }

    private void validateSignUpRequest(SignUpRequest request) {
        boolean isLoginNotUnique = userRepository.existsByLogin(request.getLogin());
        if (isLoginNotUnique) {
            throw new NonUniqueObjectException("The login is already in use.", "login");
        }

        boolean isEmailNotUnique = userRepository.existsByEmail(request.getEmail());
        if (isEmailNotUnique) {
            throw new NonUniqueObjectException("The email is already in use.", "email");
        }
    }


}
