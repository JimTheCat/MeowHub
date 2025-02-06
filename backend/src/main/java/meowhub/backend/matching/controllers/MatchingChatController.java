package meowhub.backend.matching.controllers;

import lombok.RequiredArgsConstructor;
import meowhub.backend.chats.dtos.ChatNotification;
import meowhub.backend.matching.dtos.MatchingChatMessageDto;
import meowhub.backend.matching.dtos.MatchingChatNotification;
import meowhub.backend.matching.services.MatchingProfileQueryService;
import meowhub.backend.matching.services.impl.MatchingChatMessageService;
import meowhub.backend.matching.services.impl.MatchingChatService;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/matching-chat")
public class MatchingChatController {
    private final SimpMessagingTemplate messagingTemplate;
    private final MatchingChatService chatService;
    private final MatchingChatMessageService service;

    //temp
    private final MatchingProfileQueryService matchingProfileQueryService;


    @GetMapping("/messages/{senderLogin}/{receiverId}") //TODO - później dodać authenticationPrincipal?
    public ResponseEntity<String> getOrCreateChatroomId(@PathVariable("senderLogin") String senderLogin, @PathVariable("receiverId") String receiverId) {
        return ResponseEntity.ok(chatService.getOrCreateChatroomId(senderLogin, receiverId));
    }

    @GetMapping("/messages/{chatroomId}")
    public ResponseEntity<List<MatchingChatMessageDto>> findChatMessages(@PathVariable("chatroomId") String chatroomId, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(service.findChatMessages(chatroomId, page, size));
    }

    @MessageMapping("/matching-chat")
    public void processMessage(@Payload MatchingChatMessageDto chatMessage){
        MatchingChatMessageDto savedMsg = service.save(chatMessage);


        messagingTemplate.convertAndSendToUser(
                matchingProfileQueryService.getLoginById(chatMessage.getReceiverId()), "/matching/queue/messages",
//                chatMessage.getReceiverId(), "/matching/queue/messages",
                new MatchingChatNotification(
                        savedMsg.getMatchingChatId(),
                        matchingProfileQueryService.findMatchingProfileByLogin(savedMsg.getSenderId()).get().getId(),
                        savedMsg.getReceiverId(),
                        savedMsg.getContent()
                )
        );
    }
}
