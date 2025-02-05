package meowhub.backend.chats.services;

import lombok.RequiredArgsConstructor;
import meowhub.backend.chats.models.Chatroom;
import meowhub.backend.chats.repositories.ChatroomRepository;
import meowhub.backend.users.facades.UserChatServiceFacade;
import meowhub.backend.users.models.User;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChatService {
    private final ChatroomRepository repository;
    private final UserChatServiceFacade userChatServiceFacade;

    public String getOrCreateChatroomId(String senderLogin, String receiverLogin) {
        return repository.findBySenderLoginAndReceiverLogin(senderLogin, receiverLogin)
                .orElseGet(() -> createChatroom(senderLogin, receiverLogin)).getId();
    }

    public Optional<Chatroom> getChatroom(String chatroomId) {
        return repository.findById(chatroomId);
    }

    private Chatroom createChatroom(String senderLogin, String receiverLogin) {
        User sender = userChatServiceFacade.findUserByLogin(senderLogin);
        User receiver = userChatServiceFacade.findUserByLogin(receiverLogin);

        Chatroom chatroom = new Chatroom();
        chatroom.setSender(sender);
        chatroom.setReceiver(receiver);

        return repository.save(chatroom);
    }
}
