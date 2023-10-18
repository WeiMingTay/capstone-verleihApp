package de.neuefische.backend.tools;

import lombok.With;

public record Tool(
        @With
        String id,
        String name,
        String image,
        Category category,
        String user,
        String location,
        String description,
        String author
) {
}
