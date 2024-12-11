package meowhub.backend.jpa_buddy;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "H_USERS", schema = "mh_users", uniqueConstraints = {
        @UniqueConstraint(name = "H_USERS_LOGIN_UQ", columnNames = {"LOGIN"}),
        @UniqueConstraint(name = "H_USERS_EMAIL_UQ", columnNames = {"EMAIL"})
})
public class HUser {
    @Id
    @Size(max = 36)
    @ColumnDefault("sys_guid()")
    @Column(name = "ID", nullable = false, length = 36)
    private String id;

    @Size(max = 36)
    @NotNull
    @Column(name = "USER_ID", nullable = false, length = 36)
    private String userId;

    @Size(max = 10)
    @NotNull
    @Column(name = "OPERATION_TYPE", nullable = false, length = 10)
    private String operationType;

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

    @Size(max = 20)
    @NotNull
    @Column(name = "SALT", nullable = false, length = 20)
    private String salt;

    @NotNull
    @Column(name = "BIRTHDATE", nullable = false)
    private LocalDate birthdate;

    @Size(max = 36)
    @NotNull
    @Column(name = "GENDER_ID", nullable = false, length = 36)
    private String genderId;

    @Size(max = 36)
    @NotNull
    @Column(name = "PROFILE_PRIVACY_ID", nullable = false, length = 36)
    private String profilePrivacyId;

    @Size(max = 36)
    @NotNull
    @Column(name = "POSTS_PRIVACY_ID", nullable = false, length = 36)
    private String postsPrivacyId;

    @Size(max = 36)
    @NotNull
    @Column(name = "FRIENDS_PRIVACY_ID", nullable = false, length = 36)
    private String friendsPrivacyId;

    @Size(max = 36)
    @NotNull
    @Column(name = "ROLE_ID", nullable = false, length = 36)
    private String roleId;

    @NotNull
    @Column(name = "ACCOUNT_NON_LOCKED", nullable = false)
    private Boolean accountNonLocked = false;

    @NotNull
    @Column(name = "CREDENTIALS_NON_EXPIRED", nullable = false)
    private Boolean credentialsNonExpired = false;

    @Column(name = "CREDENTIALS_EXPIRY_DATE")
    private LocalDate credentialsExpiryDate;

    @NotNull
    @Column(name = "CREATED_AT", nullable = false)
    private LocalDate createdAt;

    @Size(max = 36)
    @NotNull
    @Column(name = "CREATED_BY", nullable = false, length = 36)
    private String createdBy;

}