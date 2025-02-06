package meowhub.backend.matching.repositories;

import meowhub.backend.matching.models.MatchingChat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface MatchingChatRepository extends JpaRepository<MatchingChat, String> {

    @Query("""
            SELECT chatroom
              FROM MatchingChat chatroom
             WHERE (chatroom.sender.id = :senderId AND chatroom.receiver.id = :receiverId)
                OR (chatroom.sender.id = :receiverId AND chatroom.receiver.id = :senderId)
            """)
    Optional<MatchingChat> findBySenderIdAndReceiverId(@Param("senderId") String senderId, @Param("receiverId") String receiverId);
}