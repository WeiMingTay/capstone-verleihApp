package de.neuefische.backend.tools;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tools")
@RequiredArgsConstructor
public class ToolsController {

    private final ToolsService toolsService;

    @PostMapping("/add")
    public Tool createTool(@RequestBody NewTool newTool) {
        return toolsService.createTool(newTool);
    }



@ExceptionHandler(NullPointerException.class)
    public String handleNullPointerException() {
        return "Elemente können nicht null sein!";
    }
}
