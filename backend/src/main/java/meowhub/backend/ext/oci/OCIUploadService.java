package meowhub.backend.ext.oci;

import com.oracle.bmc.objectstorage.model.CreatePreauthenticatedRequestDetails;
import com.oracle.bmc.objectstorage.model.PreauthenticatedRequest.BucketListingAction;
import com.oracle.bmc.objectstorage.requests.CreatePreauthenticatedRequestRequest;
import com.oracle.bmc.objectstorage.requests.PutObjectRequest;
import com.oracle.bmc.objectstorage.responses.CreatePreauthenticatedRequestResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.time.OffsetDateTime;
import java.util.Date;
import java.util.UUID;

@Service
@Primary
public class OCIUploadService {
    private static final String urlPrefix = "https://objectstorage.eu-frankfurt-1.oraclecloud.com";

    @Autowired
    private OCIClientConfiguration configuration;

    @Value("${oci.objectstorage.bucket-name}")
    private String bucketName;

    @Value("${oci.objectstorage.namespaceName}")
    private String namespaceName;


    public void upload(MultipartFile file, String objectName) throws Exception {
        InputStream inputStream = file.getInputStream();

        //build upload request
        PutObjectRequest putObjectRequest =
                PutObjectRequest.builder()
                        .namespaceName(namespaceName)
                        .bucketName(bucketName)
                        .objectName(objectName)
                        .contentLength(file.getSize())
                        .putObjectBody(inputStream)
                        .build();
    
        //upload the file
        try {
            configuration.getObjectStorage().putObject(putObjectRequest);
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }finally{
            configuration.getObjectStorage().close();
        }    
    }

    public String getFileObjectUrl(String objectName) throws Exception{
        OffsetDateTime expirationTime = OffsetDateTime.now().plusYears(10);

        // Build request details
        CreatePreauthenticatedRequestDetails createPreauthenticatedRequestDetails = CreatePreauthenticatedRequestDetails.builder()
            .name("OCI_Request")
            .bucketListingAction(BucketListingAction.Deny)
            .objectName(objectName)
            //readonly access
            .accessType(CreatePreauthenticatedRequestDetails.AccessType.ObjectRead)
            //here we set expiration time for
            .timeExpires(Date.from(expirationTime.toInstant())).build();

        //Build request
        CreatePreauthenticatedRequestRequest createPreauthenticatedRequestRequest = CreatePreauthenticatedRequestRequest.builder()
            .namespaceName(namespaceName)
            .bucketName(bucketName)
            .createPreauthenticatedRequestDetails(createPreauthenticatedRequestDetails)
            .opcClientRequestId(UUID.randomUUID().toString()).build();

            // send request to oci
        CreatePreauthenticatedRequestResponse response = configuration.getObjectStorage().createPreauthenticatedRequest(createPreauthenticatedRequestRequest);
        configuration.getObjectStorage().close();

        String accessUri = response.getPreauthenticatedRequest().getAccessUri();

        return urlPrefix + accessUri;
    }
}