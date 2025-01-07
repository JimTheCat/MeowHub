package meowhub.backend.users;

import meowhub.backend.InitDataTestConfig;
import meowhub.backend.users.dtos.BasicUserInfoDto;
import meowhub.backend.users.models.User;
import meowhub.backend.users.repositories.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

@DataJpaTest
@ActiveProfiles("test")
@Import(InitDataTestConfig.class)
class UserRepositoryIntegrationTest {
    @Autowired
    private UserRepository userRepository;

    @Test
    void testFindUserByLogin(){
        Optional<User> result = userRepository.findByLogin("admin");
        assertTrue(result.isPresent());
        assertEquals("admin", result.get().getLogin());
    }

    @Test
    void testFindBasicUserInfoByLogin() {
        Optional<BasicUserInfoDto> result = userRepository.findBasicUserInfoByLogin("admin");
        assertTrue(result.isPresent());

        assertEquals("admin", result.get().getLogin());
        assertNotNull(result.get().getId());
        assertNotNull(result.get().getName());
        assertNotNull(result.get().getSurname());
//        assertNotNull(result.get().getProfilePicture());
    }
}