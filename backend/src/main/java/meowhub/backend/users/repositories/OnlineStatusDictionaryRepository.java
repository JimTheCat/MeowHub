package meowhub.backend.users.repositories;

import meowhub.backend.users.models.OnlineStatusDictionary;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OnlineStatusDictionaryRepository extends JpaRepository<OnlineStatusDictionary, String> {
    Optional<OnlineStatusDictionary> findByCode(String code);
}