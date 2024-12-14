package meowhub.backend.repositories;

import meowhub.backend.jpa_buddy.UserRelation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRelationRepository extends JpaRepository<UserRelation, String> {
}