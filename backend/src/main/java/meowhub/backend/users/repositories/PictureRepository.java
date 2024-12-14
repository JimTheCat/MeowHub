package meowhub.backend.users.repositories;

import meowhub.backend.jpa_buddy.Picture;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PictureRepository extends JpaRepository<Picture, String> {
}