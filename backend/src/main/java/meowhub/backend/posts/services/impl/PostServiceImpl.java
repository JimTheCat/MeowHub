package meowhub.backend.posts.services.impl;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import meowhub.backend.posts.dtos.PostDto;
import meowhub.backend.posts.models.Post;
import meowhub.backend.posts.models.PostPicture;
import meowhub.backend.posts.repositories.PostPictureRepository;
import meowhub.backend.posts.services.PostService;
import meowhub.backend.shared.constants.AlertConstants;
import meowhub.backend.shared.constants.Modules;
import meowhub.backend.shared.dtos.PictureDto;
import meowhub.backend.shared.utils.PictureUtils;
import meowhub.backend.users.dtos.BasicUserInfoDto;
import meowhub.backend.users.facades.UserPostServiceFacade;
import meowhub.backend.users.models.User;
import meowhub.backend.posts.repositories.PostRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.webjars.NotFoundException;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {
    private final UserPostServiceFacade userPostServiceFacade;
    private final PostRepository postRepository;
    private final PictureUtils pictureUtils;
    private final PostPictureRepository postPictureRepository;

    @Override
    public PostDto getPostById(String requestedBy, String postId) {
        return postRepository.getPostByIdIfPublicOrFriends(requestedBy, postId);
    }

    @Override
    public Page<PostDto> getPosts(String requestedBy, int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<PostDto> posts = postRepository.findIfPublicOrFriends(requestedBy, pageable);
        posts.forEach(this::addPictures);
        return posts;
    }

    @Override
    public Page<PostDto> getPostsForUser(String login, String requestedBy, int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        userPostServiceFacade.validateIfUserExists(login);

        Page<PostDto> posts;
        if (login.equals(requestedBy)) {
            posts = postRepository.findOwn(login, pageable);
        } else {
            posts = postRepository.findByUserLoginIfPublicOrFriend(login, requestedBy, pageable);
        }
        addPicturesToPage(posts);
        return posts;

    }

    @Override
    @Transactional
    public PostDto createPost(String login, String content, List<MultipartFile> pictures) {
        if((content == null || content.isEmpty()) && (pictures == null || pictures.isEmpty())) {
            throw new NullPointerException(AlertConstants.POST_CONTENT_OR_PICTURE_REQUIRED);
        }

        User postOwner = userPostServiceFacade.findUserByLogin(login);
        Post post = new Post();
        post.setContentHtml(content);
        post.setUser(postOwner);
        post.setCreatedAt(LocalDateTime.now());
        post = postRepository.save(post);

        if(pictures == null || pictures.isEmpty() || pictures.getFirst().getContentType() == null) {
            return convertToPostDto(post);
        }

        List<PostPicture> postPictures = new ArrayList<>();
        for (int i = 0; i < pictures.size(); i++) {
            MultipartFile picture = pictures.get(i);
            Pair<String, String> pictureInfo = pictureUtils.uploadPictureToOCIAndGetAuthorizedUrlToAccessIt(picture, postOwner.getLogin(), Modules.POSTS);
            Long pictureIndex = (long) i;
            postPictures.add(new PostPicture(post, pictureInfo.getFirst(), pictureInfo.getSecond(), pictureIndex));
        }

        postPictureRepository.saveAll(postPictures);
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
        userPostServiceFacade.validateIfUserExists(login);

        return postRepository.findById(postId)
                .orElseThrow(() -> new NotFoundException(String.format(AlertConstants.RESOURCE_NOT_FOUND, "post", "id", postId)));
    }

    private Page<PostDto> addPicturesToPage (Page<PostDto> postsDto){
        postsDto.forEach(this::addPictures);
        return null;
    }

    private void addPictures (PostDto postsDto){
        List<PictureDto> pictures = postPictureRepository.findPicturesForPostId(postsDto.getId());
        postsDto.setPictures(pictures);
    }

    private PostDto convertToPostDto(Post post) {
        if (post == null) {
            return null;
        }

        BasicUserInfoDto author = userPostServiceFacade.getBasicUserInfo(post.getUser().getLogin());
        List<PictureDto> pictures = postPictureRepository.findPicturesForPostId(post.getId());

        return PostDto.builder()
                .id(post.getId())
                .content(post.getContentHtml())
                .author(author)
                .pictures(pictures)
                .createdAt(post.getCreatedAt())
                .build();
    }
}
