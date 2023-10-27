package de.neuefische.backend.tools;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;
import org.springframework.web.multipart.MultipartFile;


@Data
@AllArgsConstructor
public class NewTool {

    private String name;
    private MultipartFile imageFile;
    private String image;
    private List<Category> categories;
    private String author;
    private String location;
    private String description;
    private String timestamp;


}
