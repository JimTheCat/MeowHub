package meowhub.backend.users.repositories;

import meowhub.backend.users.dtos.BasicUserInfoDto;
import meowhub.backend.users.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByLogin(String login);

    Boolean existsByLogin(String login);

    Boolean existsByEmail(String email);

    @Query(value = """
        SELECT new meowhub.backend.users.dtos.BasicUserInfoDto (
            u.id,
            u.name,
            u.surname,
            u.login,
            pp.ociUrl
        )
        FROM User u
        LEFT JOIN Profile p ON p.user.id = u.id
        LEFT JOIN ProfilePicture pp ON pp.profile.id = p.id AND pp.isCurrentProfilePicture = true
        WHERE u.login = :login
        ORDER BY pp.id
        FETCH FIRST 1 ROWS ONLY
    """)
    Optional<BasicUserInfoDto> findBasicUserInfoByLogin(@Param("login") String login);


    @Query("""
        SELECT new meowhub.backend.users.dtos.BasicUserInfoDto (
            u.id,
            u.name,
            u.surname,
            u.login,
            pp.ociUrl
        )
         FROM User u
         JOIN Profile p ON p.user.id = u.id
         LEFT JOIN ProfilePicture pp ON pp.profile.id = p.id AND pp.isCurrentProfilePicture = true
        WHERE LOWER(u.login) LIKE LOWER(CONCAT('%', :query, '%'))
           OR LOWER(u.name) LIKE LOWER(CONCAT('%', :query, '%'))
           OR LOWER(u.surname) LIKE LOWER(CONCAT('%', :query, '%'))
        ORDER BY
           CASE
               WHEN LOWER(u.login) LIKE LOWER(CONCAT('%', :query, '%')) THEN 1
               WHEN LOWER(u.name) LIKE LOWER(CONCAT('%', :query, '%')) THEN 2
               WHEN LOWER(u.surname) LIKE LOWER(CONCAT('%', :query, '%')) THEN 3
               ELSE 4
           END
    """)
        Page<BasicUserInfoDto> searchByQuery(@Param("query") String query, Pageable pageable);
}
