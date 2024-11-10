package meowhub.backend.repositories;

import meowhub.backend.models.ApplicationRole;
import meowhub.backend.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, String> {
    Optional<Role> findByRoleName(ApplicationRole role);
}
