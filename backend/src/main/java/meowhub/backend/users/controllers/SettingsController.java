package meowhub.backend.users.controllers;

import lombok.RequiredArgsConstructor;
import meowhub.backend.constants.PrivacySettings;
import meowhub.backend.users.services.SettingsService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/settings")
@RequiredArgsConstructor
public class SettingsController {
    private final SettingsService settingsService;

    @PostMapping("/post-privacy")
    public ResponseEntity<Void> postPrivacySettings(PrivacySettings privacySettings, @AuthenticationPrincipal UserDetails userDetails) {
        settingsService.changePostPrivacySettings(privacySettings, userDetails.getUsername());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/profile-privacy")
    public ResponseEntity<Void> profilePrivacySettings(PrivacySettings privacySettings, @AuthenticationPrincipal UserDetails userDetails) {
        settingsService.changeProfilePrivacySettings(privacySettings, userDetails.getUsername());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/friends-privacy")
    public ResponseEntity<Void> friendsPrivacySettings(PrivacySettings privacySettings, @AuthenticationPrincipal UserDetails userDetails) {
        settingsService.changeFriendsPrivacySettings(privacySettings, userDetails.getUsername());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/change-password")
    public ResponseEntity<Void> changePassword(String newPassword, @AuthenticationPrincipal UserDetails userDetails) {
        settingsService.changePassword(newPassword, userDetails.getUsername());
        return ResponseEntity.ok().build();
    }
}
