package meowhub.backend.matching.repositories;

import meowhub.backend.matching.models.MatchingProfile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;


public interface MatchingProfileRepository extends JpaRepository<MatchingProfile, String> {
    boolean existsByUserLogin(String login);
    Optional<MatchingProfile> findByUserLogin(String login);

    @Query("""
           SELECT mp
             FROM MatchingProfile mp,
                  MatchingProfile filters
            WHERE mp.user.login != :login
              AND filters.user.login = :login
              AND mp.height BETWEEN COALESCE(filters.pHeightFrom, mp.height) AND COALESCE(filters.pHeightTo, mp.height)
              AND mp.age BETWEEN COALESCE(filters.pAgeFrom, mp.age) AND COALESCE(filters.pAgeTo, mp.age)
              AND mp.lookingFor.id = COALESCE(filters.pLookingFor.id, mp.lookingFor.id)
              AND mp.gender.id = COALESCE(filters.pGender.id, mp.gender.id)
    """)
    Page<MatchingProfile> search(@Param("login") String login, Pageable pageable);
}