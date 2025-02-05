package meowhub.backend.chats.repositories;

import meowhub.backend.chats.dtos.ChatBasicUserInfoDto;
import meowhub.backend.users.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface ChatUserRepository extends JpaRepository<User, String> {
    @Query(value = """
                SELECT new meowhub.backend.chats.dtos.ChatBasicUserInfoDto (
                    sender.id,
                    sender.name,
                    sender.surname,
                    sender.login,
                    pp.ociUrl,
                    chat.id,
                    chat.receiverNick,
                    sender.status.code
                )
                 FROM UserRelation relation
                 JOIN User sender ON relation.sender.id = sender.id
                 JOIN User receiver ON relation.receiver.id = receiver.id
                 LEFT JOIN Profile p ON p.user.id = sender.id
                 LEFT JOIN ProfilePicture pp ON pp.profile.id = p.id AND pp.isCurrentProfilePicture = true
                 LEFT JOIN Chatroom chat ON chat.sender.id = sender.id AND chat.receiver.id = receiver.id
                WHERE receiver.login = :login
                  AND relation.relationType.code = 'FRIENDS'
                UNION
                SELECT new meowhub.backend.chats.dtos.ChatBasicUserInfoDto (
                    receiver.id,
                    receiver.name,
                    receiver.surname,
                    receiver.login,
                    pp.ociUrl,
                    chat.id,
                    chat.receiverNick,
                    receiver.status.code
                )
                 FROM UserRelation relation
                 JOIN User sender ON relation.sender.id = sender.id
                 JOIN User receiver ON relation.receiver.id = receiver.id
                 LEFT JOIN Profile p ON p.user.id = sender.id
                 LEFT JOIN ProfilePicture pp ON pp.profile.id = p.id AND pp.isCurrentProfilePicture = true
                 LEFT JOIN Chatroom chat ON chat.sender.id = sender.id AND chat.receiver.id = receiver.id
                WHERE sender.login = :login
                  AND relation.relationType.code = 'FRIENDS'
            """)
    Page<ChatBasicUserInfoDto> findFriendsFor (@Param("login") String login, Pageable pageable);
}
