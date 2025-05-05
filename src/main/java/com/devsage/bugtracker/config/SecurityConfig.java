package com.devsage.bugtracker.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.Customizer;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(Customizer.withDefaults())  // ✅ Enable CORS support
            .csrf().disable()                 // ✅ Disable CSRF to allow POST from frontend
            .authorizeHttpRequests(auth -> auth
                .anyRequest().permitAll()     // ✅ Allow all requests (development only)
            );

        return http.build();
    }
}
