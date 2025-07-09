package com.backend3.project3.RoadReady3.controller;

import com.backend3.project3.RoadReady3.model.Exam;
import com.backend3.project3.RoadReady3.model.Question;
import com.backend3.project3.RoadReady3.model.Response;
import com.backend3.project3.RoadReady3.service.ExamService;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/exams")
@CrossOrigin(origins = "*")
public class ExamController {

    @Autowired
    private ExamService examService;

    @GetMapping
    public List<Exam> getAllExams(HttpServletRequest request) throws ExecutionException, InterruptedException {
        return examService.getAllExams(request);
    }

    @GetMapping("/{id}")
    public Exam getExamById(@PathVariable String id, HttpServletRequest request) throws ExecutionException, InterruptedException {
        return examService.getExamById(id, request);
    }

    @GetMapping("/{id}/questions")
    public List<Question> getQuestionsByExamId(@PathVariable String id, HttpServletRequest request) throws ExecutionException, InterruptedException {
        return examService.getQuestionsByExamId(id, request);
    }

    @PostMapping("/submit")
    public String submitResponse(@RequestBody Response response, HttpServletRequest request) throws ExecutionException, InterruptedException {
        return examService.saveStudentResponse(response, request);
    }

    @PostMapping
    public String createExam(@RequestBody Exam exam, HttpServletRequest request) throws ExecutionException, InterruptedException {
        return examService.createExam(exam, request);
    }

    @PutMapping("/{id}")
    public String updateExam(@PathVariable String id, @RequestBody Exam exam, HttpServletRequest request) throws ExecutionException, InterruptedException {
        return examService.updateExam(id, exam, request);
    }

    @DeleteMapping("/{id}")
    public String deleteExam(@PathVariable String id, HttpServletRequest request) throws ExecutionException, InterruptedException {
        return examService.deleteExam(id, request);
    }

    @GetMapping("/api/progress")
    public Map<String, Object> getProgress(@RequestParam String userId) throws Exception {
        Firestore db = FirestoreClient.getFirestore();

        ApiFuture<QuerySnapshot> futureResponses = db.collection("responses")
                .whereEqualTo("userId", userId)
                .get();
        List<QueryDocumentSnapshot> responseDocs = futureResponses.get().getDocuments();

        List<Map<String, Object>> examSummaries = new ArrayList<>();

        for (QueryDocumentSnapshot responseDoc : responseDocs) {
            Map<String, Object> responseData = responseDoc.getData();
            String examId = (String) responseData.get("examId");
            Long score = (Long) responseData.get("score");
            Timestamp timestamp = (Timestamp) responseData.get("timestamp");

            DocumentSnapshot examDoc = db.collection("exams").document(examId).get().get();
            String examTitle = examDoc.exists() ? examDoc.getString("title") : "Unknown Exam";

            String status = (score >= 50) ? "Passed" : "Failed";

            Map<String, Object> examSummary = new HashMap<>();
            examSummary.put("title", examTitle);
            examSummary.put("date", timestamp);
            examSummary.put("score", score);
            examSummary.put("status", status);

            examSummaries.add(examSummary);
        }

        Map<String, Object> progress = new HashMap<>();
        progress.put("exams", examSummaries);

        return progress;
    }

}