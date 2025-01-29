package meowhub.backend.shared.utils;

import lombok.RequiredArgsConstructor;
import meowhub.backend.ext.oci.OCIDeleteService;
import meowhub.backend.ext.oci.OCIUploadService;
import meowhub.backend.shared.constants.Modules;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.apache.commons.io.FilenameUtils;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PictureUtils {
    private final OCIUploadService ociUploadService;
    private final OCIDeleteService ociDeleteService;

    /**
     * Uploads picture to OCI and returns the name of the file and the authorized URL to access it
     * @param file file to upload
     * @param login login of the user
     * @return Pair with the name of the file and the authorized URL to access it
     */
    public Pair<String, String> uploadPictureToOCIAndGetAuthorizedUrlToAccessIt(MultipartFile file, String login, Modules module) {
        try {
            Pair<String, String> nameAndUrl;
            String newFileName = login + "/" + module.name() + "/" + UUID.randomUUID() + "." + FilenameUtils.getExtension(file.getOriginalFilename());
            ociUploadService.upload(file, newFileName);

            String url = ociUploadService.getFileObjectUrl(newFileName);
            nameAndUrl = Pair.of(newFileName, url);
            return nameAndUrl;
        } catch (Exception e) {
            throw new RuntimeException("Error while uploading picture to OCI");
        }
    }

    /**
     * Deletes picture from OCI
     * @param objectName name of the file to delete
     */
    public void deletePictureFromOCI(String objectName){
        try {
            ociDeleteService.delete(objectName);
        } catch (Exception e) {
            throw new RuntimeException("Error while deleting picture from OCI");
        }
    }
}
