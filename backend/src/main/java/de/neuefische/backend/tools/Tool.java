package de.neuefische.backend.tools;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document
public class Tool {
    private String id;
    private @NonNull String name;
    private String image;
    private @NonNull List<Category> categories;
    private String author;
    private @NonNull String location;
    private String description;
    private String timestamp;



    public Tool(@NonNull String name, @NonNull List<Category> categories, @NonNull String location) {
        this.name = name;
        this.categories = categories;
        this.location = location;
            }

    public Tool(String id, @NonNull String name, @NonNull List<Category> categories, @NonNull String location) {
        this.id = id;
        this.name = name;
        this.categories = categories;
        this.location = location;

    }

    public Tool(@NonNull String name, @NonNull List<Category> categories, String author, @NonNull String location, String description, String timestamp) {
        this.name = name;
        this.categories = categories;
        this.author = author;
        this.location = location;
        this.description = description;
        this.timestamp = timestamp;
    }

}
