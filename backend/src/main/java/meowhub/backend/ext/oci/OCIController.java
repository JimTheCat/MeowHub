package meowhub.backend.ext.oci;

import jakarta.annotation.security.RolesAllowed;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("api/ext")
@Deprecated(since = "only to test connection with OCI Object Storage. Otherwise - don't use!!!", forRemoval = true)
@RolesAllowed("ROLE_ADMIN")
public class OCIController {
    private static final String urlPrefix = "https://objectstorage.eu-frankfurt-1.oraclecloud.com";

    @Autowired
    private OCIUploadService ociUploadService;

    @PostMapping(path = "upload")
    public ResponseEntity<Object> uploadFile(@RequestParam("file") MultipartFile file){
        try {
            ociUploadService.upload(file, "TEST/"+file.getOriginalFilename());
            return ResponseEntity.ok().body("Uploaded File : "+file.getOriginalFilename());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @GetMapping(path = "file/{fileName}")
    public ResponseEntity<Object> getURl(@PathVariable(value = "fileName") String fileName){
        try {
            return ResponseEntity.ok().body(ociUploadService.getFileObjectUrl(fileName));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }
}
