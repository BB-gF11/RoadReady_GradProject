package com.backend3.project3.RoadReady3.service;

import com.backend3.project3.RoadReady3.model.Exam;
import com.backend3.project3.RoadReady3.model.Question;
import com.backend3.project3.RoadReady3.model.Response;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import com.google.firebase.cloud.FirestoreClient;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Service
public class ExamService {

    private static final String COLLECTION_NAME = "exams";
    private final Firestore db = FirestoreClient.getFirestore();

    private void verifyToken(HttpServletRequest request) {
        try {
            String authHeader = request.getHeader("Authorization");
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                throw new RuntimeException("Missing or invalid Authorization header.");
            }
            String idToken = authHeader.substring(7);
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);
        } catch (Exception e) {
            throw new RuntimeException("Unauthorized: " + e.getMessage());
        }
    }

    public List<Exam> getAllExams(HttpServletRequest request) throws ExecutionException, InterruptedException {
        verifyToken(request);
        ApiFuture<QuerySnapshot> query = db.collection(COLLECTION_NAME).get();
        List<QueryDocumentSnapshot> documents = query.get().getDocuments();
        List<Exam> exams = new ArrayList<>();
        for (QueryDocumentSnapshot doc : documents) {
            exams.add(doc.toObject(Exam.class));
        }
        return exams;
    }

    public Exam getExamById(String id, HttpServletRequest request) throws ExecutionException, InterruptedException {
        verifyToken(request);
        DocumentReference docRef = db.collection(COLLECTION_NAME).document(id);
        DocumentSnapshot document = docRef.get().get();
        return document.exists() ? document.toObject(Exam.class) : null;
    }

    public List<Question> getQuestionsByExamId(String examId, HttpServletRequest request) throws ExecutionException, InterruptedException {
        verifyToken(request);
        ApiFuture<QuerySnapshot> query = db.collection("questions")
                .whereEqualTo("examId", examId).get();
        List<QueryDocumentSnapshot> documents = query.get().getDocuments();
        List<Question> questions = new ArrayList<>();
        for (QueryDocumentSnapshot doc : documents) {
            questions.add(doc.toObject(Question.class));
        }
        return questions;
    }


    public String createExam(Exam exam, HttpServletRequest request) throws ExecutionException, InterruptedException {
        verifyToken(request);
        db.collection(COLLECTION_NAME).document().set(exam).get();
        return "Exam created successfully";
    }

    public String deleteExam(String id, HttpServletRequest request) throws ExecutionException, InterruptedException {
        verifyToken(request);
        db.collection(COLLECTION_NAME).document(id).delete().get();
        return "Exam deleted successfully";
    }

    public String updateExam(String id, Exam updatedExam, HttpServletRequest request) throws ExecutionException, InterruptedException {
        verifyToken(request);
        DocumentReference docRef = db.collection(COLLECTION_NAME).document(id);
        DocumentSnapshot document = docRef.get().get();
        if (document.exists()) {
            docRef.set(updatedExam).get();
            return "Exam updated successfully";
        } else {
            return "Exam not found";
        }
    }

    public String saveStudentResponse(Response response, HttpServletRequest request) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        Map<String, Object> responseData = new HashMap<>();
        responseData.put("userId", response.getUserId());
        responseData.put("examId", response.getExamId());
        responseData.put("responses", response.getResponses());
        responseData.put("score", response.getScore());
        responseData.put("timestamp", new java.util.Date());
        ApiFuture<com.google.cloud.firestore.WriteResult> future = db.collection("responses").document().set(responseData);
        return "Response submitted at: " + future.get().getUpdateTime();
    }
}