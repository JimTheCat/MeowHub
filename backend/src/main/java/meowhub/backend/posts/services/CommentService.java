package meowhub.backend.posts.services;

import meowhub.backend.posts.dtos.CommentDto;
import org.springframework.data.domain.Page;

public interface CommentService {
    Page<CommentDto> getCommentsForPost(String postId, String requesterLogin, int page, int size);
    Page<CommentDto> getRepliesFor(String commentId, String requesterLogin, int page, int size);
    CommentDto createReply(String login, String content, String parentCommentId);
    CommentDto createComment(String login, String postId, String content);
    CommentDto updateComment(String login, String commentId, String content);
    void deleteComment(String login, String commentId);
}
