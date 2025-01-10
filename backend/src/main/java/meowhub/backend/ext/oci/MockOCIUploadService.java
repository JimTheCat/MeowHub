package meowhub.backend.ext.oci;

import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.logging.Logger;

@Service
@Profile("mock-oci")
public class MockOCIUploadService extends OCIUploadService {
    Logger logger = Logger.getLogger(getClass().getName());

    @Override
    public void upload(MultipartFile file, String objectName) throws Exception {
        logger.info("Mock upload: %s" + objectName);
    }

    @Override
    public String getFileObjectUrl(String objectName) throws Exception {
        return "https://mock-oci-url.com/" + objectName;
    }
}
