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
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import meowhub.backend.chats.constants.OnlineStatus;
import meowhub.backend.chats.models.Chatroom;
import meowhub.backend.chats.models.ChatMessage;
import meowhub.backend.posts.models.Comment;
import meowhub.backend.matching.models.MatchingProfile;
import meowhub.backend.posts.models.Post;
import meowhub.backend.profiles.models.Profile;
import meowhub.backend.user_relations.models.UserRelation;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "USERS", schema = "mh_users", uniqueConstraints = {
        @UniqueConstraint(name = "USERS_LOGIN_UQ", columnNames = {"LOGIN"}),
        @UniqueConstraint(name = "USERS_EMAIL_UQ", columnNames = {"EMAIL"})
})
public class User {
    @Id
    @Size(max = 36)
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "ID", nullable = false, length = 36)
    private String id;

    @Size(max = 40)
    @NotNull
    @Column(name = "NAME", nullable = false, length = 40)
    private String name;

    @Size(max = 40)
    @NotNull
    @Column(name = "SURNAME", nullable = false, length = 40)
    private String surname;

    @Size(max = 20)
    @NotNull
    @Column(name = "LOGIN", nullable = false, length = 20)
    private String login;

    @Size(max = 50)
    @NotNull
    @Column(name = "EMAIL", nullable = false, length = 50)
    private String email;

    @Size(max = 120)
    @NotNull
    @Column(name = "PASSWORD", nullable = false, length = 120)
    private String password;

    @NotNull
    @Column(name = "BIRTHDATE", nullable = false)
    private LocalDate birthdate;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "GENDER_ID", nullable = false)
    private Gender gender;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "PROFILE_PRIVACY_ID", nullable = false)
    private PrivacySetting profilePrivacy;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "POSTS_PRIVACY_ID", nullable = false)
    private PrivacySetting postsPrivacy;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "FRIENDS_PRIVACY_ID", nullable = false)
    private PrivacySetting friendsPrivacy;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "ROLE_ID", nullable = false)
    private Role role;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "ONLINE_STATUS_ID", nullable = false)
    private OnlineStatusDictionary status;

    @NotNull
    @Builder.Default
    @Column(name = "ACCOUNT_NON_LOCKED", nullable = false)
    private Boolean accountNonLocked = false;

    @NotNull
    @Builder.Default
    @Column(name = "CREDENTIALS_NON_EXPIRED", nullable = false)
    private Boolean credentialsNonExpired = false;

    @Column(name = "CREDENTIALS_EXPIRY_DATE")
    private LocalDateTime credentialsExpiryDate;

    @Column(name = "CREATED_AT")
    private LocalDateTime createdAt;

    @Size(max = 36)
    @Column(name = "CREATED_BY",length = 36)
    private String createdBy;

    @Column(name = "MODIFIED_AT")
    private LocalDateTime modifiedAt;

    @Size(max = 36)
    @Column(name = "MODIFIED_BY", length = 36)
    private String modifiedBy;

    @OneToMany(mappedBy = "sender")
    private final Set<Chatroom> chatroomsSender = new LinkedHashSet<>();

    @OneToMany(mappedBy = "receiver")
    private final Set<Chatroom> chatroomsReceiver = new LinkedHashSet<>();

    @OneToMany(mappedBy = "author")
    private final Set<ChatMessage> chatMessages = new LinkedHashSet<>();

    @OneToMany(mappedBy = "user")
    private final Set<Comment> comments = new LinkedHashSet<>();

    @OneToMany(mappedBy = "user")
    private final Set<MatchingProfile> matchingProfiles = new LinkedHashSet<>();

    @OneToMany(mappedBy = "user")
    private final Set<Post> posts = new LinkedHashSet<>();

    @OneToMany(mappedBy = "user")
    private final Set<Profile> profiles = new LinkedHashSet<>();

    @OneToMany(mappedBy = "sender")
    private final Set<UserRelation> userRelationsSender = new LinkedHashSet<>();

    @OneToMany(mappedBy = "receiver")
    private final Set<UserRelation> userRelationsReceiver = new LinkedHashSet<>();

    @OneToMany(mappedBy = "user")
    private final Set<UserToken> userTokens = new LinkedHashSet<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof User)) return false;
        return id != null && id.equals(((User) o).getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}