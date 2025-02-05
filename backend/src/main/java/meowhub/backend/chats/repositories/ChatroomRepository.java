package meowhub.backend.chats.repositories;

import meowhub.backend.chats.models.Chatroom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ChatroomRepository extends JpaRepository<Chatroom, String> {
    @Query("""
    SELECT chatroom
      FROM Chatroom chatroom
     WHERE (chatroom.sender.login = :senderLogin AND chatroom.receiver.login = :receiverLogin)
        OR (chatroom.sender.login = :receiverLogin AND chatroom.receiver.login = :senderLogin)
    """)
    Optional<Chatroom> findBySenderLoginAndReceiverLogin(@Param("senderLogin") String senderLogin, @Param("receiverLogin") String receiverLogin);
}