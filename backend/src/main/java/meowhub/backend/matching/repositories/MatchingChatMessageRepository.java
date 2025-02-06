package meowhub.backend.matching.repositories;

import meowhub.backend.matching.models.MatchingChatMessage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MatchingChatMessageRepository extends JpaRepository<MatchingChatMessage, String> {
    Page<MatchingChatMessage> findByMatchChatIdOrderByCreatedAtDesc(String matchChatId, Pageable pageable);
}