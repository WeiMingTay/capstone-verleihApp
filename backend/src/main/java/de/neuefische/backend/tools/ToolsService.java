package de.neuefische.backend.tools;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;


@Service
@RequiredArgsConstructor
public class ToolsService {

    private final ToolsRepository toolsRepository;

    // === GET ===
    public List<Tool> getAllTools() {
        return toolsRepository.findAll();
    }

    public Tool getToolById(String id) throws NoSuchElementException {
        return toolsRepository.findById(id).orElseThrow();
    }

    // === POST ===
    public Tool createTool(NewTool newTool) {
        Tool tool = new Tool();
        tool.setName(newTool.getName());
        tool.setCategory(newTool.getCategory());
        tool.setLocation(newTool.getLocation());
        tool.setAuthor(newTool.getAuthor());
        tool.setDescription(newTool.getDescription());

        return toolsRepository.save(tool);
    }

    // === DELETE ===
    public String deleteToolById(String id) {

        if(toolsRepository.existsById(id)) {
            toolsRepository.deleteById(id);
            return "Tool with id: " + id + " was deleted.";
        }

        return "die ID '" + id + "' existiert nicht!";
    }
}
