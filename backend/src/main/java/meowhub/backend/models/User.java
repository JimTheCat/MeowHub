    package meowhub.backend.models;

    import jakarta.persistence.*;
    import jakarta.validation.constraints.Email;
    import jakarta.validation.constraints.Size;
    import lombok.*;
    import org.antlr.v4.runtime.misc.NotNull;
    import org.hibernate.annotations.CreationTimestamp;
    import org.hibernate.annotations.UpdateTimestamp;
    import org.hibernate.validator.constraints.UniqueElements;

    import java.time.LocalDate;

    @Entity
    @ToString
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    @Data
    public class User {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY) //pod sqlite
    //    @GeneratedValue(strategy = GenerationType.AUTO)
        private Long id;

        @NotNull
        @Column(unique = true)
        @Size(min = 3, max = 10)
        private String login;

        @NotNull
        @Size(min = 2, max = 20)
        private String name;

        @Size(min = 2, max = 20)
        private String secondName;

        @NotNull
        @Size(min = 1, max = 20)
        private String lastname;

        @NotNull
        @Size(min = 3, max = 40)
        private String password;

        //    @NotNull //todo - na razie nie obsługujemy
        private String salt;

        private String refreshToken; //todo - w bazie danych obecnie jako INT

        @ManyToOne
        @JoinColumn(name = "user_role_id", nullable = false)
        private UserRole userRole;

        @NotNull
        private LocalDate birthdate;

        @NotNull
        @Column(unique = true)
        @Email
        private String email;


    //    private String status INT NOT NULL;
    //    private String create_user_id INT NOT NULL;
    //    private String create_date TIMESTAMP NOT NULL;
    //    private String mod_user_id INT;
    //    private String mod_date TIMESTAMP;
    //    private String CONSTRAINT users_login_uq UNIQUE (login),
    //    private String CONSTRAINT users_email_uq UNIQUE (email),
    //    private String CONSTRAINT fk_role FOREIGN KEY (role) REFERENCES user_roles(id),
    //    private String CONSTRAINT fk_status FOREIGN KEY (status) REFERENCES status(id)

        @NotNull
        private Long create_user_id;

        @NotNull
        @CreationTimestamp
        private LocalDate create_date;

        private Long mod_user_id;

        @UpdateTimestamp
        private LocalDate mod_date;
    }
