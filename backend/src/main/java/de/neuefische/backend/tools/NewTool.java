package de.neuefische.backend.tools;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class NewTool {

        private String name;
        private String location;
        private Category category;
}
