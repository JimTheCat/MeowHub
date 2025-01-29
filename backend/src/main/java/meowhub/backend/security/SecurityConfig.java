package meowhub.backend.security;

import meowhub.backend.constants.Genders;
import meowhub.backend.constants.Roles;
import meowhub.backend.users.facades.UserAuthServiceFacade;
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

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http, AuthEntryPointJwt unauthorizedHandler, AuthTokenFilter authenticationJwtTokenFilter) throws Exception {
        http.csrf(csrf -> csrf.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                .ignoringRequestMatchers("/api/auth/public/**", "/api/ext/**")
        );

        http.authorizeHttpRequests(requests -> requests
                .requestMatchers("/api/csrf-token/**").permitAll()
                .requestMatchers("/api/auth/public/**").permitAll()
                .requestMatchers("/api/ext/**").permitAll()
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
    public CommandLineRunner initData(UserAuthServiceFacade userAuthServiceFacade) {
        return args -> {
            if (!userAuthServiceFacade.existsByLogin("user1")) {
                userAuthServiceFacade.createUser("user1", "Gustaw", "Jeleń", "user1@gmail.com", "userPass123!", LocalDate.of(1970, 10, 14), Roles.ROLE_USER, Genders.MALE);
            }

            if (!userAuthServiceFacade.existsByLogin("admin")) {
                userAuthServiceFacade.createUser("admin", "Jan", "Kos", "admin@gmail.com", "adminPass123!", LocalDate.of(1979, 12, 11), Roles.ROLE_ADMIN, Genders.MALE);

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
