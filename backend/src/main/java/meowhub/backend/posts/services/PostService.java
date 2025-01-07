package meowhub.backend.posts.services;

import meowhub.backend.posts.dtos.PostDto;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface PostService {
    Page<PostDto> getPosts(String requestedBy, int pageNo, int pageSize);

    Page<PostDto> getPostsForUser(String login, String requestedBy, int pageNo, int pageSize);

    PostDto createPost(String login, String content, List<MultipartFile> pictures);

    PostDto updatePost(String login, String postId, String content);

    void deletePost(String login, String postId);
}
