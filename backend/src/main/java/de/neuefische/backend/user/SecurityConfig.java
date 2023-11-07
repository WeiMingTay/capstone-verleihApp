package de.neuefische.backend.user;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
String url = "/api/tools";
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http.csrf(AbstractHttpConfigurer::disable)

                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(HttpMethod.DELETE, url+"/*").authenticated()
                        .requestMatchers(HttpMethod.POST, url+"/*").authenticated()
                        .requestMatchers(HttpMethod.PUT, url+"/*").authenticated()
                        .anyRequest().permitAll())

                .sessionManagement(sessions ->
                        sessions.sessionCreationPolicy(SessionCreationPolicy.ALWAYS))

                .oauth2Login(Customizer.withDefaults())
                .logout(logout -> logout
                        .logoutUrl("/api/logout")
                        .logoutSuccessHandler((request, response, authentication) ->
                                response.setStatus(200)))

                .exceptionHandling(exceptionHandlingConfigurer -> exceptionHandlingConfigurer
                        .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)));

        return http.build();
    }
}
