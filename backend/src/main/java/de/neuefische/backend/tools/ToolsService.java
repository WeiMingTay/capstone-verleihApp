package de.neuefische.backend.tools;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class ToolsService {

    private final ToolsRepository toolsRepository;

    public Tool createTool(NewTool newTool) {
        Tool tool = new Tool();
        tool.setName(newTool.getName());
        tool.setCategory(newTool.getCategory());
        tool.setLocation(newTool.getLocation());


        return toolsRepository.save(tool);
    }
}
