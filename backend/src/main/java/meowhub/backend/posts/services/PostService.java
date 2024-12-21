package meowhub.backend.posts.services;

import meowhub.backend.posts.dtos.PostDto;
import org.springframework.data.domain.Page;

public interface PostService {
    Page<PostDto> getPosts(String requestedBy, int pageNo, int pageSize);

    Page<PostDto> getPostsForUser(String login, String requestedBy, int pageNo, int pageSize);

    PostDto createPost(String login, String content);

    PostDto updatePost(String login, String postId, String content);

    void deletePost(String login, String postId);
}
