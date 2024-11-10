package meowhub.backend.services;

import meowhub.backend.dtos.PostDto;

import java.util.List;

public interface PostService {
    List<PostDto> getPostsForUser(String login);

    PostDto createPost(String content, String login);
}
