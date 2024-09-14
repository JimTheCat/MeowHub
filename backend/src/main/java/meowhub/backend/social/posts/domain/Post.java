package meowhub.backend.social.posts.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import meowhub.backend.social.user.domain.models.User;

import java.time.LocalDate;

@Table(name = "posts")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "content", length = 4000, nullable = false)
    private String content;

    @Column(name = "post_date", nullable = false)
    private LocalDate postDate;

    @OneToOne(mappedBy = "id")
    private User user;
}
