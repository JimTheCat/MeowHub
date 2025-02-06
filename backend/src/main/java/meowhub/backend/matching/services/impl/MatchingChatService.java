package meowhub.backend.matching.services.impl;

import lombok.RequiredArgsConstructor;
import meowhub.backend.matching.models.MatchingChat;
import meowhub.backend.matching.models.MatchingProfile;
import meowhub.backend.matching.repositories.MatchingChatRepository;
import meowhub.backend.matching.services.MatchingProfileQueryService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MatchingChatService {
    private final MatchingChatRepository repository;
    private final MatchingProfileQueryService queryService;

    public String getOrCreateChatroomId(String senderLogin, String receiverId) {
        MatchingProfile sender = queryService.findMatchingProfileByLoginOrThrow(senderLogin);
        MatchingProfile receiver = queryService.findMatchingProfileByIdOrThrow(receiverId);

        return repository.findBySenderIdAndReceiverId(sender.getId(), receiverId)
                .orElseGet(() -> createChatroom(sender, receiver)).getId();
    }

    public Optional<MatchingChat> getChatroom(String chatroomId) {
        return repository.findById(chatroomId);
    }

    private MatchingChat createChatroom(MatchingProfile sender, MatchingProfile receiver) {
        MatchingChat chatroom = new MatchingChat();
        chatroom.setSender(sender);
        chatroom.setReceiver(receiver);

        return repository.save(chatroom);
    }
}
