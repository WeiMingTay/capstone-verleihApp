package de.neuefische.backend.tools;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ToolsServiceTest {

    ToolsRepository toolsRepository = mock(ToolsRepository.class);
    ToolsService toolsService = new ToolsService(toolsRepository);

    Tool newTool = new Tool("Hammer", "Keller", Category.TOOLS);

    @Test
    void createTool_expectCreatedToolObject() {
        //GIVEN
        Tool newTool1 = newTool;

        //WHEN
        when(toolsRepository.save(newTool1)).thenReturn(newTool1);
        Tool actual = toolsService.createTool(newTool1);
        //THEN

        Tool expected = new Tool("Hammer", "Keller", Category.TOOLS);
        verify(toolsRepository).save(expected);
        assertEquals(expected, actual);
    }

    @Test
    void createToolWithWrongId_expectWrongArgument() {
        //GIVEN
        Tool newTool1 = newTool;

        //WHEN
        Tool unexpected = new Tool("Bohrmaschine", "Keller", Category.TOOLS);
        when(toolsRepository.save(newTool1)).thenReturn(unexpected);
        Tool actual = toolsService.createTool(newTool1);
        //THEN

        Tool expected = new Tool("Hammer", "Keller", Category.TOOLS);
        verify(toolsRepository).save(expected);
        assertNotEquals(expected, actual);
    }
}