package meowhub.backend.chats.controllers;

import lombok.RequiredArgsConstructor;
import meowhub.backend.chats.dtos.ChatBasicUserInfoDto;
import meowhub.backend.chats.dtos.UpdateChatUserStatusDto;
import meowhub.backend.chats.services.ChatUserService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/chat")
public class ChatUserController {
    private final ChatUserService userService;

    @MessageMapping("/user.addUser")
    @SendTo("/topic/public")
    public UpdateChatUserStatusDto addUser(@Payload String login, SimpMessageHeaderAccessor headerAccessor) {
        headerAccessor.getSessionAttributes().put("login", login);
        return userService.updateUser(login);
    }

    @MessageMapping("/user.disconnectUser")
    @SendTo("/topic/public")
    public UpdateChatUserStatusDto disconnectUser(@Payload String login) {
        return userService.disconnect(login);
    }

    @GetMapping("/users")
    public ResponseEntity<Page<ChatBasicUserInfoDto>> findConnectedUsers(@AuthenticationPrincipal UserDetails userDetails, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(userService.findConnectedUsers(userDetails.getUsername(), page, size));
    }
}
