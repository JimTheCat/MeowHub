package meowhub.backend.repositories;

import meowhub.backend.jpa_buddy.Post;
import meowhub.backend.jpa_buddy.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, String> {
    List<Post> findAllByUser(User user);
}