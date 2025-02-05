package meowhub.backend.chats.services;

import lombok.RequiredArgsConstructor;
import meowhub.backend.chats.dtos.ChatMessageDto;
import meowhub.backend.chats.models.ChatMessage;
import meowhub.backend.chats.models.Chatroom;
import meowhub.backend.chats.repositories.ChatMessageRepository;
import meowhub.backend.users.facades.UserChatServiceFacade;
import meowhub.backend.users.models.User;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Objects;


@Service
@RequiredArgsConstructor
public class ChatMessageService {
    private final ChatMessageRepository repository;
    private final UserChatServiceFacade userChatServiceFacade;
    private final ChatService chatRoomService;


    public ChatMessageDto save(ChatMessageDto chatMessageDto) {
        User sender = userChatServiceFacade.findUserByLogin(chatMessageDto.getSenderLogin());

        Chatroom chatroom = findChatroomByIdOrThrow(chatMessageDto.getChatroomId());

        ChatMessage chatMessage = new ChatMessage();
        chatMessage.setChatroom(chatroom);
        chatMessage.setAuthor(sender);
        chatMessage.setMessage(chatMessageDto.getContent());
        repository.save(chatMessage);

        chatMessageDto.setChatroomId(chatroom.getId());
        return chatMessageDto;
    }


    public List<ChatMessageDto> findChatMessages(String chatroomId, int page, int size) {
        Chatroom chatroom = findChatroomByIdOrThrow(chatroomId);

        Pageable pageable = PageRequest.of(page, size);
        return repository.findByChatroomIdOrderByCreatedAtDesc(chatroomId, pageable).stream().map(chatMessage -> {
            String messageAuthor = chatMessage.getAuthor().getLogin();
            String messageReceiver = Objects.equals(messageAuthor, chatroom.getReceiver().getLogin()) ? chatroom.getSender().getLogin() : chatroom.getReceiver().getLogin() ;

            ChatMessageDto chatMessageDto = new ChatMessageDto();
            chatMessageDto.setTimestamp(chatMessage.getCreatedAt());
            chatMessageDto.setSenderLogin(messageAuthor);
            chatMessageDto.setReceiverLogin(messageReceiver);
            chatMessageDto.setContent(chatMessage.getMessage());
            chatMessageDto.setChatroomId(chatroomId);
            return chatMessageDto;
        }).sorted(Comparator.comparing(ChatMessageDto::getTimestamp))
                .toList();
    }

    private Chatroom findChatroomByIdOrThrow(String chatroomId) {
        return chatRoomService.getChatroom(chatroomId)
                .orElseThrow(() -> new RuntimeException("Could not find chatroom with id: " + chatroomId));
    }
}