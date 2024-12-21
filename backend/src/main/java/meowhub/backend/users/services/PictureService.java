package meowhub.backend.users.services;

import meowhub.backend.users.models.Picture;
import org.springframework.web.multipart.MultipartFile;

public interface PictureService {
    String getPictureBase64(byte[] pictureBytes);

    Picture getImageFromMultipartFile(MultipartFile file);
}
