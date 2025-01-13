package meowhub.backend.posts;

import meowhub.backend.posts.dtos.CommentDto;
import meowhub.backend.posts.services.CommentService;
import meowhub.backend.shared.constants.AlertConstants;
import meowhub.backend.users.dtos.BasicUserInfoDto;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.webjars.NotFoundException;

import java.time.LocalDateTime;

import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class CommentControllerIntegrationTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CommentService commentService;

    @Test
    @WithMockUser
    void testGetCommentsForPost() throws Exception {
        String postId = "examplePostId";

        when(commentService.getCommentsForPost(Mockito.eq(postId), Mockito.anyString(), Mockito.anyInt(), Mockito.anyInt()))
                .thenThrow(new NotFoundException(String.format(AlertConstants.RESOURCE_NOT_FOUND, "Post", "id", postId)));

        mockMvc.perform(get("/api/comments/post/{postId}", postId))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.title").value(AlertConstants.RESOURCE_NOT_FOUND_TITLE))
                .andExpect(jsonPath("$.message").value(String.format(AlertConstants.RESOURCE_NOT_FOUND, "Post", "id", postId)))
                .andExpect(jsonPath("$.level").value("ERROR"));
    }

    @Test
    @WithMockUser
    void testCreateComment() throws Exception {
        String id = "1";
        String postId = "examplePostId";
        String content = "Sample comment content";
        String userLogin = "user123";
        BasicUserInfoDto basicUserInfoDto = new BasicUserInfoDto();
        basicUserInfoDto.setLogin(userLogin);

        when(commentService.createComment(Mockito.anyString(), Mockito.eq(postId), Mockito.eq(content)))
                .thenReturn(new CommentDto(id, postId, null, 123L, LocalDateTime.now(), null, content, basicUserInfoDto, Boolean.FALSE));

        mockMvc.perform(post("/api/comments")
                        .param("postId", postId)
                        .param("content", content)
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(id))
                .andExpect(jsonPath("$.postId").value(postId))
                .andExpect(jsonPath("$.content").value(content))
                .andExpect(jsonPath("$.author.login").value(userLogin));
    }

    @Test
    @WithMockUser
    void testDeleteCommentNotFound() throws Exception {
        String commentId = "nonexistentCommentId";

        Mockito.doThrow(new NotFoundException(String.format(AlertConstants.RESOURCE_NOT_FOUND, "Comment", "id", commentId)))
                .when(commentService).deleteComment(Mockito.anyString(), Mockito.eq(commentId));

        mockMvc.perform(delete("/api/comments/{commentId}", commentId).with(csrf()))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.title").value(AlertConstants.RESOURCE_NOT_FOUND_TITLE))
                .andExpect(jsonPath("$.message").value(String.format(AlertConstants.RESOURCE_NOT_FOUND, "Comment", "id", commentId)))
                .andExpect(jsonPath("$.level").value("ERROR"));
    }
}
