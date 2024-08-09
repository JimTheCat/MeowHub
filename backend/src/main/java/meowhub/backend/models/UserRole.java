package meowhub.backend.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.antlr.v4.runtime.misc.NotNull;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.util.List;

@Entity
@ToString
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "USER_ROLES")
public class UserRole {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //pod sqlite
//    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Size(min = 2, max = 10)
    private String name;

    @Size(max = 250)
    private String description;

    @OneToMany(mappedBy = "userRole", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    private List<User> users;

    @NotNull
    private Long create_user_id;

    @NotNull
    @CreationTimestamp
    private LocalDate create_date;

    private Long mod_user_id;

    @UpdateTimestamp
    private LocalDate mod_date;
}
