package com.resolve.bookstore.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Allows CORS for all endpoints
                .allowedOrigins(getAllowedOrigins()) // Replace with the frontend URL (for example, localhost:3000 for React)
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Allowable HTTP methods
                .allowedHeaders("*") // Allow all headers
                .allowCredentials(true); // If you need to support cookies or authentication
    }

    private String[] getAllowedOrigins() {
        // This can be dynamic based on environment or configuration properties
        return new String[]{
                "http://localhost:5173", // Development
                "https://example.com",   // Production
        };
    }
}

