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

    private @NonNull String name;
    private @NonNull String location;
    private @NonNull Category category;

}
