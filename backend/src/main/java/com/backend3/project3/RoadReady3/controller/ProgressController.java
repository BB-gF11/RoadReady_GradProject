package com.backend3.project3.RoadReady3.controller;

import com.backend3.project3.RoadReady3.model.StudentProgress;
import com.backend3.project3.RoadReady3.service.StudentProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/progress")
@CrossOrigin(origins = "*")
public class ProgressController {

    private final StudentProgressService progressService;

    @Autowired
    public ProgressController(StudentProgressService progressService) {
        this.progressService = progressService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<StudentProgress> getProgress(@PathVariable String userId) {
        try {
            StudentProgress progress = progressService.getProgressByUserId(userId);
            if (progress == null) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(progress);
        } catch (ExecutionException | InterruptedException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{userId}")
    public ResponseEntity<String> updateProgress(@PathVariable String userId, @RequestBody StudentProgress progress) {
        try {
            if (!userId.equals(progress.getUserId())) {
                return ResponseEntity.badRequest().body("UserId mismatch");
            }
            progressService.saveOrUpdateProgress(progress);
            return ResponseEntity.ok("Progress updated");
        } catch (ExecutionException | InterruptedException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update progress");
        }
    }

    @PatchMapping("/{userId}/note")
    public ResponseEntity<String> addInstructorNote(@PathVariable String userId, @RequestBody Map<String, String> body) {
        String note = body.get("note");
        int progress = Integer.parseInt(body.get("progress"));
        if (note == null || note.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Note cannot be empty");
        }

        try {
            progressService.addInstructorNote(userId, note, progress);
            return ResponseEntity.ok("Note added");
        } catch (ExecutionException | InterruptedException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add note");
        }
    }

    @GetMapping("/summary")
    public ResponseEntity<Object> getProgressSummary(@RequestParam String userId) {
        try {
            Map<String, Object> progress = progressService.getProgressSummary(userId);

            if (progress == null || !progress.containsKey("exams")) {
                return ResponseEntity.ok(progress);
            }

            @SuppressWarnings("unchecked") List<?> examsRaw = (List<?>) progress.get("exams");

            List<Map<String, Object>> simplifiedExams = examsRaw.stream().filter(item -> item instanceof Map).map(item -> {
                Map<String, Object> exam = (Map<String, Object>) item;
                try {
                    String title = (String) exam.get("title");
                    String date = (String) exam.get("date");
                    Object score = exam.get("score");

                    if (title == null || date == null || score == null) {
                        return null;
                    }

                    return Map.of("title", title, "date", date, "score", score);
                } catch (Exception e) {
                    return null;
                }
            }).filter(Objects::nonNull).toList();

            progress.put("exams", simplifiedExams);

            return ResponseEntity.ok(progress);
        } catch (Exception e) {
            System.err.println("Error in getProgressSummary: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching progress summary");
        }
    }

    @PatchMapping("/{userId}/lessons")
    public ResponseEntity<?> updateCompletedLessons(@PathVariable String userId, @RequestBody Map<String, List<Integer>> body) {
        List<Integer> completedLessons = body.get("completedLessons");
        if (completedLessons == null) {
            return ResponseEntity.badRequest().body("completedLessons is required");
        }
        try {
            progressService.updateCompletedLessons(userId, completedLessons);
            return ResponseEntity.ok("Lessons updated successfully");
        } catch (ExecutionException | InterruptedException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update lessons");
        }
    }

}
