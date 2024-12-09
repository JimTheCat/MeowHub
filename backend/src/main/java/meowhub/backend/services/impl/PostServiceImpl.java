package meowhub.backend.services.impl;

import lombok.RequiredArgsConstructor;
import meowhub.backend.dtos.PostDto;
import meowhub.backend.jpa_buddy.Post;
import meowhub.backend.jpa_buddy.User;
import meowhub.backend.repositories.PostRepository;
import meowhub.backend.repositories.UserRepository;
import meowhub.backend.services.PostService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    @Override
    public List<PostDto> getPostsForUser(String login) {
        if (login == null) {
            throw new UsernameNotFoundException("Empty login");
        }

        User user = userRepository.findByLogin(login).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        List<Post> posts = postRepository.findAllByUser(user);

        return posts.stream().map(this::convertToPostDto).toList();
    }

    @Override
    public PostDto createPost(String content, String login) {
        Post post = new Post();
        User postOwner = userRepository.findByLogin(login).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        post.setContentHtml(content);
        post.setUser(postOwner);

        return convertToPostDto(postRepository.save(post));
    }

    private PostDto convertToPostDto(Post post) {
        return PostDto.builder()
                .content(post.getContentHtml())
                .ownerLogin(post.getUser().getLogin())
                .createdAt(post.getCreatedAt())
                .build();
    }
}
