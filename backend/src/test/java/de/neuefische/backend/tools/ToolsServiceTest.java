package de.neuefische.backend.tools;

import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ToolsServiceTest {

    ToolsRepository toolsRepository = mock(ToolsRepository.class);
    ToolsService toolsService = new ToolsService(toolsRepository);

    Tool tool1 = new Tool("Hammer", Category.TOOLS, "Keller");

    // GETall
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
                "Keller"));

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

    // POST newTool
    @Test
    void createTool_expectCreatedToolObject() {
        //GIVEN
        Tool tool = tool1;
        NewTool newTool = new NewTool("Hammer", Category.TOOLS, "Keller");

        //WHEN
        when(toolsRepository.save(tool)).thenReturn(tool);
        Tool actual = toolsService.createTool(newTool);
        //THEN

        Tool expected = new Tool("Hammer", Category.TOOLS, "Keller");
        verify(toolsRepository).save(expected);
        assertEquals(expected, actual);
    }

    @Test
    void createToolWithWrongId_expectWrongArgument() {
        //GIVEN
        Tool tool = tool1;
        NewTool newTool = new NewTool("Hammer", Category.TOOLS, "Keller");

        //WHEN
        Tool unexpected = new Tool("Bohrmaschine", Category.TOOLS, "Keller");
        when(toolsRepository.save(tool)).thenReturn(unexpected);
        Tool actual = toolsService.createTool(newTool);
        //THEN

        Tool expected = new Tool("Hammer", Category.TOOLS, "Keller");
        verify(toolsRepository).save(expected);
        assertNotEquals(expected, actual);
    }


}