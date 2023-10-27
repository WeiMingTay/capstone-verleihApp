package de.neuefische.backend.tools;

import com.cloudinary.Cloudinary;
import com.cloudinary.Uploader;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;


import java.util.Collections;

import static org.mockito.Mockito.mock;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class ToolsControllerIntegrationTests {
    @Autowired
    MockMvc mockMvc;

    @Autowired
    ToolsRepository toolsRepo;

    @MockBean
    Cloudinary cloudinary;
    Uploader uploader = mock(Uploader.class);


    // === GET ===
    @Test
    @DirtiesContext
    void getAllTools_expectEmptyList() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/tools"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        []
                        """));
    }

    @Test
    @DirtiesContext
    void getAllTools_expectTools() throws Exception {
        Tool tool1 = new Tool("Hammer", Collections.singletonList(Category.TOOLS), "Keller");
        toolsRepo.save(tool1);
        toolsRepo.save(new Tool("Bohrmaschine", Collections.singletonList(Category.TOOLS), "Keller"));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/tools"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        [
                            {
                            "name": "Hammer",
                            "location": "Keller",
                            "categories": ["TOOLS"]
                            },
                            {
                            "name": "Bohrmaschine",
                            "location": "Keller",
                            "categories": ["TOOLS"]
                            }
                        ]
                        """));
    }

    @Test
    @DirtiesContext
    void getToolsById_expectTool() throws Exception {
        Tool tool1 = toolsRepo.save(new Tool(
                "Hammer",
                Collections.singletonList(Category.TOOLS),
                "Keller"));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/tools/" + tool1.getId()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                        "name": "Hammer",
                        "location": "Keller",
                        "categories": ["TOOLS"]
                        }
                        """));
    }

    @Test
    @DirtiesContext
    void getToolsById_expectNoSuchElementException() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/tools/" + "quatschID"))
                .andExpect(status().isOk())
                .andExpect(content().string(
                        "Die ID gibt es leider nicht"
                ));
    }

    // === POST ===
    @Test
    @DirtiesContext
    void createTool_POST_expectCreatedToolObject() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/tools/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                "name": "Hammer",
                                "location": "Keller",
                                "categories": ["TOOLS"]
                                }
                                """)
                )
                .andExpect(status().isOk())
                .andExpect(content().json("""
                            {
                            "name": "Hammer",
                            "location": "Keller",
                            "categories": ["TOOLS"]
                            }
                        """
                ));
    }

    @Test
    @DirtiesContext
    void createToolWithEmpty_POST_expectNullPointerException() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/tools/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                "name": "Hammer",
                                "location": null,
                                "categories": ["TOOLS"]
                                                               
                                }
                                """))
                .andExpect(status().isOk())
                .andExpect(content().string(
                        "Elemente können nicht null sein!"
                ));
    }


    // === DELETE ===
    @Test
    @DirtiesContext
    void deleteToolById_expectDeleteMessage() throws Exception {

        String id = "65317b1294a88f39ea92a61a";

        toolsRepo.save(new Tool(
                "65317b1294a88f39ea92a61a",
                "Hammer",
                Collections.singletonList(Category.TOOLS),
                "Keller"
        ));

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/tools/" + id))
                .andExpect(status().isOk())
                .andExpect(
                        content()
                                .string("Tool with id: " + id + " was deleted.")
                );

    }

    @Test
    @DirtiesContext
    void deleteToolById_expectIdNotFoundMessage() throws Exception {

        String id = "quatschId";

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/tools/" + id))
                .andExpect(status().isNotFound())
                .andExpect(
                        content()
                                .string("Die ID '" + id + "' existiert nicht!")
                );

    }

}