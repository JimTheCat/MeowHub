package meowhub.backend.matching.controllers;

import lombok.RequiredArgsConstructor;
import meowhub.backend.matching.dtos.BasicMatchingProfileInfoDto;
import meowhub.backend.matching.dtos.UpdateMatchingProfileStatusDto;
import meowhub.backend.matching.services.impl.MatchingChatUserService;
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
@RequestMapping("/api/matching-chat")
public class MatchingChatUserController {
    private final MatchingChatUserService matchingChatUserService;

    @MessageMapping("/user.addMatchingUser")
    @SendTo("/topic/matching/public")
    public UpdateMatchingProfileStatusDto addMatchingUser(@Payload String login, SimpMessageHeaderAccessor headerAccessor) {
        headerAccessor.getSessionAttributes().put("login", login);
        return matchingChatUserService.updateMatchingProfile(login);
    }

    @MessageMapping("/user.disconnectMatchingUser")
    @SendTo("/topic/matching/public")
    public UpdateMatchingProfileStatusDto disconnectMatchingUser(@Payload String login) {
        return matchingChatUserService.disconnect(login);
    }

    @GetMapping("/users")
    public ResponseEntity<Page<BasicMatchingProfileInfoDto>> findConnectedUsers(@AuthenticationPrincipal UserDetails userDetails, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(matchingChatUserService.findConnectedUsers(userDetails.getUsername(), page, size));
    }
}
