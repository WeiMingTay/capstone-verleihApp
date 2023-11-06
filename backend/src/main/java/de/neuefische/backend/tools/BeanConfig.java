package de.neuefische.backend.tools;

import com.cloudinary.Cloudinary;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BeanConfig {
/*    @Value("${cloudinary.cloud-name}")
    private String cloudName;

    @Value("${cloudinary.api-key}")
    private String apiKey;

    @Value("${cloudinary.api-secret}")
    private String apiSecret;*/
    @Bean
    public Cloudinary createCloudinary() {
        return new Cloudinary("cloudinary://" + "874954522191928" + ":" + "ShX5F8UmxTlDReVzoy1g-uPWUx0" + "@" + "dfqf2lyug");
    }
}