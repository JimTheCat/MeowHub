package meowhub.backend.security;

import meowhub.backend.constants.Genders;
import meowhub.backend.constants.PrivacySettings;
import meowhub.backend.constants.Roles;
import meowhub.backend.users.models.Gender;
import meowhub.backend.users.models.PrivacySetting;
import meowhub.backend.users.models.Role;
import meowhub.backend.users.models.User;
import meowhub.backend.users.repositories.PrivacySettingRepository;
import meowhub.backend.users.repositories.GenderRepository;
import meowhub.backend.users.repositories.RoleRepository;
import meowhub.backend.users.repositories.UserRepository;
import meowhub.backend.security.jwt.AuthEntryPointJwt;
import meowhub.backend.security.jwt.AuthTokenFilter;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http, AuthEntryPointJwt unauthorizedHandler, AuthTokenFilter authenticationJwtTokenFilter) throws Exception {
        http.csrf(csrf -> csrf.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                .ignoringRequestMatchers("/api/auth/public/**")
        );

        http.authorizeHttpRequests(requests -> requests
                .requestMatchers("/api/csrf-token/**").permitAll()
                .requestMatchers("/api/auth/public/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .requestMatchers(
                        "/v3/api-docs/**",
                        "/swagger-ui/**",
                        "/swagger-ui.html"
                ).permitAll()
                .anyRequest().authenticated()
        );

        http.addFilterBefore(authenticationJwtTokenFilter, UsernamePasswordAuthenticationFilter.class);
        http.exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler));

        http.httpBasic(Customizer.withDefaults());
        return http.build();
    }

    @Bean
    public CommandLineRunner initData(RoleRepository roleRepository, UserRepository userRepository, PasswordEncoder passwordEncoder, PrivacySettingRepository privacySettingRepository, GenderRepository genderRepository) {
        return args -> {
            Role userRole = roleRepository.findByCode(Roles.ROLE_USER.name())
                    .orElseGet(() -> roleRepository.save(new Role(Roles.ROLE_USER)));
            Role adminRole = roleRepository.findByCode(Roles.ROLE_ADMIN.name())
                    .orElseGet(() -> roleRepository.save(new Role(Roles.ROLE_ADMIN)));

            PrivacySetting publicSetting = privacySettingRepository.findByCode(PrivacySettings.PUBLIC.name())
                    .orElseGet(() -> privacySettingRepository.save(new PrivacySetting(PrivacySettings.PUBLIC)));

            PrivacySetting privateSetting = privacySettingRepository.findByCode(PrivacySettings.PRIVATE.name())
                    .orElseGet(() -> privacySettingRepository.save(new PrivacySetting(PrivacySettings.PRIVATE)));

            PrivacySetting friendsOnlySetting = privacySettingRepository.findByCode(PrivacySettings.FRIENDS_ONLY.name())
                    .orElseGet(() -> privacySettingRepository.save(new PrivacySetting(PrivacySettings.FRIENDS_ONLY)));

            Gender female = genderRepository.findByCode(Genders.FEMALE.name())
                    .orElseGet(() -> genderRepository.save(new Gender(Genders.FEMALE)));

            Gender male = genderRepository.findByCode(Genders.MALE.name())
                    .orElseGet(() -> genderRepository.save(new Gender(Genders.MALE)));

            Gender other = genderRepository.findByCode(Genders.OTHER.name())
                    .orElseGet(() -> genderRepository.save(new Gender(Genders.OTHER)));

            if (!userRepository.existsByLogin("user1")) {
                User user1 = new User();
                user1.setLogin("user1");
                user1.setPassword(passwordEncoder.encode("password1"));
                user1.setEmail("user1@example.com");
                user1.setName("Jan");
                user1.setSurname("Kos");
                user1.setAccountNonLocked(false);
                user1.setBirthdate(LocalDate.of(1990, 1, 1));
                user1.setCredentialsNonExpired(true);
                user1.setCredentialsExpiryDate(LocalDateTime.now().plusYears(1));
                user1.setRole(userRole);
                user1.setPostsPrivacy(publicSetting);
                user1.setFriendsPrivacy(publicSetting);
                user1.setProfilePrivacy(publicSetting);
                user1.setGender(male);
                userRepository.save(user1);
            }

            if (!userRepository.existsByLogin("admin")) {
                User admin = new User();
                admin.setLogin("admin");
                admin.setPassword(passwordEncoder.encode("adminPass"));
                admin.setEmail("admin@example.com");
                admin.setName("Gustaw");
                admin.setSurname("Jeleń");
                admin.setAccountNonLocked(false);
                admin.setBirthdate(LocalDate.of(1980, 1, 1));
                admin.setCredentialsNonExpired(true);
                admin.setCredentialsExpiryDate(LocalDateTime.now().plusYears(1));
                admin.setRole(adminRole);
                admin.setPostsPrivacy(publicSetting);
                admin.setFriendsPrivacy(publicSetting);
                admin.setProfilePrivacy(publicSetting);
                admin.setGender(male);
                userRepository.save(admin);
            }

        };
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }
}
