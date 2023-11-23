package de.neuefische.backend.tools;

import de.neuefische.backend.user.UserProfile;
import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;

import java.io.IOException;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ToolsServiceTest {

    ToolsRepository toolsRepository = mock(ToolsRepository.class);
    CloudinaryService cloudinaaryService = mock(CloudinaryService.class);
    ToolsService toolsService = new ToolsService(toolsRepository, cloudinaaryService);
UserProfile userProfile = new UserProfile(
        "12345",
        "Dim Sum",
        "image.jpg",
        "mail@mail.de");
    Tool tool1 = new Tool(
            "Hammer",
            "image.jpg",
            Collections.singletonList(Category.TOOLS),
            "Dim Sum",
            "Keller",
            "Bla Bla",
            "25.10.2021",
            userProfile
    );
    Tool toolId = new Tool(
            "65317b1294a88f39ea92a61a",
            "Hammer",
            "image.jpg",
            Collections.singletonList(Category.TOOLS),
            "Dim Sum",
            "Keller",
            "Bla Bla",
            "25.10.2021",
            userProfile
    );


    MockMultipartFile imageFile = new MockMultipartFile("image", "image.jpg", "image/jpeg", new byte[]{});

    // === Constructor Tests ===
    @Test
    void testNoArgConstructor() {
        // GIVEN
        Tool tool = new Tool();

        // THEN
        assertNotNull(tool);
        assertNull(tool.getId());
        assertNull(tool.getName());
        assertNull(tool.getImage());
        assertNull(tool.getCategories());
        assertNull(tool.getAuthor());
        assertNull(tool.getLocation());
        assertNull(tool.getDescription());
        assertNull(tool.getTimestamp());
    }

    @Test
    void testConstructorWithIdNameCategoryLocation() {

        // GIVEN
        String id = "12345";
        String name = "Hammer";
        String image = "image.jpg";
        List<Category> categories = Collections.singletonList(Category.TOOLS);
        String author = "Dim Sum";
        String location = "Keller";
        String description = "Bla Bla";
        String timestamp = "25.10.2021";
        UserProfile user = userProfile;

        // WHEN
        Tool tool = new Tool(id, name, image, categories, author, location, description, timestamp, user);

        // THEN
        assertNotNull(tool);
        assertEquals(id, tool.getId());
        assertEquals(name, tool.getName());
        assertNull(tool.getImage());
        assertEquals(categories, tool.getCategories());
        assertNull(tool.getAuthor());
        assertEquals(location, tool.getLocation());
        assertNull(tool.getDescription());
        assertNull(tool.getTimestamp());
    }



    // === GETall ===

    @Test
    void getAllTools_expectOneTool() {
        // GIVEN
        List<Tool> toolList = new ArrayList<>();
        toolList.add(tool1);
        // toolList.add(new Tool("Bohrmaschine", Category.TOOLS, "Keller"));
        //WHEN
        when(toolsRepository.findAll()).thenReturn(toolList);
        List<Tool> actual = toolsService.getAllTools();

        //THEN
        List<Tool> expected = List.of(new Tool(
                "Hammer",
                Collections.singletonList(Category.TOOLS),
                "Dim Sum",
                "Keller",
                "Bla Bla",
                "25.10.2021"
        ));

        verify(toolsRepository).findAll();
        assertEquals(expected, actual);
    }

    @Test
    void getAllTools_expectEmptyList() {

        //GIVEN
        List<Tool> movieList = List.of();

        //WHEN
        when(toolsRepository.findAll()).thenReturn(movieList);
        List<Tool> actual = toolsService.getAllTools();

        //THEN
        List<Tool> expected = List.of();

        verify(toolsRepository).findAll();
        assertEquals(expected, actual);
    }

    // === GETbyID ===
    @Test
    void getToolById_expectHammer() {
        // GIVEN
        String id = toolId.getId();

        // WHEN
        when(toolsRepository.findById(id)).thenReturn(Optional.ofNullable(toolId));
        Tool actual = toolsService.getToolById(id);

        // THEN
        Tool expected = new Tool(
                "65317b1294a88f39ea92a61a",
                "Hammer",
                Collections.singletonList(Category.TOOLS),
                "Keller");

        verify(toolsRepository).findById(id);
        assertEquals(expected, actual);
    }

    @Test
    void getToolById_expectNoSuchElementException() {
        // GIVEN
        String id = "quatschId";

        // WHEN
        when(toolsRepository.findById(id)).thenReturn(Optional.empty());

        // THEN
        assertThrows(NoSuchElementException.class, () -> toolsService.getToolById(id));
    }

    // === POST newTool ===
    @Test
    void createTool_expectCreatedToolObject() throws IOException {
        //GIVEN
        Tool tool = tool1;
        NewTool newTool = new NewTool(
                "Hammer",

                Collections.singletonList(Category.TOOLS),
                "Dim Sum",

                "Keller",
                "Bla Bla",
                "25.10.2021"
        );

        //WHEN
        when(toolsRepository.save(tool)).thenReturn(tool);
        Tool actual = toolsService.createTool(newTool, imageFile);
        //THEN

        Tool expected = new Tool(
                "Hammer",
                Collections.singletonList(Category.TOOLS),
                "Dim Sum",
                "Keller",
                "Bla Bla",
                "25.10.2021"
        );
        verify(toolsRepository).save(expected);
        assertEquals(expected, actual);
    }

    @Test
    void createToolWithWrongId_expectWrongArgument() throws IOException {
        //GIVEN
        Tool tool = tool1;
        NewTool newTool = new NewTool(
                "Hammer",


                Collections.singletonList(Category.TOOLS),
                "Dim Sum",
                "Keller",
                "Bla Bla",
                "25.10.2021"
        );

        //WHEN
        Tool unexpected = new Tool("Bohrmaschine", Collections.singletonList(Category.TOOLS), "Keller");
        when(toolsRepository.save(tool)).thenReturn(unexpected);
        Tool actual = toolsService.createTool(newTool, imageFile);
        //THEN

        Tool expected = new Tool(
                "Hammer",
                Collections.singletonList(Category.TOOLS),
                "Dim Sum",
                "Keller",
                "Bla Bla",
                "25.10.2021"
        );
        verify(toolsRepository).save(expected);
        assertNotEquals(expected, actual);
    }

    // === PUT ===
    @Test
    void updateToolById_expectUpdatedToolObject() {
        // GIVEN
        Tool t1update = new Tool(
                toolId.getId(),
                toolId.getName(),
                toolId.getImage(),
                toolId.getCategories(),
                toolId.getAuthor(),
                toolId.getLocation(),
                toolId.getDescription(),
                toolId.getTimestamp()
        );
        // WHEN
        when(toolsRepository.save(t1update)).thenReturn(t1update);
        Tool actual = toolsService.updateTool(toolId.getId(), t1update);

        // THEN
        Tool expected = new Tool(
                "65317b1294a88f39ea92a61a",
                "Hammer",

                Collections.singletonList(Category.TOOLS),
                "Keller"

        );
        verify(toolsRepository).save(t1update);
        assertEquals(expected, actual);
    }

    // === DELETE ===
    @Test
    void deleteToolById_expect() {
        // GIVEN
        toolsRepository.save(toolId);
        String id = toolId.getId();

        // WHEN
        when(toolsRepository.existsById(id)).thenReturn(true);
        doNothing().when(toolsRepository).deleteById(id);
        toolsService.deleteToolById(id);

        // THEN
        verify(toolsRepository, times(1)).deleteById(id);
    }


    @Test
    void deleteToolById_expectNoSuchElementException() {
        // GIVEN
        String id = "quatschId";

        when(toolsRepository.existsById(id)).thenReturn(false);

        ToolsService toolsService = new ToolsService(toolsRepository, cloudinaaryService);

        // WHEN
        ResponseEntity<String> responseEntity = toolsService.deleteToolById(id);
        String actual = responseEntity.getBody();
        String expected = "Die ID '" + id + "' existiert nicht!";

        // THEN
        assertEquals(expected, actual);
    }


}