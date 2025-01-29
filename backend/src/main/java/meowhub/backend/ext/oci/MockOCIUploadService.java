package meowhub.backend.ext.oci;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Service
@Profile("mock-oci")
public class MockOCIUploadService extends OCIUploadService {
    @Override
    public void upload(MultipartFile file, String objectName) throws Exception {
        log.info("Mock upload: {}", objectName);
    }

    @Override
    public String getFileObjectUrl(String objectName) throws Exception {
        return "https://mock-oci-url.com/" + objectName;
    }
}
