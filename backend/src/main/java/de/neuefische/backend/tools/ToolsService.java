package de.neuefische.backend.tools;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class ToolsService {

    private final ToolsRepository toolsRepository;

    public Tool createTool(Tool tool) {

        return toolsRepository.save(tool);
    }
}
