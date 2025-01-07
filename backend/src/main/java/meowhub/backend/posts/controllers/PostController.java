package meowhub.backend.posts.controllers;

import lombok.RequiredArgsConstructor;
import meowhub.backend.posts.dtos.PostDto;
import meowhub.backend.posts.services.PostService;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("api/posts")
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;


    @GetMapping()
    public ResponseEntity<Page<PostDto>> getPosts(@AuthenticationPrincipal UserDetails userDetails, @RequestParam(defaultValue = "0") int pageNo, @RequestParam(defaultValue = "10") int pageSize) {
        Page<PostDto> posts = postService.getPosts(userDetails.getUsername(), pageNo, pageSize);
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/{login}")
    public ResponseEntity<Page<PostDto>> getPostsForUser(@PathVariable("login") String login, @AuthenticationPrincipal UserDetails userDetails, @RequestParam(defaultValue = "0") int pageNo, @RequestParam(defaultValue = "10") int pageSize) {
        Page<PostDto> posts = postService.getPostsForUser(login, userDetails.getUsername(), pageNo, pageSize);
        return ResponseEntity.ok(posts);

    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<PostDto> createPost(@RequestPart("content") String content, @RequestPart(value = "pictures", required = false) List<MultipartFile> pictures, @AuthenticationPrincipal UserDetails userDetails) {
        PostDto postDto = postService.createPost(userDetails.getUsername(), content, pictures);
        return ResponseEntity.ok(postDto);
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<Void> deletePost(@PathVariable("postId") String postId, @AuthenticationPrincipal UserDetails userDetails) {
        postService.deletePost(userDetails.getUsername(), postId);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{postId}")
    public ResponseEntity<PostDto> updatePost(@PathVariable("postId") String postId, @RequestParam String content, @AuthenticationPrincipal UserDetails userDetails) {
        PostDto postDto = postService.updatePost(userDetails.getUsername(), postId, content);
        return ResponseEntity.ok(postDto);
    }
}
