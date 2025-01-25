package meowhub.backend.posts.repositories;

import meowhub.backend.posts.models.PostPicture;
import meowhub.backend.shared.dtos.PictureDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PostPictureRepository extends JpaRepository<PostPicture, String> {
    @Query("""
                SELECT new meowhub.backend.shared.dtos.PictureDto (
                    pp.id,
                    pp.ociUrl,
                    null,
                    pp.createdAt
                )
                FROM PostPicture pp
                WHERE pp.post.id = :postId
                ORDER BY pp.index
            """)
    List<PictureDto> findPicturesForPostId(String postId);
}