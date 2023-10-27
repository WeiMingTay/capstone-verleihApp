package de.neuefische.backend.tools;

import com.cloudinary.Cloudinary;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;


import java.util.List;
import java.util.Map;
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
    @PostMapping("/tools/add/imageUpload")
    public ResponseEntity<String> uploadImage(@RequestParam("image") MultipartFile image) {
        if (image != null) {
            try {
                Map<String, String> cloudinaryResult = cloudinary.uploader().upload(image.getBytes(), ObjectUtils.emptyMap());
                String imageUrl = cloudinaryResult.get("url");

                return ResponseEntity.ok(imageUrl);
            } catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity.badRequest().body("Image upload failed: " + e.getMessage());
            }
        } else {
            return ResponseEntity.badRequest().body("Image is missing");
        }
    }


    @PostMapping("/tools/add")
    public Tool createTool(@RequestBody NewTool newTool) {
        try {
            ResponseEntity<String> imageResponse = uploadImage(newTool.getImageFile());
            String imageUrl = imageResponse.getBody();

            newTool.setImage(imageUrl);

            return toolsService.createTool(newTool);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
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
