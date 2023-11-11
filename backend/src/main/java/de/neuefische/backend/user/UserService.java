package de.neuefische.backend.user;

import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class UserService {

    public UserProfile createUserProfile(OAuth2AuthenticationToken token) {
        Map<String, Object> attributes = token.getPrincipal().getAttributes();
        String id = getUserId(attributes);
        String userName = getUserName(attributes);
        String avatarUrl = getAvatarUrl(attributes);
        String email = getEmail(attributes);

        return new UserProfile(id, userName, avatarUrl, email);
    }

    private String getUserId(Map<String, Object> attributes) {
        return attributes.getOrDefault("sub", "").toString();
    }

    private String getUserName(Map<String, Object> attributes) {
        return attributes.getOrDefault("login", attributes.getOrDefault("given_name", "")).toString();
    }

    private String getAvatarUrl(Map<String, Object> attributes) {
        String[] possibleKeys = {"avatar_url", "picture"};
        for (String key : possibleKeys) {
            if (attributes.containsKey(key)) {
                return attributes.get(key).toString();
            }
        }
        return "";
    }

    private String getEmail(Map<String, Object> attributes) {
        return attributes.getOrDefault("email", attributes.getOrDefault("email", "")).toString();
    }
}
