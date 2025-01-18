package meowhub.backend.ext.oci;

import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

import java.util.logging.Logger;

@Service
@Profile("mock-oci")
public class MockOCIDeleteService extends OCIDeleteService {
    Logger logger = Logger.getLogger(getClass().getName());

    @Override
    public void delete(String objectName) throws Exception {
        logger.info("Mock delete: " + objectName);
    }
}
