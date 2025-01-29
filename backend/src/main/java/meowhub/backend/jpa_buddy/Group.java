package meowhub.backend.jpa_buddy;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "GROUPS", schema = "mh_groups", uniqueConstraints = {
        @UniqueConstraint(name = "GROUPS_NAME_UQ", columnNames = {"NAME"})
})
public class Group {
    @Id
    @Size(max = 36)
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "ID", nullable = false, length = 36)
    private String id;

    @Size(max = 40)
    @NotNull
    @Column(name = "NAME", nullable = false, length = 40)
    private String name;

    @Size(max = 200)
    @NotNull
    @Column(name = "DESCRIPTION", nullable = false, length = 200)
    private String description;

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

    @OneToMany(mappedBy = "group")
    private Set<GroupchatMessage> groupchatMessages = new LinkedHashSet<>();

    @OneToMany(mappedBy = "group")
    private Set<UserGroup> userGroups = new LinkedHashSet<>();

}