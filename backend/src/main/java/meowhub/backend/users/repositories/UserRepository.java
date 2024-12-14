package meowhub.backend.users.repositories;

import meowhub.backend.users.dtos.BasicUserInfoDto;
import meowhub.backend.users.models.User;
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
            p.picture
        )
        FROM User u
        LEFT JOIN Picture p ON p.user.id = u.id
        LEFT JOIN ProfilePicture pp ON pp.picture.id = p.id
        WHERE u.login = :login
        ORDER BY pp.id
        FETCH FIRST 1 ROWS ONLY
    """)
    Optional<BasicUserInfoDto> findBasicUserInfoByLogin(@Param("login") String login);
}
