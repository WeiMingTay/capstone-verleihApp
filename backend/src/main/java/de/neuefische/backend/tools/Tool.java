package de.neuefische.backend.tools;


import de.neuefische.backend.user.UserProfile;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document
public class Tool {
    private String id;
    private @NonNull String name;
    @With
    private String image;
    private @NonNull List<Category> categories;
    private String author;
    private @NonNull String location;
    private String description;
    private String timestamp;
    private UserProfile user;


    public Tool(@NonNull String name, String image, @NonNull List<Category> categories, String author, @NonNull String location, String description, String timestamp, UserProfile user) {

        this.name = name;
        this.image = image;
        this.categories = categories;
        this.author = author;
        this.location = location;
        this.description = description;
        this.timestamp = timestamp;
        this.user = user;
    }


}
