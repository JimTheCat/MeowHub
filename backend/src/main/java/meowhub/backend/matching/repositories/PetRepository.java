package meowhub.backend.matching.repositories;

import meowhub.backend.matching.models.Pet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PetRepository extends JpaRepository<Pet, String> {
    Optional<Pet> findByCode(String code);
}