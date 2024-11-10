package meowhub.backend.services.impl;

import meowhub.backend.dtos.PostDto;
import meowhub.backend.models.Post;
import meowhub.backend.repositories.PostRepository;
import meowhub.backend.services.PostService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostServiceImpl implements PostService {
    private final PostRepository postRepository;

    public PostServiceImpl(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @Override
    public List<PostDto> getPostsForUser(String login) {
        if(login == null) {
            throw new UsernameNotFoundException("Empty login");
        }

        List<Post> posts = postRepository.findByOwnerLogin(login);

        return posts.stream().map(this::convertToPostDto).toList();
    }

    @Override
    public PostDto createPost(String content, String login) {
        Post post = new Post();
        post.setContentHtml(content);
        post.setOwnerLogin(login);

        return convertToPostDto(postRepository.save(post));
    }

    private PostDto convertToPostDto(Post post){
        return PostDto.builder()
                .content(post.getContentHtml())
                .ownerLogin(post.getOwnerLogin())
                .createdAt(post.getCreatedAt())
                .build();
    }
}
