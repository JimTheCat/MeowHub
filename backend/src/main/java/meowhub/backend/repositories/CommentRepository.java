package meowhub.backend.repositories;

import meowhub.backend.jpa_buddy.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, String> {
}