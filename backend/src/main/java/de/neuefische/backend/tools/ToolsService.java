package de.neuefische.backend.tools;


import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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
    public Tool createTool(NewTool newTool, MultipartFile image) throws Exception {
        Tool tool = new Tool();
        tool.setName(newTool.getName());

        tool.setCategories(newTool.getCategories());
        tool.setLocation(newTool.getLocation());
        tool.setAuthor(newTool.getAuthor());
        tool.setDescription(newTool.getDescription());
        tool.setTimestamp(newTool.getTimestamp());

        if (image != null) {
            String url = cloudinaryService.uploadImage(image);
            tool.withImage(url);
        }

            return toolsRepository.save(tool);
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
