package com.backend3.project3.RoadReady3.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {
    @Bean
    public OpenAPI customOpenAPI() {
        System.out.println("Initializing OpenAPI bean...");

        return new OpenAPI()
                .info(new Info()
                        .title("Road Ready API")
                        .version("1.0.0")
                        .description("API documentation for the Road Ready project"));
    }
}
