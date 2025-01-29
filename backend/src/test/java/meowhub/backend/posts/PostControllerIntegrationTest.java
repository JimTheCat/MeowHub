package meowhub.backend.posts;

import meowhub.backend.posts.services.PostService;
import meowhub.backend.shared.constants.AlertConstants;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.webjars.NotFoundException;

import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class PostControllerIntegrationTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PostService postService;

    @Test
    @WithMockUser
    void testUsernameNotFoundException() throws Exception {
        String login = "nonexistentUser";

        when(postService.getPostsForUser(Mockito.eq(login), Mockito.anyString(), Mockito.anyInt(), Mockito.anyInt()))
                .thenThrow(new UsernameNotFoundException(String.format(AlertConstants.USER_WITH_LOGIN_NOT_FOUND, login)));

        mockMvc.perform(get("/api/posts/user/{login}", login))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.title").value(AlertConstants.USER_WITH_LOGIN_NOT_FOUND_TITLE))
                .andExpect(jsonPath("$.message").value(String.format(AlertConstants.USER_WITH_LOGIN_NOT_FOUND, login)))
                .andExpect(jsonPath("$.level").value("ERROR"));
    }

    @Test
    @WithMockUser
    void testNotFoundException() throws Exception {
        String postId = "invalidPostId";

        Mockito.doThrow(new NotFoundException(String.format(AlertConstants.RESOURCE_NOT_FOUND, "Post", "id", postId)))
                .when(postService).deletePost(Mockito.anyString(), Mockito.eq(postId));

        mockMvc.perform(delete("/api/posts/{postId}", postId).with(csrf()))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.title").value(AlertConstants.RESOURCE_NOT_FOUND_TITLE))
                .andExpect(jsonPath("$.message").value(String.format(AlertConstants.RESOURCE_NOT_FOUND, "Post", "id", postId)))
                .andExpect(jsonPath("$.level").value("ERROR"));
    }
}
