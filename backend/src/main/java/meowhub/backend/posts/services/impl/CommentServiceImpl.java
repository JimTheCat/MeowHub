package meowhub.backend.posts.services.impl;

import lombok.RequiredArgsConstructor;
import meowhub.backend.posts.dtos.CommentDto;
import meowhub.backend.posts.models.Comment;
import meowhub.backend.posts.models.Post;
import meowhub.backend.posts.repositories.CommentRepository;
import meowhub.backend.posts.repositories.PostRepository;
import meowhub.backend.posts.services.CommentService;
import meowhub.backend.shared.constants.AlertConstants;
import meowhub.backend.users.facades.UserPostServiceFacade;
import meowhub.backend.users.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {
    private final PostRepository postRepository;
    private final CommentRepository commentRepository;
    private final UserPostServiceFacade userPostServiceFacade;

    @Override
    public Page<CommentDto> getCommentsForPost(String postId, String requesterLogin, int page, int size) {
        validateIfPostExistsByPostId(postId, requesterLogin);
        Pageable pageable = PageRequest.of(page, size);

        return commentRepository.findCommentsForPost(postId, pageable);
    }

    @Override
    public Page<CommentDto> getRepliesFor(String commentId, String requesterLogin, int page, int size) {
        validateIfCommentExists(commentId);
        validateIfPostExistsByCommentId(commentId, requesterLogin);
        Pageable pageable = PageRequest.of(page, size);

        return commentRepository.findCommentsForComments(commentId, pageable);
    }

    @Override
    public CommentDto createComment(String login, String postId, String content) {
        validateIfPostExistsByPostId(postId, login);
        validateContent(content);
        User user = userPostServiceFacade.findUserByLogin(login);

        Comment comment = new Comment();
        comment.setContent(content);
        comment.setAnsweredComment(null);
        comment.setIsDeleted(Boolean.FALSE);
        comment.setUser(user);
        comment.setPost(postRepository.findById(postId).orElseThrow());
        comment = commentRepository.save(comment);

        return commentRepository.findComment(comment.getId());
    }

    @Override
    public CommentDto createReply(String login, String content, String parentCommentId) {
        if(parentCommentId == null || !commentRepository.existsById(parentCommentId)) {
            throw new NotFoundException(String.format(AlertConstants.RESOURCE_NOT_FOUND, "Comment", "parentCommentId", parentCommentId));
        }
        validateContent(content);

        Comment parentComment = commentRepository.findByIdAndIsDeletedFalse(parentCommentId);

        if(parentComment == null) {
            throw new NotFoundException(String.format(AlertConstants.RESOURCE_NOT_FOUND, "Comment", "commentId", parentCommentId + " - it was deleted and cannot be answered"));
        }

        Post post = parentComment.getPost();
        User user = userPostServiceFacade.findUserByLogin(login);

        Comment comment = new Comment();
        comment.setContent(content);
        comment.setAnsweredComment(parentComment);
        comment.setIsDeleted(Boolean.FALSE);
        comment.setPost(post);
        comment.setUser(user);
        comment = commentRepository.save(comment);

        return commentRepository.findComment(comment.getId());
    }

    @Override
    public CommentDto updateComment(String login, String commentId, String content) {
        validateIfAuthor(login, commentId);
        isPostPublicOrUserHasAccess(commentId, login);
        validateContent(content);

        Comment comment = commentRepository.findByIdAndIsDeletedFalse(commentId);
        comment.setContent(content);
        comment = commentRepository.save(comment);

        return commentRepository.findComment(comment.getId());
    }

    @Override
    public void deleteComment(String login, String commentId) {
        validateIfAuthor(login, commentId);
        isPostPublicOrUserHasAccess(commentId, login);

        Comment comment = commentRepository.findByIdAndIsDeletedFalse(commentId);
        comment.setContent(null);
        comment.setIsDeleted(Boolean.TRUE);
        commentRepository.save(comment);
    }

    private void validateIfPostExistsByPostId(String postId, String login) {
        if(!postRepository.isPostPublicOrUserHasAccessToPost(postId, login)) {
            throw new NotFoundException(String.format(AlertConstants.RESOURCE_NOT_FOUND, "Post", "postId", postId));
        }
    }

    private void validateIfPostExistsByCommentId(String commentId, String login) {
        if(!postRepository.isPostPublicOrUserHasAccessToPostByCommentId(commentId, login)) {
            throw new NotFoundException(String.format(AlertConstants.RESOURCE_NOT_FOUND, "Post", commentId, commentId));
        }
    }

    private void validateIfCommentExists(String commentId) {
        if(!commentRepository.existsById(commentId)) {
            throw new NotFoundException(String.format(AlertConstants.RESOURCE_NOT_FOUND, "Comment", "commentId", commentId));
        }
    }

    private void validateIfAuthor(String login, String commentId) {
        if(!commentRepository.existsByIdAndUserLoginAndIsDeletedFalse(commentId, login)) {
            throw new NotFoundException(String.format(AlertConstants.RESOURCE_NOT_FOUND, "Comment", "commentId", login));
        }
    }

    private void isPostPublicOrUserHasAccess(String commentId, String requesterLogin) {
        if(!postRepository.isPostPublicOrUserHasAccessToPostByCommentId(commentId, requesterLogin)) {
            throw new NotFoundException(String.format(AlertConstants.RESOURCE_NOT_FOUND, "Post", "user login", requesterLogin));
        }
    }

    private void validateContent(String content) {
        if(content == null || content.isBlank()) {
            throw new IllegalArgumentException(String.format(AlertConstants.ILLEGAL_ARGUMENT, "content", "'" + content + "'"));
        }
    }
}