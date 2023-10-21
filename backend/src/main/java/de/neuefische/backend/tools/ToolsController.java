package de.neuefische.backend.tools;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ToolsController {

    private final ToolsService toolsService;

    @GetMapping("/tools")
    public List<Tool> getAllTools() {
        return toolsService.getAllTools();
    }

    @PostMapping("/tools/add")
    public Tool createTool(@RequestBody NewTool newTool) {
        return toolsService.createTool(newTool);
    }


    @ExceptionHandler(NullPointerException.class)
    public String handleNullPointerException() {
        return "Elemente können nicht null sein!";
    }
}
