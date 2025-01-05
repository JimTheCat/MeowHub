package meowhub.backend.user_relations.repositories;

import meowhub.backend.user_relations.models.RelationType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RelationTypeRepository extends JpaRepository<RelationType, String> {
    Optional<RelationType> findByCode(String code);
}