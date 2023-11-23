package de.neuefische.backend.tools;

import com.cloudinary.Cloudinary;
import com.cloudinary.Uploader;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.test.context.support.WithAnonymousUser;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;


import java.io.File;
import java.util.Collections;
import java.util.Map;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

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

    @MockBean
    ClientRegistrationRepository clientRegistrationRepository;


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
    @WithMockUser
    void createTool_POST_expectCreatedToolObject() throws Exception {
        MockMultipartFile data = new MockMultipartFile("data",
                null,
                MediaType.APPLICATION_JSON_VALUE,
                """
                            {
                            "name": "Hammer",
                        "categories": ["TOOLS"],
                        "author": "Max Mustermann",
                        "location": "Keller",
                        "description": "Ein Hammer",
                        "timestamp": "2021-07-01T12:00:00.000+00:00"
                            }
                        """
                        .getBytes()
        );
        MockMultipartFile file = new MockMultipartFile("file",
                "testImage.png",
                MediaType.IMAGE_PNG_VALUE,
                "testImage".getBytes()
        );
        File fileToUpload = File.createTempFile("image", null);
        file.transferTo(fileToUpload);

        when(cloudinary.uploader()).thenReturn(uploader);
        when(uploader.upload(any(), any())).thenReturn(Map.of("url", "test-url"));

        mockMvc.perform(multipart("/api/tools/add")
                        .file(data)
                        .file(file))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                                                    {
                        "name": "Hammer",
                        "image": "test-url",
                        "categories": ["TOOLS"],
                        "author": "Max Mustermann",
                        "location": "Keller",
                        "description": "Ein Hammer",
                        "timestamp": "2021-07-01T12:00:00.000+00:00"
                        }
                                                """))
                .andExpect(jsonPath("$.id").isNotEmpty());
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void createToolWithEmpty_POST_expectNullPointerException() throws Exception {
        MockMultipartFile data = new MockMultipartFile("data",
                null,
                MediaType.APPLICATION_JSON_VALUE,
                """
                            {"name":"docker-image"}
                        """
                        .getBytes()
        );
        MockMultipartFile file = new MockMultipartFile("file",
                "testImage.png",
                MediaType.IMAGE_PNG_VALUE,
                "testImage".getBytes()
        );
        File fileToUpload = File.createTempFile("image", null);
        file.transferTo(fileToUpload);

        when(cloudinary.uploader()).thenReturn(uploader);
        when(uploader.upload(any(), any())).thenReturn(Map.of("url", "test-url"));

        mockMvc.perform(multipart("/api/tools/add")
                        .file(data)
                        .file(file))
                .andExpect(status().isOk())
                .andExpect(content().string(
                        "Elemente können nicht null sein!"
                ));
    }

    // === PUT ===
    @Test
    @WithMockUser
    void updateToolWhenLoggedIn_expectUpdatedToolObject() throws Exception {
        Tool tool1 = toolsRepo.save(new Tool(
                "12345",
                "Hammer",
                "test-url",
                Collections.singletonList(Category.TOOLS),
                "Max Mustermann",
                "Keller",
                "Ein Hammer",
                "2021-07-01T12:00:00.000+00:00",
                "user12345"
        ));

        mockMvc.perform(MockMvcRequestBuilders.put("/api/tools/" + tool1.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                    {
                                        "id": "12345",
                                        "name": "Hammer",
                                        "image": "test-url",
                                        "categories": ["TOOLS"],
                                        "author": "Max Mustermann",
                                        "location": "Keller",
                                        "description": "Ein Hammer",
                                        "timestamp": "2021-07-01T12:00:00.000+00:00"
                                    }
                                """))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                            "id": "12345",
                            "name": "Hammer",
                            "image": "test-url",
                            "categories": ["TOOLS"],
                            "author": "Max Mustermann",
                            "location": "Keller",
                            "description": "Ein Hammer",
                            "timestamp": "2021-07-01T12:00:00.000+00:00"
                        }
                        """));
    }

    @Test
    @WithAnonymousUser
    void updateToolWhenLoggedOff_expectHtmlStatus401() throws Exception {
        Tool tool1 = toolsRepo.save(new Tool(
                "12345",
                "Hammer",
                "test-url",
                Collections.singletonList(Category.TOOLS),
                "Max Mustermann",
                "Keller",
                "Ein Hammer",
                "2021-07-01T12:00:00.000+00:00",
                "user12345"
        ));

        mockMvc.perform(MockMvcRequestBuilders.put("/api/tools/" + tool1.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                    {
                                        "id": "12345",
                                        "name": "Hammer",
                                        "image": "test-url",
                                        "categories": ["TOOLS"],
                                        "author": "Max Mustermann",
                                        "location": "Keller",
                                        "description": "Ein Hammer",
                                        "timestamp": "2021-07-01T12:00:00.000+00:00"
                                    }
                                """))
                .andExpect(status().isUnauthorized());
    }

    // === DELETE ===
    @Test
    @DirtiesContext
    @WithMockUser
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
    @WithMockUser
    void deleteToolById_expectIdNotFoundMessage() throws Exception {

        String id = "quatschId";

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/tools/" + id))
                .andExpect(status().isNotFound())
                .andExpect(
                        content()
                                .string("Die ID '" + id + "' existiert nicht!")
                );

    }

    @Test
    @DirtiesContext
    @WithAnonymousUser
    void deleteToolByIdWhenNotLoggedIn_expectUnauthorized() throws Exception {

        String id = "65317b1294a88f39ea92a61a";

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/tools/" + id))
                .andExpect(status().isUnauthorized());

    }


}