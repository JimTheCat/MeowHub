package meowhub.backend.matching.repositories;

import meowhub.backend.matching.models.LikeType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikeTypeRepository extends JpaRepository<LikeType, String> {
    LikeType findByCode(String code);
}