package meowhub.backend.matching.controllers;

import lombok.RequiredArgsConstructor;
import meowhub.backend.matching.services.MatchingProfilePictureService;
import meowhub.backend.shared.dtos.PictureDto;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/matching-profile-picture")
@RequiredArgsConstructor
public class MatchingProfilePictureController {
    private final MatchingProfilePictureService matchingProfilePictureService;

    @PostMapping()
    public ResponseEntity<PictureDto> addPicture(@RequestPart MultipartFile file, @RequestPart String pictureIndex, @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(matchingProfilePictureService.addMatchingProfilePicture(file, Long.valueOf(pictureIndex), userDetails.getUsername()));
    }

    @PostMapping("/indexes")
    public ResponseEntity<List<PictureDto>> setIndexes(@RequestBody Map<String, Long> pictureIndexes, @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(matchingProfilePictureService.setIndexes(pictureIndexes, userDetails.getUsername()));
    }

    @DeleteMapping("/{pictureId}")
    public void deletePicture(@PathVariable("pictureId") String pictureId, @AuthenticationPrincipal UserDetails userDetails) {
        matchingProfilePictureService.deleteMatchingProfilePictureForUser(pictureId, userDetails.getUsername());
    }

    //-------------------------------------------------------------------------------- UNUSED --------------------------------------------------------------------------------
    @PostMapping("/pictures")
    @Deprecated(forRemoval = true)
    public ResponseEntity<List<PictureDto>> addMatchingProfilePictures(@RequestPart List<MultipartFile> files, @RequestPart(required = false) String profilePictureName, @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(matchingProfilePictureService.addMatchingProfilePictures(files, profilePictureName, userDetails.getUsername()));
    }

    @DeleteMapping("/pictures")
    @Deprecated(forRemoval = true)
    public void deleteMatchingProfilePicture(@RequestBody List<String> pictureIds, @AuthenticationPrincipal UserDetails userDetails) {
        matchingProfilePictureService.deleteMatchingProfilePicturesForUser(pictureIds, userDetails.getUsername());
    }
}
