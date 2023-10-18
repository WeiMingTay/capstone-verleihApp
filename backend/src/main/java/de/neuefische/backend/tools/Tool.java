package de.neuefische.backend.tools;

import lombok.With;

public record Tool(
        @With
        String id,
        String name,
        String location
/*        String image,
        Category category,
        String user,

        String description,
        String author*/
) {
}
