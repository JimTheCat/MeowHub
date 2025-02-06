package meowhub.backend.chats.repositories;

import meowhub.backend.chats.models.ChatMessage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, String> {
    Page<ChatMessage> findByChatroomIdOrderByCreatedAtDesc(String chatroomId, Pageable pageable);
}