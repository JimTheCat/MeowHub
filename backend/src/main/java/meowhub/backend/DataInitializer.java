package meowhub.backend;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import meowhub.backend.models.User;
import meowhub.backend.models.UserRole;
import meowhub.backend.repositories.UserRepository;
import meowhub.backend.repositories.UserRoleRepository;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
@RequiredArgsConstructor
public class DataInitializer implements ApplicationListener<ContextRefreshedEvent> {
    private final UserRepository userRepository;
    private final UserRoleRepository userRoleRepository;

    @Override
    @Transactional
    public void onApplicationEvent(ContextRefreshedEvent event) {
        initData();
    }

    @Override
    public boolean supportsAsyncExecution() {
        return ApplicationListener.super.supportsAsyncExecution();
    }

    private void initData(){
        if(userRepository.count() != 0) return;
        try {
            UserRole adminRole = UserRole.builder()
                    .name("ADMIN")
                    .build();

            UserRole userRole = UserRole.builder()
                    .name("USER")
                    .build();


            userRoleRepository.save(adminRole);
            userRoleRepository.save(userRole);

            User test = User.builder()
                    .name("Test")
                    .lastname("Test")
                    .login("test")
                    .userRole(userRole)
                    .email("test@pjwst.edu.pl")
                    .birthdate(LocalDate.of(2002, 8, 30))
                    .password("admin").build();

            User kintrae = User.builder()
                    .name("Kinga")
                    .lastname("Traczyk")
                    .login("KinTrae")
                    .userRole(adminRole)
                    .email("kintrae@gmail.com")
                    .birthdate(LocalDate.of(2002, 8, 31))
                    .password("admin").build();


            userRepository.save(test);
            userRepository.save(kintrae);

        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}
