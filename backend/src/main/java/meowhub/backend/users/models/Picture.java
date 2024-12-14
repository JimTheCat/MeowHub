package meowhub.backend.users.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import meowhub.backend.jpa_buddy.Group;
import meowhub.backend.jpa_buddy.MatchingProfilePicture;
import meowhub.backend.posts.models.PostPicture;
import meowhub.backend.jpa_buddy.ProfilePicture;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDate;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "PICTURES", schema = "mh_users")
public class Picture {
    @Id
    @Size(max = 36)
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "ID", nullable = false, length = 36)
    private String id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "USER_ID", nullable = false)
    private User user;

    @NotNull
    @Column(name = "PICTURE", nullable = false)
    private byte[] picture;

    @Column(name = "CREATED_AT")
    private LocalDate createdAt;

    @Size(max = 36)
    @Column(name = "CREATED_BY", length = 36)
    private String createdBy;

    @Column(name = "MODIFIED_AT")
    private LocalDate modifiedAt;

    @Size(max = 36)
    @Column(name = "MODIFIED_BY", length = 36)
    private String modifiedBy;

    @OneToMany(mappedBy = "picture")
    private Set<Group> groups = new LinkedHashSet<>();

    @OneToMany(mappedBy = "picture")
    private Set<MatchingProfilePicture> matchingProfilePictures = new LinkedHashSet<>();

    @OneToMany(mappedBy = "picture")
    private Set<PostPicture> postPictures = new LinkedHashSet<>();

    @OneToMany(mappedBy = "picture")
    private Set<ProfilePicture> profilePictures = new LinkedHashSet<>();

}