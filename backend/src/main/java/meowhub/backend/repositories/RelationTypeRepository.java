package meowhub.backend.repositories;

import meowhub.backend.jpa_buddy.RelationType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RelationTypeRepository extends JpaRepository<RelationType, String> {
}