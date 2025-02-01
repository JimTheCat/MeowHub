package meowhub.backend.profiles.controllers;

import lombok.RequiredArgsConstructor;
import meowhub.backend.profiles.dtos.ProfileDto;
import meowhub.backend.profiles.services.ProfileService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping(path ="/api/profiles")
@RequiredArgsConstructor
public class ProfileController {
    private final ProfileService profileService;

    @GetMapping("/{login}")
    public ResponseEntity<ProfileDto> getProfile(@PathVariable String login, @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(profileService.getProfile(login, userDetails.getUsername()));
    }

    @PostMapping
    public ResponseEntity<ProfileDto> updateProfile(@RequestParam String content, @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(profileService.updateProfile(content, userDetails.getUsername()));
    }

    @PostMapping("/pictures")
    public ResponseEntity<ProfileDto> addPictures(@RequestPart MultipartFile file, @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(profileService.addProfilePicture(file, userDetails.getUsername()));
    }

    @GetMapping("/{login}/media")
    public ResponseEntity<Page<String>> getUserMedia(@PathVariable String login, @AuthenticationPrincipal UserDetails userDetails, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(profileService.getUserMedia(login, userDetails.getUsername(), page, size));
    }
}
