package com.x.Config;

import java.util.Arrays;
import java.util.Collections;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import jakarta.servlet.http.HttpServletRequest;

@Configuration
@EnableWebSecurity
public class AppConfig {

	  @Bean
	    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
	        http
	            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Stateless session
	            .csrf(csrf -> csrf.disable()) // Disable CSRF for APIs
	            .cors(cors -> cors.configurationSource(corsConfigurationSource())) // CORS configuration
	            .authorizeHttpRequests(authorize -> authorize
	                .requestMatchers("/auth/signin", "/auth/signup").permitAll() // Public endpoints
	                .requestMatchers("/api/**").authenticated() // Secure API endpoints
	                .anyRequest().permitAll()
	            )
	            .addFilterBefore(new JwttokenValidator(), UsernamePasswordAuthenticationFilter.class) // JWT Validation before authentication
	            .httpBasic(httpBasic -> httpBasic.disable()) // Disable Basic Auth
	            .formLogin(formLogin -> formLogin.disable()); // Disable Form Login
	        
	        return http.build();
	    }

    private CorsConfigurationSource corsConfigurationSource() {
        return new CorsConfigurationSource() {
            @Override
            public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
                CorsConfiguration cfg = new CorsConfiguration();
                cfg.setAllowedOrigins(Arrays.asList("http://localhost:5173")); // Match your React port
                cfg.setAllowedMethods(Collections.singletonList("*"));
                cfg.setAllowCredentials(true);
                cfg.setAllowedHeaders(Collections.singletonList("*"));
                cfg.setExposedHeaders(Arrays.asList("Authorization"));
                cfg.setMaxAge(3600L);
                return cfg;
            }
        };
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
