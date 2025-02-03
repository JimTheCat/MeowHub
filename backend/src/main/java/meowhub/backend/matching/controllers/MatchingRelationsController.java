package meowhub.backend.matching.controllers;

import lombok.RequiredArgsConstructor;
import meowhub.backend.matching.dtos.BasicMatchingProfileInfoDto;
import meowhub.backend.matching.services.MatchingRelationService;
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
@RequestMapping("api/matching-relations")
@RequiredArgsConstructor
public class MatchingRelationsController {
    private final MatchingRelationService matchingRelationService;

    @GetMapping("liked")
    public ResponseEntity<Page<BasicMatchingProfileInfoDto>> getLikedUsers(@AuthenticationPrincipal UserDetails userDetails, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(matchingRelationService.getLikedUsers(userDetails.getUsername(), page, size));
    }

    @GetMapping("matched")
    public ResponseEntity<Page<BasicMatchingProfileInfoDto>> getMatchedUsers(@AuthenticationPrincipal UserDetails userDetails, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(matchingRelationService.getMatchedUsers(userDetails.getUsername(), page, size));
    }

    @GetMapping("disliked")
    public ResponseEntity<Page<BasicMatchingProfileInfoDto>> getDislikedUsers(@AuthenticationPrincipal UserDetails userDetails, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(matchingRelationService.getDislikedUsers(userDetails.getUsername(), page, size));
    }

    @PostMapping("/like/{matchingProfileId}")
    public ResponseEntity<Void> likeUser(@PathVariable String matchingProfileId, @AuthenticationPrincipal UserDetails userDetails) {
        matchingRelationService.likeUser(matchingProfileId, userDetails.getUsername());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/dislike/{matchingProfileId}")
    public ResponseEntity<Void> dislikeUser(@PathVariable String matchingProfileId, @AuthenticationPrincipal UserDetails userDetails) {
        matchingRelationService.dislikeUser(matchingProfileId, userDetails.getUsername());
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/match/{matchingProfileId}")
    public ResponseEntity<Void> deleteMatch(@PathVariable String matchingProfileId, @AuthenticationPrincipal UserDetails userDetails) {
        matchingRelationService.deleteMatch(matchingProfileId, userDetails.getUsername());
        return ResponseEntity.ok().build();
    }
}
