package meowhub.backend.matching.models;

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
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import meowhub.backend.users.models.Gender;
import meowhub.backend.users.models.User;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "MATCHING_PROFILES", schema = "mh_matching")
public class MatchingProfile {
    @Id
    @Size(max = 36)
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "ID", nullable = false, length = 36)
    private String id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "USER_ID", nullable = false)
    private User user;

    @Size(max = 2000)
    @Column(name = "PROFILE_DETAILS_HTML", length = 2000)
    private String profileDetailsHtml;

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

    @OneToMany(mappedBy = "receiver")
    private Set<Liked> likedReceiver = new LinkedHashSet<>();

    @OneToMany(mappedBy = "sender")
    private Set<Liked> likedSender = new LinkedHashSet<>();

    @OneToMany(mappedBy = "sender")
    private Set<MatchingChat> matchingChatsSender = new LinkedHashSet<>();

    @OneToMany(mappedBy = "receiver")
    private Set<MatchingChat> matchingChatsReceiver = new LinkedHashSet<>();

    @OneToMany(mappedBy = "matchingProfile")
    private Set<MatchingChatMessage> matchingChatMessages = new LinkedHashSet<>();

    @OneToMany(mappedBy = "matchingProfile")
    private Set<MatchingProfilePicture> matchingProfilePictures = new LinkedHashSet<>();

    @Size(max = 40)
    @NotNull
    @Column(name = "NAME", nullable = false, length = 40)
    private String name;

    @NotNull
    @Column(name = "BIRTHDATE", nullable = false)
    private LocalDate birthdate;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "GENDER_ID", nullable = false)
    private Gender gender;

    @Column(name = "HEIGHT")
    private Short height;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "SEXUALITY_ID")
    private Sexuality sexuality;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "PETS_ID")
    private Pet pets;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "EDUCATION_ID")
    private Education education;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "SMOKER_ID")
    private HowOften smoker;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "DRINKER_ID")
    private HowOften drinker;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "EXERCISES_ID")
    private HowOften exercises;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "LOOKING_FOR_ID")
    private LookingFor lookingFor;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "P_SEXUALITY_ID")
    private Sexuality pSexuality;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "P_LOOKING_FOR_ID")
    private LookingFor pLookingFor;

    @Min(16)
    @Max(100)
    @Column(name = "P_AGE_FROM")
    private Short pAgeFrom;

    @Min(16)
    @Max(100)
    @Column(name = "P_AGE_TO")
    private Short pAgeTo;

    @Min(120)
    @Max(300)
    @Column(name = "P_HEIGHT_FROM")
    private Short pHeightFrom;

    @Min(120)
    @Max(300)
    @Column(name = "P_HEIGHT_TO")
    private Short pHeightTo;

/*
 TODO [Reverse Engineering] create field to map the 'GEOLOCALIZATION' column
 Available actions: Define target Java type | Uncomment as is | Remove column mapping
    @Column(name = "GEOLOCALIZATION", columnDefinition = "SDO_GEOMETRY")
    private java.lang.Object geolocalization;
*/
}