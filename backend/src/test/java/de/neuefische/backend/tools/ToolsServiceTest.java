package de.neuefische.backend.tools;

import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ToolsServiceTest {

    ToolsRepository toolsRepository = mock(ToolsRepository.class);
    ToolsService toolsService = new ToolsService(toolsRepository);

    Tool tool1 = new Tool(
            "Hammer",
            Category.TOOLS,
            "Dim Sum",
            "Keller",
            "Bla Bla");
    Tool toolId = new Tool(
            "65317b1294a88f39ea92a61a",
            "Hammer",
            Category.TOOLS,
            "Keller");

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
        assertNull(tool.getCategory());
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
        Category category = Category.TOOLS;
        String location = "Keller";

        // WHEN
        Tool tool = new Tool(id, name, category, location);

        // THEN
        assertNotNull(tool);
        assertEquals(id, tool.getId());
        assertEquals(name, tool.getName());
        assertNull(tool.getImage());
        assertEquals(category, tool.getCategory());
        assertNull(tool.getAuthor());
        assertEquals(location, tool.getLocation());
        assertNull(tool.getDescription());
        assertNull(tool.getTimestamp());
    }

    @Test
    void testConstructorWithNameCategoryLocationDiscription() {
        // GIVEN
        String name = "Hammer";
        Category category = Category.TOOLS;
        String author = "Dim Sum";
        String location = "Keller";
        String description = "Bla Bla";

        // WHEN
        Tool tool = new Tool(name, category, author, location, description);

        // THEN
        assertNotNull(tool);
        assertNull(tool.getId());
        assertEquals(name, tool.getName());
        assertNull(tool.getImage());
        assertEquals(category, tool.getCategory());
        assertEquals(author, tool.getAuthor());
        assertEquals(location, tool.getLocation());
        assertEquals(description, tool.getDescription());
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
                Category.TOOLS,
                "Dim Sum",
                "Keller",
                "Bla Bla"
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
                Category.TOOLS,
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
    void createTool_expectCreatedToolObject() {
        //GIVEN
        Tool tool = tool1;
        NewTool newTool = new NewTool(
                "Hammer",
                Category.TOOLS,
                "Dim Sum",
                "Keller",
                "Bla Bla"
        );

        //WHEN
        when(toolsRepository.save(tool)).thenReturn(tool);
        Tool actual = toolsService.createTool(newTool);
        //THEN

        Tool expected = new Tool(
                "Hammer",
                Category.TOOLS,
                "Dim Sum",
                "Keller",
                "Bla Bla"
        );
        verify(toolsRepository).save(expected);
        assertEquals(expected, actual);
    }

    @Test
    void createToolWithWrongId_expectWrongArgument() {
        //GIVEN
        Tool tool = tool1;
        NewTool newTool = new NewTool(
                "Hammer",
                Category.TOOLS,
                "Dim Sum",
                "Keller",
                "Bla Bla"
        );

        //WHEN
        Tool unexpected = new Tool("Bohrmaschine", Category.TOOLS, "Keller");
        when(toolsRepository.save(tool)).thenReturn(unexpected);
        Tool actual = toolsService.createTool(newTool);
        //THEN

        Tool expected = new Tool(
                "Hammer",
                Category.TOOLS,
                "Dim Sum",
                "Keller",
                "Bla Bla"
        );
        verify(toolsRepository).save(expected);
        assertNotEquals(expected, actual);
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

        // WHEN
        when(toolsRepository.existsById(id)).thenReturn(false);
        toolsRepository.deleteById(id);
        String actual = toolsService.deleteToolById(id);
        String expected = "die ID '" + id + "' existiert nicht!";

        // THEN
        verify(toolsRepository, times(1)).deleteById(id);
        assertEquals(expected, actual);
    }
}