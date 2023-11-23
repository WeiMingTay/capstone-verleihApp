package de.neuefische.backend.tools;


import de.neuefische.backend.user.UserProfile;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;


@Data
@AllArgsConstructor

public class NewTool {

    private String name;
    private List<Category> categories;
    private String author;
    private String location;
    private String description;
    private String timestamp;
    private UserProfile user;



}
