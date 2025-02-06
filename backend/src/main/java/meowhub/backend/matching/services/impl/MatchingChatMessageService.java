package meowhub.backend.matching.services.impl;

import lombok.RequiredArgsConstructor;
import meowhub.backend.chats.dtos.ChatMessageDto;
import meowhub.backend.chats.models.ChatMessage;
import meowhub.backend.chats.models.Chatroom;
import meowhub.backend.chats.repositories.ChatMessageRepository;
import meowhub.backend.chats.services.ChatService;
import meowhub.backend.matching.dtos.MatchingChatMessageDto;
import meowhub.backend.matching.models.MatchingChat;
import meowhub.backend.matching.models.MatchingChatMessage;
import meowhub.backend.matching.models.MatchingProfile;
import meowhub.backend.matching.repositories.MatchingChatMessageRepository;
import meowhub.backend.matching.services.MatchingProfileQueryService;
import meowhub.backend.users.facades.UserChatServiceFacade;
import meowhub.backend.users.models.User;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;


@Service
@RequiredArgsConstructor
public class MatchingChatMessageService {
    private final MatchingChatMessageRepository repository;
    private final MatchingProfileQueryService profileQueryService;
    private final MatchingChatService chatService;


    public MatchingChatMessageDto save(MatchingChatMessageDto chatMessageDto) {
//        MatchingProfile sender = profileQueryService.findMatchingProfileByIdOrThrow(chatMessageDto.getSenderId()); TODO
        MatchingProfile sender = profileQueryService.findMatchingProfileByLoginOrThrow(chatMessageDto.getSenderId());

        MatchingChat chatroom = chatService.getChatroom(chatMessageDto.getMatchingChatId())
                .orElseThrow(() -> new RuntimeException("Could not find chatroom with id: " + chatMessageDto.getMatchingChatId()));

        MatchingChatMessage chatMessage = new MatchingChatMessage();
        chatMessage.setMatchChat(chatroom);
        chatMessage.setAuthor(sender);
        chatMessage.setMessage(chatMessageDto.getContent());
        repository.save(chatMessage);

        chatMessageDto.setMatchingChatId(chatroom.getId());
        return chatMessageDto;
    }


    public List<MatchingChatMessageDto> findChatMessages(String chatroomId, int page, int size) {
        MatchingChat chatroom = chatService.getChatroom(chatroomId)
                .orElseThrow(() -> new RuntimeException("Could not find chatroom with id: " + chatroomId));

        Pageable pageable = PageRequest.of(page, size);
        return repository.findByMatchChatIdOrderByCreatedAtDesc(chatroomId, pageable).stream().map(chatMessage -> {
                    String messageAuthor = chatMessage.getAuthor().getId();
                    String messageReceiver = messageAuthor == chatroom.getReceiver().getId() ? chatroom.getSender().getId() : chatroom.getReceiver().getId();

                    MatchingChatMessageDto chatMessageDto = new MatchingChatMessageDto();
                    chatMessageDto.setTimestamp(chatMessage.getCreatedAt());
                    chatMessageDto.setSenderId(messageAuthor);
                    chatMessageDto.setReceiverId(messageReceiver);
                    chatMessageDto.setContent(chatMessage.getMessage());
                    chatMessageDto.setMatchingChatId(chatroomId);
                    return chatMessageDto;
                }).sorted(Comparator.comparing(MatchingChatMessageDto::getTimestamp))
                .toList();
    }
}