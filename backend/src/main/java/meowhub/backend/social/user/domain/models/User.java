package meowhub.backend.social.user.domain.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Table(name = "users")
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "login", length = 10, unique = true, nullable = false)
    private String login;

    @Column(name = "name", length = 20, nullable = false)
    private String name;

    @Column(name = "second_name", length = 20, nullable = false)
    private String secondName;

    @Column(name = "lastname", length = 20, nullable = false)
    private String lastName;

    @Column(name = "password", length = 40, nullable = false)
    private String password;

    @Column(name = "salt", length = 40)
    private String salt;

    @ManyToOne
    @JoinColumn(name = "role", nullable = false)
    private UserRole role;

    @Column(name = "birthdate", nullable = false)
    private LocalDate birthdate;

    @Column(name = "email", length = 40)
    private String email;

    @ManyToOne
    @JoinColumn(name = "status", nullable = false)
    private UserStatus status;
}
