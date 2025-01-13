package meowhub.backend.ext.oci;

import com.oracle.bmc.objectstorage.requests.DeleteObjectRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

@Service
@Primary
public class OCIDeleteService {
    @Autowired
    private OCIClientConfiguration configuration;

    @Value("${oci.objectstorage.bucket-name}")
    private String bucketName;

    @Value("${oci.objectstorage.namespaceName}")
    private String namespaceName;

    public void delete(String objectName) throws Exception {
        try {
            configuration.getObjectStorage().deleteObject(DeleteObjectRequest.builder()
                    .namespaceName(namespaceName)
                    .bucketName(bucketName)
                    .objectName(objectName)
                    .build());
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        } finally {
            configuration.getObjectStorage().close();
        }
    }
}
