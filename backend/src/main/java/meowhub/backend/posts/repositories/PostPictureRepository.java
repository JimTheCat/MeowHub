package meowhub.backend.posts.repositories;

import meowhub.backend.posts.models.PostPicture;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostPictureRepository extends JpaRepository<PostPicture, String> {
}