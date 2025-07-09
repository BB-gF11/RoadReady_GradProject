package com.backend3.project3.RoadReady3.controller;

import com.backend3.project3.RoadReady3.dto.UserUpdateDTO;
import com.backend3.project3.RoadReady3.model.User;
import com.backend3.project3.RoadReady3.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/role/{role}")
    public ResponseEntity<List<User>> getUsersByRole(@PathVariable String role) {
        List<User> users = userService.getAllByRole(role);
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable String id) {
        try {
            User user = userService.getUserById(id);
            if (user == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(user);
        } catch (ExecutionException | InterruptedException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping
    public ResponseEntity<String> createUser(@RequestBody User user) {
        try {
            String userId = userService.createUser(user);
            return ResponseEntity.ok("User created with ID: " + userId);
        } catch (ExecutionException | InterruptedException e) {
            return ResponseEntity.internalServerError().body("Error creating user");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateUser(@PathVariable String id, @RequestBody UserUpdateDTO userUpdateDTO) {
        try {
            String result = userService.updateUser(id, userUpdateDTO);
            return ResponseEntity.ok(result);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (ExecutionException | InterruptedException e) {
            return ResponseEntity.internalServerError().body("Error updating user");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable String id) {
        try {
            String result = userService.deleteUser(id);
            return ResponseEntity.ok(result);
        } catch (ExecutionException | InterruptedException e) {
            return ResponseEntity.internalServerError().body("Error deleting user");
        }
    }

    @GetMapping("/hierarchy")
    public ResponseEntity<?> getSchoolHierarchy() {
        try {
            return ResponseEntity.ok(userService.getSchoolHierarchy());
        } catch (ExecutionException | InterruptedException e) {
            return ResponseEntity.internalServerError().body("Error fetching hierarchy");
        }
    }

    @GetMapping("/instructors/{instructorId}/requests")
    public ResponseEntity<List<User>> getPendingRequests(@PathVariable String instructorId) {
        try {
            List<User> requests = userService.getPendingRequestsForInstructor(instructorId);
            return ResponseEntity.ok(requests);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}