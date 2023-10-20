package de.neuefische.backend.tools;

import lombok.AllArgsConstructor;
import lombok.Data;


@Data
@AllArgsConstructor
public class NewTool {

    private String name;
    private Category category;
    private String location;


}
