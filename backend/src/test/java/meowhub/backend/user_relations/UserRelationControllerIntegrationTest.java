package meowhub.backend.user_relations;

import meowhub.backend.shared.constants.AlertConstants;
import meowhub.backend.shared.exceptions.RelationException;
import meowhub.backend.user_relations.services.UserRelationQueryService;
import meowhub.backend.user_relations.services.UserRelationService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class UserRelationControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserRelationService userRelationService;

    @MockBean
    private UserRelationQueryService userRelationQueryService;

    @Test
    @WithMockUser
    void testUsernameNotFoundException() throws Exception {
        String login = "nonexistentUser";

        Mockito.doThrow(new UsernameNotFoundException(String.format(AlertConstants.USER_WITH_LOGIN_NOT_FOUND, login)))
                .when(userRelationService).sendFriendRequestTo(Mockito.eq(login), Mockito.anyString());

        mockMvc.perform(post("/api/relations/{login}/send", login).with(csrf()))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.title").value(AlertConstants.USER_WITH_LOGIN_NOT_FOUND_TITLE))
                .andExpect(jsonPath("$.message").value(String.format(AlertConstants.USER_WITH_LOGIN_NOT_FOUND, login)))
                .andExpect(jsonPath("$.level").value("ERROR"));
    }

    @Test
    @WithMockUser
    void testRelationNotAllowedException() throws Exception {
        String login = "restrictedUser";

        Mockito.doThrow(new RelationException(AlertConstants.RELATION_ALREADY_EXISTS))
                .when(userRelationService).sendFriendRequestTo(Mockito.eq(login), Mockito.anyString());

        mockMvc.perform(post("/api/relations/{login}/send", login).with(csrf()))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.title").value(AlertConstants.RELATION_ALREADY_EXISTS_TITLE))
                .andExpect(jsonPath("$.message").value(AlertConstants.RELATION_ALREADY_EXISTS))
                .andExpect(jsonPath("$.level").value("ERROR"));
    }

    @Test
    @WithMockUser
    void testGetFriendsForUser_ShouldReturnEmptyList() throws Exception {
        String login = "validUser";

        when(userRelationQueryService.getFriendsForUser(Mockito.eq(login), Mockito.anyString(), Mockito.anyInt(), Mockito.anyInt()))
                .thenReturn(Page.empty());

        mockMvc.perform(get("/api/relations/{login}/friends", login).param("page", "0").param("size", "10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").isEmpty());
    }

    @Test
    @WithMockUser
    void testDeleteFriend_ShouldReturnOk() throws Exception {
        String login = "friendToDelete";

        Mockito.doNothing().when(userRelationService).deleteFriend(Mockito.eq(login), Mockito.anyString());

        mockMvc.perform(delete("/api/relations/{login}/delete-friend", login).with(csrf()))
                .andExpect(status().isOk());
    }
}

