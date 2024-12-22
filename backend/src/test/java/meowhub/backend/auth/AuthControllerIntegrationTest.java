package meowhub.backend.auth;

import meowhub.backend.security.requests.LoginRequest;
import meowhub.backend.security.services.impl.AuthServiceImpl;
import meowhub.backend.shared.constants.AlertConstants;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class AuthControllerIntegrationTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AuthServiceImpl authService;

    @Test
    void testBadCredentialsException() throws Exception {
        // Create a sample LoginRequest object
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setLogin("testUser");
        loginRequest.setPassword("invalidPassword");

        // Mock the service to throw BadCredentialsException
        Mockito.doThrow(new BadCredentialsException(AlertConstants.BAD_CREDENTIALS))
                .when(authService).authenticateUser(Mockito.any(LoginRequest.class));

        // Perform the POST request with JSON body
        mockMvc.perform(post("/api/auth/public/sign-in")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                    {
                                        "username": "testUser",
                                        "password": "invalidPassword"
                                    }
                                """)
                        .with(csrf()))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.title").value(AlertConstants.BAD_CREDENTIALS))
                .andExpect(jsonPath("$.message").value(AlertConstants.BAD_CREDENTIALS))
                .andExpect(jsonPath("$.level").value("ERROR"));
    }
}