package de.neuefische.backend.tools;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ToolsServiceTest {

    ToolsRepository toolsRepository = mock(ToolsRepository.class);
    ToolsService toolsService = new ToolsService(toolsRepository);

    Tool tool1 = new Tool("Hammer", "Keller", Category.TOOLS);

    @Test
    void createTool_expectCreatedToolObject() {
        //GIVEN
        Tool tool = tool1;
        NewTool newTool = new NewTool("Hammer", "Keller", Category.TOOLS);

        //WHEN
        when(toolsRepository.save(tool)).thenReturn(tool);
        Tool actual = toolsService.createTool(newTool);
        //THEN

        Tool expected = new Tool("Hammer", "Keller", Category.TOOLS);
        verify(toolsRepository).save(expected);
        assertEquals(expected, actual);
    }

    @Test
    void createToolWithWrongId_expectWrongArgument() {
        //GIVEN
        Tool tool = tool1;
        NewTool newTool = new NewTool("Hammer", "Keller", Category.TOOLS);

        //WHEN
        Tool unexpected = new Tool("Bohrmaschine", "Keller", Category.TOOLS);
        when(toolsRepository.save(tool)).thenReturn(unexpected);
        Tool actual = toolsService.createTool(newTool);
        //THEN

        Tool expected = new Tool("Hammer", "Keller", Category.TOOLS);
        verify(toolsRepository).save(expected);
        assertNotEquals(expected, actual);
    }
}