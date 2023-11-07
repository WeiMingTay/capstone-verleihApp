package de.neuefische.backend.user;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;

import static org.mockito.Mockito.when;

import java.util.Map;
import java.util.HashMap;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;

class UserServiceTest {

    @Mock
    private OAuth2AuthenticationToken mockOAuth2AuthenticationToken;

    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);

        userService = new UserService();
    }

    @Test
    void createUserProfile_shouldReturnUserProfile() {
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("id", "12345");
        attributes.put("login", "testuser");
        attributes.put("avatar_url", "https://example.com/avatar.jpg");

        OAuth2User oauth2User = new DefaultOAuth2User(
                Set.of(new SimpleGrantedAuthority("ROLE_USER")),
                attributes,
                "login"
        );

        // Mock the getPrincipal() method to return the oauth2User object
        when(mockOAuth2AuthenticationToken.getPrincipal()).thenReturn(oauth2User);

        UserProfile userProfile = userService.createUserProfile(mockOAuth2AuthenticationToken);

        assertEquals("12345", userProfile.id());
        assertEquals("testuser", userProfile.name());
        assertEquals("https://example.com/avatar.jpg", userProfile.avatarUrl());
    }
}
