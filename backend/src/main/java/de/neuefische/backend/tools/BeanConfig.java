package de.neuefische.backend.tools;

import com.cloudinary.Cloudinary;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BeanConfig {
/*
 @Value("${cloudinary.cloud-name}")
    private String cloudName;

    @Value("${cloudinary.api-key}")
    private String apiKey;

    @Value("${cloudinary.api-secret}")
    private String apiSecret;

*/




    @Bean
    public Cloudinary createCloudinary() {
       /* System.out.println("cloudName: " + cloudName);
        System.out.println("apiKey: " + apiKey);
        System.out.println("apiSecret: " + apiSecret);
        String cloudinaryURL = "cloudinary://" + apiKey + ":" + apiSecret + "@" + cloudName;
        System.out.println(cloudinaryURL);*/
        return new Cloudinary("cloudinary://874954522191928:ShX5F8UmxTlDReVzoy1g-uPWUx0@dfqf2lyug");
    }
}