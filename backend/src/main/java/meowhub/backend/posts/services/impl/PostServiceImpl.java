package meowhub.backend.posts.services.impl;

import lombok.RequiredArgsConstructor;
import meowhub.backend.posts.dtos.PostDto;
import meowhub.backend.posts.models.Post;
import meowhub.backend.posts.services.PostService;
import meowhub.backend.shared.constants.AlertConstants;
import meowhub.backend.users.dtos.BasicUserInfoDto;
import meowhub.backend.users.models.User;
import meowhub.backend.posts.repositories.PostRepository;
import meowhub.backend.users.repositories.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    @Override
    public Page<PostDto> getPosts(String requestedBy, int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        return postRepository.findIfPublicOrFriends(requestedBy, pageable);
    }

    @Override
    public Page<PostDto> getPostsForUser(String login, String requestedBy, int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        userRepository.findByLogin(login)
                .orElseThrow(() -> new UsernameNotFoundException(String.format(AlertConstants.USER_WITH_LOGIN_NOT_FOUND, login)));

        if (login.equals(requestedBy)) {
            return postRepository.findOwn(login, pageable);
        } else {
            return postRepository.findByUserLoginIfPublicOrFriend(login, requestedBy, pageable);
        }
    }

    @Override
    public PostDto createPost(String login, String content) {
        User postOwner = userRepository.findByLogin(login)
                .orElseThrow(() -> new UsernameNotFoundException(String.format(AlertConstants.USER_WITH_LOGIN_NOT_FOUND, login)));
        Post post = new Post();
        post.setContentHtml(content);
        post.setUser(postOwner);
        post.setCreatedAt(LocalDateTime.now());
        post = postRepository.save(post);

        return convertToPostDto(post);
    }

    @Override
    public PostDto updatePost(String login, String postId, String content) {
        Post post = findUserPost(login, postId);
        post.setContentHtml(content);
        return convertToPostDto(postRepository.save(post));
    }

    @Override
    public void deletePost(String login, String postId) {
        postRepository.delete(findUserPost(login, postId));
    }

    private Post findUserPost(String login, String postId) {
        userRepository.findByLogin(login)
                .orElseThrow(() -> new UsernameNotFoundException(String.format(AlertConstants.USER_WITH_LOGIN_NOT_FOUND, login)));

        return postRepository.findByUserLoginAndId(login, postId)
                .orElseThrow(() -> new NotFoundException(String.format(AlertConstants.RESOURCE_NOT_FOUND, "post", "id", postId)));
    }

    private PostDto convertToPostDto(Post post) {
        if (post == null) {
            return null;
        }

        String login = post.getUser().getLogin();
        BasicUserInfoDto author = userRepository.findBasicUserInfoByLogin(login)
                .orElseThrow(() -> new UsernameNotFoundException(String.format(AlertConstants.USER_WITH_LOGIN_NOT_FOUND, login)));

        return PostDto.builder()
                .id(post.getId())
                .content(post.getContentHtml())
                .author(author)
                .createdAt(post.getCreatedAt())
                .build();
    }
}
