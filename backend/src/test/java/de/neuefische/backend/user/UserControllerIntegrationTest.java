package de.neuefische.backend.user;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;


import static org.mockito.Mockito.when;

@WebMvcTest(controllers = UserController.class)
public class UserControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Test
    void testGetMe() throws Exception {
        // Mock OAuth2AuthenticationToken
        OAuth2AuthenticationToken token = Mockito.mock(OAuth2AuthenticationToken.class);

        // Mock User Profile
        UserProfile userProfile = new UserProfile("userId", "username", "avatarUrl", "email");
        when(userService.createUserProfile(token)).thenReturn(userProfile);

        // Perform the request and assert the result
        mockMvc.perform(MockMvcRequestBuilders.get("/api/user/profile"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.userId").value("userId"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.userName").value("username"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.avatarUrl").value("avatarUrl"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.email").value("email"));
    }

    @Test
    void testGetUserProfile() throws Exception {
        // Mock User Profile
        UserProfile userProfile = new UserProfile("userId", "username", "avatarUrl", "email");
        when(userService.getUserProfileById("userId")).thenReturn(userProfile);

        // Perform the request and assert the result
        mockMvc.perform(MockMvcRequestBuilders.get("/api/user/profile/userId"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.userId").value("userId"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.userName").value("username"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.avatarUrl").value("avatarUrl"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.email").value("email"));
    }
}
