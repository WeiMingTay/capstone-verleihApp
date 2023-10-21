package de.neuefische.backend.tools;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ToolsController {

    private final ToolsService toolsService;

    // === GET ===
    @GetMapping("/tools")
    public List<Tool> getAllTools() {
        return toolsService.getAllTools();
    }

    @GetMapping("/tools/{id}")
    public Tool getToolById(@PathVariable String id) throws NoSuchElementException {
        return toolsService.getToolById(id);
    }
    // === POST ===
    @PostMapping("/tools/add")
    public Tool createTool(@RequestBody NewTool newTool) {
        return toolsService.createTool(newTool);
    }

    // === Exception Handling ===
    @ExceptionHandler(NullPointerException.class)
    public String handleNullPointerException() {
        return "Elemente können nicht null sein!";
    }
}
