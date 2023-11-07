package de.neuefische.backend.tools;

import com.cloudinary.Cloudinary;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ToolsController {

    private final ToolsService toolsService;

    private final Cloudinary cloudinary;

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
    public Tool createTool(
            @RequestPart("data") NewTool newTool,
            @RequestPart(name = "file", required = false) MultipartFile image) throws Exception {
        return toolsService.createTool(newTool, image);

    }


    // === DELETE ===
    @DeleteMapping("/tools/{id}")
    public ResponseEntity<String> deleteToolById(@PathVariable String id) {
        return toolsService.deleteToolById(id);
    }


    // === Exception Handling ===

    @ExceptionHandler(NoSuchElementException.class)
    public String handleNoSuchElementException() {
        return "Die ID gibt es leider nicht";
    }

    @ExceptionHandler(NullPointerException.class)
    public String handleNullPointerException() {
        return "Elemente können nicht null sein!";
    }

}
