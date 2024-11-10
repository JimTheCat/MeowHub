package meowhub.backend.controllers;

import meowhub.backend.dtos.PostDto;
import meowhub.backend.services.PostService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/posts")
public class PostController {
    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<PostDto>> getAllUsersPosts(@AuthenticationPrincipal UserDetails userDetails) {
        List<PostDto> posts = postService.getPostsForUser(userDetails.getUsername());
        return ResponseEntity.ok(posts);
    }

    @PostMapping("/create")
    public ResponseEntity<PostDto> createPost(@RequestParam String content, @AuthenticationPrincipal UserDetails userDetails) {
        PostDto postDto = postService.createPost(content, userDetails.getUsername());
        return ResponseEntity.ok(postDto);
    }
}
