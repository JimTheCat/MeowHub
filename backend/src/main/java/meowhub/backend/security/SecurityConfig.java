package meowhub.backend.security;

import meowhub.backend.models.ApplicationRole;
import meowhub.backend.models.Role;
import meowhub.backend.models.User;
import meowhub.backend.repositories.RoleRepository;
import meowhub.backend.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

import java.time.LocalDate;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(requests -> requests
                .anyRequest()
                .authenticated());
        http.csrf(AbstractHttpConfigurer::disable);
        http.httpBasic(Customizer.withDefaults());
        return http.build();
    }

    @Bean
    public CommandLineRunner initData(RoleRepository roleRepository, UserRepository userRepository) {
        return args -> {
            Role userRole = roleRepository.findByRoleName(ApplicationRole.ROLE_USER)
                    .orElseGet(() -> roleRepository.save(new Role(ApplicationRole.ROLE_USER)));
            Role adminRole = roleRepository.findByRoleName(ApplicationRole.ROLE_ADMIN)
                    .orElseGet(() -> roleRepository.save(new Role(ApplicationRole.ROLE_ADMIN)));

            if (!userRepository.existsByLogin("user1")) {
                User user1 = new User("user1", "user1@example.com", "{noop}password1");
                user1.setName("Jan");
                user1.setSurname("Kos");
                user1.setAccountNonLocked(false);
                user1.setAccountNonExpired(true);
                user1.setCredentialsNonExpired(true);
                user1.setEnabled(true);
                user1.setCredentialsExpiryDate(LocalDate.now().plusYears(1));
                user1.setAccountExpiryDate(LocalDate.now().plusYears(1));
                user1.setSignUpMethod("email");
                user1.setRole(userRole);
                userRepository.save(user1);
            }

            if (!userRepository.existsByLogin("admin")) {
                User admin = new User("admin", "admin@example.com", "{noop}adminPass");
                admin.setName("Olgierd");
                admin.setSurname("Jarosz");
                admin.setAccountNonLocked(true);
                admin.setAccountNonExpired(true);
                admin.setCredentialsNonExpired(true);
                admin.setEnabled(true);
                admin.setCredentialsExpiryDate(LocalDate.now().plusYears(1));
                admin.setAccountExpiryDate(LocalDate.now().plusYears(1));
                admin.setSignUpMethod("email");
                admin.setRole(adminRole);
                userRepository.save(admin);
            }

        };
    }
}
