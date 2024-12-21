package meowhub.backend.users.repositories;

import meowhub.backend.users.models.Picture;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PictureRepository extends JpaRepository<Picture, String> {
}