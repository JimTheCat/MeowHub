package meowhub.backend.matching.controllers;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import meowhub.backend.matching.dtos.CreateMatchingProfileRequestDto;
import meowhub.backend.matching.dtos.MatchingProfilePreferencesDto;
import meowhub.backend.matching.dtos.UpdateMatchingProfileRequestDto;
import meowhub.backend.matching.dtos.MatchingProfileDto;
import meowhub.backend.matching.services.MatchingProfileQueryService;
import meowhub.backend.matching.services.MatchingProfileService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/matching-profile")
@AllArgsConstructor
public class MatchingProfileController {
    private final MatchingProfileService matchingProfileService;
    private final MatchingProfileQueryService matchingProfileQueryService;

    @GetMapping("")
    public ResponseEntity<MatchingProfileDto> getMyMatchingProfile(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(matchingProfileQueryService.getMyProfile(userDetails.getUsername()));
    }

    @PostMapping("/update")
    public ResponseEntity<MatchingProfileDto> updateMatchingProfile(@RequestBody UpdateMatchingProfileRequestDto matchingProfileDto, @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(matchingProfileService.updateMatchingProfile(matchingProfileDto, userDetails.getUsername()));
    }

    @PostMapping("/create")
    public ResponseEntity<MatchingProfileDto> createMatchingProfileBasedOnAccount(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(matchingProfileService.createMatchingProfileBasedOnAccount(userDetails.getUsername()));
    }

    @PostMapping("/create-from-scratch")
    public ResponseEntity<MatchingProfileDto> createMatchingProfileFromScratch(@RequestBody CreateMatchingProfileRequestDto request, @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(matchingProfileService.createMatchingProfileFromScratch(request, userDetails.getUsername()));
    }

    /***
     * Gets all matching profiles including own profile. For developments purposes only.
     * This method is deprecated and will be removed in the future.
     * @deprecated
     * @param pageable
     * @return
     */
    @GetMapping("/all")
    @Deprecated(forRemoval = true)
    public ResponseEntity<Page<MatchingProfileDto>> getAllMatchingProfiles(Pageable pageable) {
        return ResponseEntity.ok(matchingProfileQueryService.getAllMatchingProfiles(pageable));
    }

    @GetMapping("/preferences")
    public ResponseEntity<MatchingProfilePreferencesDto> getMatchingProfilePreferences(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(matchingProfileQueryService.getPreferences(userDetails.getUsername()));
    }

    @PostMapping("/preferences")
    public ResponseEntity<Void> updateMatchingProfilePreferences(@RequestBody @Valid MatchingProfilePreferencesDto preferences, @AuthenticationPrincipal UserDetails userDetails) {
        matchingProfileService.updateMatchingProfilePreferences(preferences, userDetails.getUsername());
        return ResponseEntity.ok().build();
    }

    @DeleteMapping()
    public void deleteMatchingProfile(@AuthenticationPrincipal UserDetails userDetails) {
        matchingProfileService.deleteMatchingProfile(userDetails.getUsername());
    }
}
