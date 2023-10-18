package de.neuefische.backend.tools;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ToolsService {

    private final ToolRepository toolRepository;

    public Tool createTool(Tool tool) {
        String id = UUID.randomUUID().toString();
        Tool toolToSave = tool.withId(id);

        return toolRepository.save(toolToSave);
    }
}
