package com.backend3.project3.RoadReady3.service;

import com.backend3.project3.RoadReady3.model.User;
import com.backend3.project3.RoadReady3.service.AuthService;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.auth.FirebaseAuthException;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.UUID;
import java.util.concurrent.ExecutionException;

import static org.junit.jupiter.api.Assertions.*;

public class AuthServiceTest {


    private AuthService authService;

    @BeforeAll
    public static void initFirebase() throws IOException {
        if (FirebaseApp.getApps().isEmpty()) {
            FileInputStream serviceAccount = new FileInputStream("C:\\Users\\Duaa Arrasheed\\Desktop\\final project\\Research-Project-Road-Ready\\backend\\src\\main\\resources\\serviceAccountKey.json");

            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .setProjectId("testroadready-3263a")
                    .build();

            FirebaseApp.initializeApp(options);
        }
    }

    @BeforeEach
    public void setup() {
        authService = new AuthService();
    }

    @Test
    public void testCreateCustomToken_shouldReturnToken() throws FirebaseAuthException {
        String uid = "someTestUser";

        String token = authService.createCustomToken(uid);
        System.out.println("Custom Token: " + token);

        assertNotNull(token);
        assertFalse(token.isEmpty());
    }

    @Test
    public void testCreateUser_shouldSucceed() {
        // Create a unique user for testing
        String uniqueId = UUID.randomUUID().toString();

        User testUser = new User();
        testUser.setUserId(uniqueId);
        testUser.setEmailAddress("testuser_" + uniqueId + "@example.com");
        testUser.setFirstName("Test");
        testUser.setLastName("User");
        testUser.setPassword("testPassword123");
        testUser.setRole("USER");

        try {
            String result = authService.createUser(testUser);
            System.out.println(result);
            String token = (authService.login(testUser.getEmailAddress(), "testPassword123")).getToken();
            System.out.println("Firebase ID Token: " + token);

            assertTrue(result.contains("User created successfully"));
        } catch (ExecutionException | InterruptedException e) {
            fail("Exception thrown while creating user: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            fail("Invalid input: " + e.getMessage());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Test
    public void testLoginUser_validCredentials_shouldReturnToken() {
        String email = "testuser_4ac6f65d-8dc2-4e3c-8633-c7c3df612d6a@example.com";
        String password = "testPassword123";

        try {
            String idToken = (authService.login(email, password)).getToken();
            System.out.println("Firebase ID Token: " + idToken);
            assertNotNull(idToken);
            assertFalse(idToken.isEmpty());
        } catch (Exception e) {
            fail("Login failed with exception: " + e.getMessage());
        }
    }
}
