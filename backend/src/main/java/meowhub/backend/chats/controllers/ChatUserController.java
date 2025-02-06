package meowhub.backend.chats.controllers;

import lombok.RequiredArgsConstructor;
import meowhub.backend.chats.dtos.ChatBasicUserInfoDto;
import meowhub.backend.chats.dtos.UpdateChatUserStatusDto;
import meowhub.backend.chats.services.ChatUserService;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/chat")
public class ChatUserController {
    private final ChatUserService userService;

    //metoda dodania użytkownika + poinformowanie (@SendTo) kolejki publicznej o nowej aktywności -> main.js wysyła: 40, subskrybuje info na publicznej kolejce: 37
    @MessageMapping("/user.addUser")
    @SendTo("/topic/public")
    public UpdateChatUserStatusDto addUser(@Payload String login, SimpMessageHeaderAccessor headerAccessor, @AuthenticationPrincipal UserDetails userDetails) {
        //metodka, która ustawia atrybuty na sesji websocketowej
        //do obsługi zerwania połączenia z Websocketem -> znajdujemy użytkownika po loginie i ustawiamy mu Offline
        headerAccessor.getSessionAttributes().put("login", login);
        System.out.println("UserDetails: " + userDetails);
        return userService.updateUser(login);
    }

    //metoda rożłączenia użytkownika -> main.js wysyła: 183
    @MessageMapping("/user.disconnectUser")
    @SendTo("/topic/public")
    public UpdateChatUserStatusDto disconnectUser(@Payload String login) {
        return userService.disconnect(login);
    }

//    //pobranie obecnie aktywnych użytkowników -> main.js wysyła: 51
//    @GetMapping("/users")
//    public ResponseEntity<Page<ChatBasicUserInfoDto>> findConnectedUsers(@AuthenticationPrincipal UserDetails userDetails, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
//        return ResponseEntity.ok(userService.findConnectedUsers(userDetails == null ? "kinga" : userDetails.getUsername(),  page, size)); //TODO, obecnie demo
//    }

    @GetMapping("/users2/{login}")
    public ResponseEntity<List<ChatBasicUserInfoDto>> findConnectedUsers(@PathVariable("login") String login, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(userService.findConnectedUsers2(login)); //TODO, obecnie demo
    }
}
