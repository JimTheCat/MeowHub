package meowhub.backend.matching.controllers;

import lombok.RequiredArgsConstructor;
import meowhub.backend.chats.dtos.ChatBasicUserInfoDto;
import meowhub.backend.chats.dtos.UpdateChatUserStatusDto;
import meowhub.backend.chats.services.ChatUserService;
import meowhub.backend.matching.dtos.BasicMatchingProfileInfoDto;
import meowhub.backend.matching.services.impl.MatchingChatUserService;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/matching-chat")
public class MatchingChatUserController {
    private final MatchingChatUserService matchingChatUserService;

    //metoda dodania użytkownika + poinformowanie (@SendTo) kolejki publicznej o nowej aktywności -> main.js wysyła: 40, subskrybuje info na publicznej kolejce: 37
    @MessageMapping("/user.addMatchingUser")
    @SendTo("/topic/matching/public")
    public UpdateChatUserStatusDto addMatchingUser(
            @Payload String login, SimpMessageHeaderAccessor headerAccessor
    ) {
        //metodka, która ustawia atrybuty na sesji websocketowej
        //do obsługi zerwania połączenia z Websocketem -> znajdujemy użytkownika po loginie i ustawiamy mu Offline
        headerAccessor.getSessionAttributes().put("login", login);
        return matchingChatUserService.updateMatchingProfile(login);
    }

    //metoda rożłączenia użytkownika -> main.js wysyła: 183
    @MessageMapping("/user.disconnectMatchingUser")
    @SendTo("/topic/matching/public")
    public UpdateChatUserStatusDto disconnectMatchingUser(
            @Payload String login
    ) {
        return matchingChatUserService.disconnect(login);
    }


    @GetMapping("/users2/{login}")
    public ResponseEntity<List<BasicMatchingProfileInfoDto>> findConnectedUsers(@PathVariable("login") String login, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(matchingChatUserService.findConnectedUsers2(login)); //TODO, obecnie demo
    }
}
