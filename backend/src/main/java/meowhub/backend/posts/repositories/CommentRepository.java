package meowhub.backend.posts.repositories;

import meowhub.backend.posts.models.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, String> {
}