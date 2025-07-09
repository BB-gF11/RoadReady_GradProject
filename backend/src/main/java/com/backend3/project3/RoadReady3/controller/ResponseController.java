package com.backend3.project3.RoadReady3.controller;

import com.backend3.project3.RoadReady3.model.Response;
import com.backend3.project3.RoadReady3.service.ResponseService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/responses")
@CrossOrigin(origins = "*")
public class ResponseController {

    @Autowired
    private ResponseService responseService;

    @PostMapping("/submit")
    public ResponseEntity<String> submitResponse(@RequestBody Response response, HttpServletRequest request) {
        try {
            String result = responseService.saveStudentResponse(response, request);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Internal Server Error: " + e.getMessage());
        }
    }
}