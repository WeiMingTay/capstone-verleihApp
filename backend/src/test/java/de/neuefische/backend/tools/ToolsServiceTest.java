package de.neuefische.backend.tools;

import de.neuefische.backend.user.UserProfile;
import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;

import java.io.IOException;
import java.util.*;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ToolsServiceTest {

    ToolsRepository toolsRepository = mock(ToolsRepository.class);
    CloudinaryService cloudinaryService = mock(CloudinaryService.class);
    ToolsService toolsService = new ToolsService(toolsRepository, cloudinaryService);
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
    void createToolWithAllParameters_shouldCreateToolInstance() {
        // Given
        String name = "Test Tool";
        String image = "test-image.jpg";
        List<Category> categories = List.of(Category.ELECTRONICS);
        String author = "John Doe";
        String location = "Test Location";
        String description = "Test Description";
        String timestamp = "2023-01-01T12:00:00";
        UserProfile user = new UserProfile("123", "John Doe", "https://example.com/avatar.jpg", "john.doe@example.com");

        // When
        Tool tool = new Tool(name, image, categories, author, location, description, timestamp, user);

        // Then
        assertThat(tool).isNotNull();
        assertThat(tool.getName()).isEqualTo(name);
        assertThat(tool.getImage()).isEqualTo(image);
        assertThat(tool.getCategories()).isEqualTo(categories);
        assertThat(tool.getAuthor()).isEqualTo(author);
        assertThat(tool.getLocation()).isEqualTo(location);
        assertThat(tool.getDescription()).isEqualTo(description);
        assertThat(tool.getTimestamp()).isEqualTo(timestamp);
        assertThat(tool.getUser()).isEqualTo(user);
    }

    @Test
    void createToolWithRequiredParameters_shouldCreateToolInstance() {
        // Given
        String name = "Test Tool";
        List<Category> categories = List.of(Category.ELECTRONICS);
        String location = "Test Location";
        UserProfile user = new UserProfile("123", "John Doe", "https://example.com/avatar.jpg", "john.doe@example.com");

        // When
        Tool tool = new Tool(name, null, categories, null, location, null, null, user);

        // Then
        assertThat(tool).isNotNull();
        assertThat(tool.getName()).isEqualTo(name);
        assertThat(tool.getImage()).isNull();
        assertThat(tool.getCategories()).isEqualTo(categories);
        assertThat(tool.getAuthor()).isNull();
        assertThat(tool.getLocation()).isEqualTo(location);
        assertThat(tool.getDescription()).isNull();
        assertThat(tool.getTimestamp()).isNull();
        assertThat(tool.getUser()).isEqualTo(user);
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
                "image.jpg",
                Collections.singletonList(Category.TOOLS),
                "Dim Sum",
                "Keller",
                "Bla Bla",
                "25.10.2021",
                userProfile
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
                "image.jpg",
                Collections.singletonList(Category.TOOLS),
                "Dim Sum",
                "Keller",
                "Bla Bla",
                "25.10.2021",
                userProfile
        );

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
                "25.10.2021",
                userProfile
        );

        //WHEN
        when(toolsRepository.save(tool)).thenReturn(tool);
        when(cloudinaryService.uploadImage(imageFile)).thenReturn("image.jpg");
        Tool actual = toolsService.createTool(newTool, imageFile);
        //THEN

        Tool expected = new Tool(
                "Hammer",
                "image.jpg",
                Collections.singletonList(Category.TOOLS),
                "Dim Sum",
                "Keller",
                "Bla Bla",
                "25.10.2021",
                userProfile
        );
        verify(toolsRepository).save(expected);
        assertEquals(expected, actual);
    }
    @Test
    void createToolWithInvalidInput_expectException() throws IOException {
        //GIVEN
        NewTool newTool = new NewTool(
                null,  // Name ist null, was ungültig sein könnte
                Collections.singletonList(Category.TOOLS),
                "Dim Sum",
                "Keller",
                "Bla Bla",
                "25.10.2021",
                userProfile
        );

        //WHEN / THEN
        assertThrows(NullPointerException.class, () -> {
            toolsService.createTool(newTool, imageFile);
        });
    }
    @Test
    void createToolWithWrongName_expectWrongArgument() throws IOException {
        //GIVEN
        Tool tool = tool1;
        NewTool newTool = new NewTool(
                "Hammer",
                Collections.singletonList(Category.TOOLS),
                "Dim Sum",
                "Keller",
                "Bla Bla",
                "25.10.2021",
                userProfile
        );

        //WHEN
        Tool unexpected = new Tool(
                "Bohrmaschine",
                "image.jpg",
                Collections.singletonList(Category.TOOLS),
                "Dim Sum",
                "Keller",
                "bla bla",
                "25.10.2021",
                userProfile
        );
        when(toolsRepository.save(tool)).thenReturn(unexpected);
        when(cloudinaryService.uploadImage(imageFile)).thenReturn("image.jpg");
        Tool actual = toolsService.createTool(newTool, imageFile);
        //THEN

        Tool expected = new Tool(
                "Hammer",
                "image.jpg",
                Collections.singletonList(Category.TOOLS),
                "Dim Sum",
                "Keller",
                "Bla Bla",
                "25.10.2021",
                userProfile
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
                toolId.getTimestamp(),
                toolId.getUser()
        );
        // WHEN
        when(toolsRepository.save(t1update)).thenReturn(t1update);
        Tool actual = toolsService.updateTool(toolId.getId(), t1update);

        // THEN
        Tool expected = new Tool(
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

        ToolsService toolsService = new ToolsService(toolsRepository, cloudinaryService);

        // WHEN
        ResponseEntity<String> responseEntity = toolsService.deleteToolById(id);
        String actual = responseEntity.getBody();
        String expected = "Die ID '" + id + "' existiert nicht!";

        // THEN
        assertEquals(expected, actual);
    }


}