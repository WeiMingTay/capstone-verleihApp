package de.neuefische.backend.user;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;

class UserServiceTest {

    @Mock
    private OAuth2AuthenticationToken mockOAuth2AuthenticationToken;
    @Mock
    private UserRepository mockUserRepository;
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);

        userService = new UserService(mockUserRepository);
    }

    @Test
    void createUserProfile_shouldReturnUserProfile() {
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("id", "12345");
        attributes.put("login", "testuser");
        attributes.put("avatar_url", "https://example.com/avatar.jpg");
        attributes.put("email", "testuser@example.com");

        OAuth2User oauth2User = new DefaultOAuth2User(
                Set.of(new SimpleGrantedAuthority("ROLE_USER")),
                attributes,
                "login"
        );

        when(mockOAuth2AuthenticationToken.getPrincipal()).thenReturn(oauth2User);

        UserProfile userProfile = userService.createUserProfile(mockOAuth2AuthenticationToken);

        assertEquals("12345", userProfile.id());
        assertEquals("testuser", userProfile.name());
        assertEquals("https://example.com/avatar.jpg", userProfile.avatarUrl());
        assertEquals("testuser@example.com", userProfile.email());
    }
    @Test
    void getUserProfileById_shouldReturnUserProfile() {
        // Mocking a UserProfile for testing
        UserProfile mockUserProfile = new UserProfile("12345", "testuser", "https://example.com/avatar.jpg", "testuser@example.com");

        // Mocking the behavior of the UserRepository
        when(mockUserRepository.findById("12345")).thenReturn(Optional.of(mockUserProfile));

        // Calling the method under test
        UserProfile userProfile = userService.getUserProfileById("12345");

        // Verifying the result
        assertEquals("12345", userProfile.id());
        assertEquals("testuser", userProfile.name());
        assertEquals("https://example.com/avatar.jpg", userProfile.avatarUrl());
        assertEquals("testuser@example.com", userProfile.email());
    }
    @Test
    void getUserProfileById_shouldThrowNoSuchElementException() {
        // Mocking the behavior of the UserRepository to return an empty optional
        when(mockUserRepository.findById("nonexistentUserId")).thenReturn(Optional.empty());

        // Calling the method under test and expecting an exception
        assertThrows(NoSuchElementException.class, () -> userService.getUserProfileById("nonexistentUserId"));
    }
}
