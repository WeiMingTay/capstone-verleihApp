package de.neuefische.backend.tools;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@Document
public class Tool {

    private String name;
    private String location;
    private Category category;


    public Tool() {

    }
}
