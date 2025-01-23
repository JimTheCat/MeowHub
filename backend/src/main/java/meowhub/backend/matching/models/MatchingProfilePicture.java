package meowhub.backend.matching.models;

import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import meowhub.backend.profiles.services.BooleanConverter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "MATCHING_PROFILE_PICTURES", schema = "mh_matching")
public class MatchingProfilePicture {
    @Id
    @Size(max = 36)
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "ID", nullable = false, length = 36)
    private String id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "MATCHING_PROFILE_ID", nullable = false)
    private MatchingProfile matchingProfile;

    @NotNull
    @Column(name = "OCI_NAME", nullable = false, length = 100)
    private String ociName;

    @NotNull
    @Column(name = "OCI_URL", nullable = false, length = 2000)
    private String ociUrl;

    @NotNull
    @Column(name = "IS_CURRENT_PP", nullable = false)
    @Convert(converter = BooleanConverter.class)
    private Boolean isCurrentProfilePicture;

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

    public MatchingProfilePicture(MatchingProfile matchingProfile, String ociName, String ociUrl, boolean isCurrentProfilePicture) {
        this.matchingProfile = matchingProfile;
        this.ociName = ociName;
        this.ociUrl = ociUrl;
        this.isCurrentProfilePicture = isCurrentProfilePicture;
    }
}