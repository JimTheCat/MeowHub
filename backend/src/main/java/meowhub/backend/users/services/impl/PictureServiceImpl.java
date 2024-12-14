package meowhub.backend.users.services.impl;

import meowhub.backend.users.models.Picture;
import meowhub.backend.users.services.PictureService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;

@Service
public class PictureServiceImpl implements PictureService {

    public String getPictureBase64(byte[] pictureBytes) {
        return Base64.getEncoder().encodeToString(pictureBytes);
    }

    public Picture getImageFromMultipartFile(MultipartFile file) {
        try {
            byte[] imageBytes = file.getBytes();
            Picture picture = new Picture();
            picture.setPicture(imageBytes);
            return picture;
        } catch (IOException e) {
            throw new RuntimeException("Error while reading image from file", e);
        }
    }
}
