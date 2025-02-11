package meowhub.backend.user_relations.controllers;

import lombok.RequiredArgsConstructor;
import meowhub.backend.user_relations.services.UserRelationQueryService;
import meowhub.backend.user_relations.services.UserRelationService;
import meowhub.backend.users.dtos.BasicUserInfoDto;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/relations")
@RequiredArgsConstructor
public class UserRelationController {
    private final UserRelationService service;
    private final UserRelationQueryService queryService;

    @GetMapping("{login}/friends")
    public ResponseEntity<Page<BasicUserInfoDto>> getFriendsForUser(@PathVariable String login, @AuthenticationPrincipal UserDetails userDetails, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(queryService.getFriendsForUser(login, userDetails.getUsername(), page, size));
    }

    @GetMapping("pending")
    public ResponseEntity<Page<BasicUserInfoDto>> getPendingSentRequests(@AuthenticationPrincipal UserDetails userDetails, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(queryService.getPendingSentRequests(userDetails.getUsername(), page, size));
    }

    @GetMapping("received")
    public ResponseEntity<Page<BasicUserInfoDto>> getReceivedRequests(@AuthenticationPrincipal UserDetails userDetails, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(queryService.getReceivedRequests(userDetails.getUsername(), page, size));
    }

    @GetMapping("rejected")
    public ResponseEntity<Page<BasicUserInfoDto>> getRejectedRequests(@AuthenticationPrincipal UserDetails userDetails, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(queryService.getRejectedRequests(userDetails.getUsername(), page, size));
    }

    @PostMapping("{login}/send")
    public ResponseEntity<Void> sendFriendRequest(@PathVariable String login, @AuthenticationPrincipal UserDetails userDetails) {
        service.sendFriendRequestTo(login, userDetails.getUsername());
        return ResponseEntity.ok().build();
    }

    @PostMapping("{login}/reject")
    public ResponseEntity<Void> rejectFriendRequest(@PathVariable String login, @AuthenticationPrincipal UserDetails userDetails) {
        service.rejectFriendRequestFrom(login, userDetails.getUsername());
        return ResponseEntity.ok().build();
    }

    @PostMapping("{acceptFrom}/accept")
    public ResponseEntity<Void> acceptFriendRequest(@PathVariable String acceptFrom, @AuthenticationPrincipal UserDetails userDetails) {
        service.acceptFriendRequestFrom(acceptFrom, userDetails.getUsername());
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("{login}/delete-friend")
    public ResponseEntity<Void> deleteFriend(@PathVariable String login, @AuthenticationPrincipal UserDetails userDetails) {
        service.deleteFriend(login, userDetails.getUsername());
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("{login}/delete-invite")
    public ResponseEntity<Void> deleteInvite(@PathVariable String login, @AuthenticationPrincipal UserDetails userDetails) {
        service.deleteInvite(login, userDetails.getUsername());
        return ResponseEntity.ok().build();
    }


}
