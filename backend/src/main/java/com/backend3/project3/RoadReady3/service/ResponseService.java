package com.backend3.project3.RoadReady3.service;

import com.backend3.project3.RoadReady3.model.Response;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import com.google.firebase.cloud.FirestoreClient;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Service
public class ResponseService {

    private static final String COLLECTION_NAME = "responses";
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

    public String saveStudentResponse(Response response, HttpServletRequest request) throws ExecutionException, InterruptedException {
        try {
            verifyToken(request);
            Map<String, Object> responseData = new HashMap<>();
            responseData.put("userId", response.getUserId());
            responseData.put("examId", response.getExamId());
            responseData.put("responses", response.getResponses());
            responseData.put("score", response.getScore());
            responseData.put("timestamp", new java.util.Date());
            String documentId = response.getUserId() + "_" + response.getExamId();
            DocumentReference docRef = db.collection(COLLECTION_NAME).document(documentId);
            ApiFuture<WriteResult> future = docRef.set(responseData);
            return "Response saved at: " + future.get().getUpdateTime();
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }
}