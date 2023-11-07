/*
package de.neuefische.backend.user;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.Map;

import static org.mockito.Mockito.when;

@SpringBootTest
@AutoConfigureMockMvc
class UserControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Test
    @WithMockUser
    void testGetMe() throws Exception {
        // Define the attributes to be returned by the mock OAuth2AuthenticationToken
        Map<String, Object> attributes = Map.of("id", "12345", "login", "testuser", "avatar_url", "https://example.com/avatar.jpg");

        // Mock the behavior of userService.createUserProfile
        when(userService.createUserProfile(Mockito.any(OAuth2AuthenticationToken.class)))
                .thenReturn(new UserProfile("12345", "testuser", "https://example.com/avatar.jpg"));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/user/profile"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value("12345"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("testuser"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.avatarUrl").value("https://example.com/avatar.jpg"));
    }
}*/
