package de.neuefische.backend.user;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.NoSuchElementException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    @GetMapping("/profile")
    public UserProfile getMe() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth instanceof OAuth2AuthenticationToken token) {
            return userService.createUserProfile(token);
        }
        return null;
    }
    @GetMapping("/profile/{userId}")
    public UserProfile getUserProfile(String userId) throws NoSuchElementException {
        return userService.getUserProfileById(userId);
    }
}
