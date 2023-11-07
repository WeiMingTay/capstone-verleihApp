package de.neuefische.backend.tools;


import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;


@Service
@RequiredArgsConstructor
public class ToolsService {

    private final ToolsRepository toolsRepository;
    private final CloudinaryService cloudinaryService;

    // === GET ===
    public List<Tool> getAllTools() {
        return toolsRepository.findAll();
    }

    public Tool getToolById(String id) throws NoSuchElementException {
        return toolsRepository.findById(id).orElseThrow();
    }

    // === POST ===
    public Tool createTool(NewTool newTool, MultipartFile image) throws IOException {

        String url = null;
        if (image != null) {
            url = cloudinaryService.uploadImage(image);
        }

        Tool toolToSave = new Tool(
                null,
                newTool.getName(),
                url,
                newTool.getCategories(),
                newTool.getAuthor(),
                newTool.getLocation(),
                newTool.getDescription(),
                newTool.getTimestamp()
        );

        return toolsRepository.save(toolToSave);
    }

    // === DELETE ===
    public ResponseEntity<String> deleteToolById(String id) {
        if (toolsRepository.existsById(id)) {
            toolsRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).body("Tool with id: " + id + " was deleted.");
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Die ID '" + id + "' existiert nicht!");
    }

}
