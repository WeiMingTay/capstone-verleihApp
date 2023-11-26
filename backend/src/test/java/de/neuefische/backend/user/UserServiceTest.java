package de.neuefische.backend.user;

import de.neuefische.backend.user.UserProfile;
import de.neuefische.backend.user.UserRepository;
import de.neuefische.backend.user.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.NoSuchElementException;
import java.util.Optional;

import static org.mockito.Mockito.when;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class UserServiceTest {

    @Mock
    private UserRepository mockUserRepository;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void getUserProfileById_shouldReturnUserProfile() {
        UserProfile mockUserProfile = new UserProfile("12345", "testuser", "https://example.com/avatar.jpg", "testuser@example.com");

        when(mockUserRepository.findById("12345")).thenReturn(Optional.of(mockUserProfile));

        UserProfile userProfile = userService.getUserProfileById("12345");

        assertEquals("12345", userProfile.id());
        assertEquals("testuser", userProfile.name());
        assertEquals("https://example.com/avatar.jpg", userProfile.avatarUrl());
        assertEquals("testuser@example.com", userProfile.email());
    }

    @Test
    void getUserProfileById_shouldThrowNoSuchElementException() {
        when(mockUserRepository.findById("nonexistentUserId")).thenReturn(Optional.empty());

        assertThrows(NoSuchElementException.class, () -> userService.getUserProfileById("nonexistentUserId"));
    }
}
