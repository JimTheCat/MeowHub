package meowhub.backend.ext.oci;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

@Service
@Profile("mock-oci")
@Slf4j
public class MockOCIDeleteService extends OCIDeleteService {

    @Override
    public void delete(String objectName) throws Exception {
        log.info("Mock delete: {}", objectName);
    }
}
