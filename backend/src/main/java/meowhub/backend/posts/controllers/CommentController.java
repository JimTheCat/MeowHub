package meowhub.backend.posts.controllers;

import lombok.RequiredArgsConstructor;
import meowhub.backend.posts.dtos.CommentDto;
import meowhub.backend.posts.services.CommentService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;

    @GetMapping("/post/{postId}")
    public ResponseEntity<Page<CommentDto>> getCommentsForPost(@PathVariable("postId") String postId, @AuthenticationPrincipal UserDetails userDetails, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        Page<CommentDto> comments = commentService.getCommentsForPost(postId, userDetails.getUsername(), page, size);
        return ResponseEntity.ok(comments);
    }

    @GetMapping("/{commentId}")
    public ResponseEntity<Page<CommentDto>> getCommentsForComment(@PathVariable("commentId") String commentId,  @AuthenticationPrincipal UserDetails userDetails, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        Page<CommentDto> comments = commentService.getRepliesFor(commentId, userDetails.getUsername(), page, size);
        return ResponseEntity.ok(comments);
    }

    @PostMapping
    public ResponseEntity<CommentDto> createComment(@RequestParam String postId, @RequestParam String content, @AuthenticationPrincipal UserDetails userDetails) {
        CommentDto commentDto = commentService.createComment(userDetails.getUsername(), postId, content);
        return ResponseEntity.ok(commentDto);
    }

    @PostMapping("/{parentCommentId}")
    public ResponseEntity<CommentDto> createReply(@PathVariable("parentCommentId") String parentCommentId, @RequestParam String content, @AuthenticationPrincipal UserDetails userDetails) {
        CommentDto commentDto = commentService.createReply(userDetails.getUsername(), content, parentCommentId);
        return ResponseEntity.ok(commentDto);
    }

    @PostMapping("/update/{commentId}")
    public ResponseEntity<CommentDto> updateComment(@PathVariable("commentId") String commentId, @RequestParam String content, @AuthenticationPrincipal UserDetails userDetails) {
        CommentDto commentDto = commentService.updateComment(userDetails.getUsername(), commentId, content);
        return ResponseEntity.ok(commentDto);
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable String commentId, @AuthenticationPrincipal UserDetails userDetails) {
        commentService.deleteComment(userDetails.getUsername(), commentId);
        return ResponseEntity.ok().build();
    }
}
