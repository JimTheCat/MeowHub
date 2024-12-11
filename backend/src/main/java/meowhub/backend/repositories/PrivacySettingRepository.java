package meowhub.backend.repositories;

import meowhub.backend.jpa_buddy.PrivacySetting;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PrivacySettingRepository extends JpaRepository<PrivacySetting, String> {
    Optional<PrivacySetting> findByCode(String code);
}
