package de.neuefische.backend.tools;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/tools")
@RequiredArgsConstructor
public class ToolsController {

    private final ToolsService toolsService;

    @PostMapping("/add")
    public Tool createTool(@RequestBody NewTool newTool) {
        return toolsService.createTool(newTool);
    }
}
