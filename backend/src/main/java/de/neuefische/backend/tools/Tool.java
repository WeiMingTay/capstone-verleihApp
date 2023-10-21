package de.neuefische.backend.tools;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document
public class Tool {
    private String id;
    private @NonNull String name;
    private @NonNull Category category;
    private String author;
    private @NonNull String location;
    private String description;


    public Tool(@NonNull String name, @NonNull Category category, @NonNull String location) {
        this.name = name;
        this.category = category;
        this.location = location;

    }
}
