package meowhub.backend.matching.controllers;

import lombok.AllArgsConstructor;
import meowhub.backend.matching.dtos.UpdateMatchingProfileRequestDto;
import meowhub.backend.matching.dtos.MatchingProfileDto;
import meowhub.backend.matching.services.MatchingProfileService;
import meowhub.backend.shared.dtos.PictureDto;
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
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/matching-profile")
@AllArgsConstructor
public class MatchingProfileController {
    private final MatchingProfileService matchingProfileService;

    @GetMapping("")
    public ResponseEntity<MatchingProfileDto> getMyMatchingProfile(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(matchingProfileService.getMyProfile(userDetails.getUsername()));
    }

    @PostMapping("/update")
    public ResponseEntity<MatchingProfileDto> updateMatchingProfile(@RequestBody UpdateMatchingProfileRequestDto matchingProfileDto, @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(matchingProfileService.updateMatchingProfile(matchingProfileDto, userDetails.getUsername()));
    }

    @PostMapping("/pictures")
    public ResponseEntity<List<PictureDto>> addMatchingProfilePictures(@RequestPart List<MultipartFile> files, @RequestPart(required = false) String profilePictureName, @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(matchingProfileService.addMatchingProfilePictures(files, profilePictureName, userDetails.getUsername()));
    }

    @PostMapping("/create")
    public ResponseEntity<MatchingProfileDto> createMatchingProfileFromScratch(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(matchingProfileService.createMatchingProfile(userDetails.getUsername()));
    }

    @GetMapping("/all")
    public ResponseEntity<Page<MatchingProfileDto>> getAllMatchingProfiles(Pageable pageable) {
        return ResponseEntity.ok(matchingProfileService.getAllMatchingProfiles(pageable));
    }

    @DeleteMapping()
    public void deleteMatchingProfile(@AuthenticationPrincipal UserDetails userDetails) {
        matchingProfileService.deleteMatchingProfile(userDetails.getUsername());
    }

    @DeleteMapping("/pictures")
    public void deleteMatchingProfilePicture(@RequestBody List<String> pictureIds, @AuthenticationPrincipal UserDetails userDetails) {
        matchingProfileService.deleteMatchingProfilePicturesForUser(pictureIds, userDetails.getUsername());
    }

}
