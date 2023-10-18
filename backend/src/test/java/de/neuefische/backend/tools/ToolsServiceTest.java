package de.neuefische.backend.tools;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ToolsServiceTest {

    ToolsRepository toolsRepository = mock(ToolsRepository.class);
    ToolsService toolsService = new ToolsService(toolsRepository);

    @Test
    void createTool_expectCreatedToolObject() {
        //GIVEN
        Tool newTool1 = new Tool("1", "Hammer", "Keller");

        //WHEN
        when(toolsRepository.save(newTool1)).thenReturn(newTool1);
        Tool actual = toolsService.createTool(newTool1);
        //THEN

        Tool expected = new Tool("1", "Hammer", "Keller");
        verify(toolsRepository).save(expected);
        assertEquals(expected, actual);
    }

    @Test
    void createToolWithWrongId_expectWrongArgument() {
        //GIVEN
        Tool newTool1 = new Tool("1", "Hammer", "Keller");

        //WHEN
        Tool unexpected = new Tool("2", "Hammer", "Keller");
        when(toolsRepository.save(newTool1)).thenReturn(unexpected);
        Tool actual = toolsService.createTool(newTool1);
        //THEN

        Tool expected = new Tool("1", "Hammer", "Keller");
        verify(toolsRepository).save(expected);
        assertNotEquals(expected, actual);
    }
}