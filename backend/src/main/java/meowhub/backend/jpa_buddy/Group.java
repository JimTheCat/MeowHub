package meowhub.backend.jpa_buddy;

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
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDate;
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

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "PICTURE_ID", nullable = false)
    private Picture picture;

    @NotNull
    @Column(name = "CREATE_DATE", nullable = false)
    private LocalDate createDate;

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

    @OneToMany(mappedBy = "group")
    private Set<GroupchatMessage> groupchatMessages = new LinkedHashSet<>();

    @OneToMany(mappedBy = "group")
    private Set<UserGroup> userGroups = new LinkedHashSet<>();

}