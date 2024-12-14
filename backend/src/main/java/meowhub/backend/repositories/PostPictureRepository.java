package meowhub.backend.repositories;

import meowhub.backend.jpa_buddy.PostPicture;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostPictureRepository extends JpaRepository<PostPicture, String> {
}