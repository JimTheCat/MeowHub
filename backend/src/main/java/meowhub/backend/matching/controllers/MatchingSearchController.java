package meowhub.backend.matching.controllers;

import lombok.Builder;
import lombok.RequiredArgsConstructor;
import meowhub.backend.matching.dtos.MatchingProfileDto;
import meowhub.backend.matching.services.MatchingProfileQueryService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/matching-search")
@RequiredArgsConstructor
public class MatchingSearchController {
    private final MatchingProfileQueryService queryService;

    @GetMapping
    public ResponseEntity<Page<MatchingProfileDto>> searchMatchingProfiles(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size, @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(queryService.search(page, size, userDetails.getUsername()));
    }
}
