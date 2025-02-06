package meowhub.backend;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import meowhub.backend.chats.constants.OnlineStatus;
import meowhub.backend.users.repositories.UserRepository;
import meowhub.backend.users.services.UserDictionaryQueryService;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class StartupResetService {
    private final UserRepository userRepository;
    private final UserDictionaryQueryService userDictionaryQueryService;

    @Bean
    @Profile("!test")
    public ApplicationRunner resetUserStatuses() {
        log.info("Resetting all users statuses to OFFLINE");
        return args -> {
            // resets all users statuses to OFFLINE - this is needed to prevent users from being stuck in ONLINE status when the server is forcefully shut down or restarted
            userRepository.updateAllUsersStatus(userDictionaryQueryService.getOnlineStatusDictionaryByEnumOrThrow(OnlineStatus.OFFLINE));
        };
    }
}
