package meowhub.backend.chats.controllers;

import lombok.RequiredArgsConstructor;
import meowhub.backend.chats.dtos.ChatMessageDto;
import meowhub.backend.chats.dtos.ChatNotification;
import meowhub.backend.chats.services.ChatMessageService;
import meowhub.backend.chats.services.ChatService;
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
@RequestMapping("/api/chat")
public class ChatController {
    private final SimpMessagingTemplate messagingTemplate;
    private final ChatService chatService;
    private final ChatMessageService service;

    @GetMapping("/messages/{senderLogin}/{receiverLogin}")
    public ResponseEntity<String> getOrCreateChatroomId(@PathVariable("senderLogin") String senderLogin, @PathVariable("receiverLogin") String receiverLogin) {
        return ResponseEntity.ok(chatService.getOrCreateChatroomId(senderLogin, receiverLogin));
    }

    @GetMapping("/messages/{chatroomId}")
    public ResponseEntity<List<ChatMessageDto>> findChatMessages(@PathVariable("chatroomId") String chatroomId, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(service.findChatMessages(chatroomId, page, size));
    }

    @MessageMapping("/chat")
    public void processMessage(@Payload ChatMessageDto chatMessage){
        ChatMessageDto savedMsg = service.save(chatMessage);
        messagingTemplate.convertAndSendToUser(
                chatMessage.getReceiverLogin(), "/queue/messages",
                new ChatNotification(
                        savedMsg.getChatroomId(),
                        savedMsg.getSenderLogin(),
                        savedMsg.getReceiverLogin(),
                        savedMsg.getContent()
                )
        );
    }
}
