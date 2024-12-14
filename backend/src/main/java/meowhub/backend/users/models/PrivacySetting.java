package meowhub.backend.users.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import meowhub.backend.constants.PrivacySettings;

import java.time.LocalDate;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "PRIVACY_SETTINGS", schema = "mh_users")
public class PrivacySetting {
    @Id
    @Size(max = 36)
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "ID", nullable = false, length = 36)
    private String id;

    @Size(max = 36)
    @NotNull
    @Column(name = "CODE", nullable = false, length = 36)
    private String code;

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

    @OneToMany(mappedBy = "profilePrivacy")
    private Set<User> usersProfilePrivacy = new LinkedHashSet<>();

    @OneToMany(mappedBy = "postsPrivacy")
    private Set<User> usersPostsPrivacy = new LinkedHashSet<>();

    @OneToMany(mappedBy = "friendsPrivacy")
    private Set<User> usersFriendsPrivacy = new LinkedHashSet<>();

    public PrivacySetting(PrivacySettings privacySetting) {
        this.code = privacySetting.name();
    }
}