package meowhub.backend.users.repositories;

import meowhub.backend.users.models.PrivacySetting;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PrivacySettingRepository extends JpaRepository<PrivacySetting, String> {
    Optional<PrivacySetting> findByCode(String code);
}
