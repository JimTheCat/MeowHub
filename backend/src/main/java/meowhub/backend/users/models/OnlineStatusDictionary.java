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
import meowhub.backend.chats.constants.OnlineStatus;
import meowhub.backend.matching.models.MatchingProfile;
import meowhub.backend.users.constants.Genders;

import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "ONLINE_STATUS", schema = "mh_users")
public class OnlineStatusDictionary {
    @Id
    @Size(max = 36)
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "ID", nullable = false, length = 36)
    private String id;

    @Size(max = 20)
    @NotNull
    @Column(name = "CODE", nullable = false, length = 20)
    private String code;

    @Column(name = "CREATED_AT")
    private LocalDateTime createdAt;

    @Size(max = 36)
    @Column(name = "CREATED_BY", length = 36)
    private String createdBy;

    @Column(name = "MODIFIED_AT")
    private LocalDateTime modifiedAt;

    @Size(max = 36)
    @Column(name = "MODIFIED_BY", length = 36)
    private String modifiedBy;

    @OneToMany(mappedBy = "status")
    private Set<User> users = new LinkedHashSet<>();

    public OnlineStatusDictionary(OnlineStatus onlineStatus) {
        this.code = onlineStatus.name();
    }
}