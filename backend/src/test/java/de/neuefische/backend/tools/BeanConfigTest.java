package de.neuefische.backend.tools;

import com.cloudinary.Cloudinary;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest(classes = BeanConfig.class)
@TestPropertySource(properties = {
        "cloudinary.cloud-name=test-cloud-name",
        "cloudinary.api-key=test-api-key",
        "cloudinary.api-secret=test-api-secret"
})
class BeanConfigTest {

    @Autowired
    private Cloudinary cloudinary;

    @Test
    void createCloudinary_shouldReturnCloudinaryInstance() {
        assertNotNull(cloudinary);
    }
}
