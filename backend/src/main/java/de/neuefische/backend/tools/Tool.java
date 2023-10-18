package de.neuefische.backend.tools;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class Tool {
    private String id;
    private String name;
    private String location;

    private String image;
    private Category category;
    private String user;
    private String description;
    private String author;


    //CONSTRUCTOR

    public Tool(String id, String name, String location) {
        this.id = id;
        this.name = name;
        this.location = location;
    }
}
