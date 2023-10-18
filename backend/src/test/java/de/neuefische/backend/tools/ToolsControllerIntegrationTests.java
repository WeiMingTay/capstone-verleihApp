package de.neuefische.backend.tools;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class ToolsControllerIntegrationTests {
    @Autowired
    MockMvc mockMvc;

    @Autowired
    ToolsRepository toolsRepository;

    @Test
    @DirtiesContext
    void createTool_POST_expectCreatedToolObject() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/tools/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                    "id": "1",
                                    "name": "Hammer",
                                    "location": "Keller"
                                    }
                                """)
                )
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                            {
                            "id": "1",
                            "name": "Hammer",
                            "location": "Keller"
                            }
                        """
                ));
    }
}