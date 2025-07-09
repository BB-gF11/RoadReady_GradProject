package com.backend3.project3.RoadReady3.service;

import com.backend3.project3.RoadReady3.model.StudentProgress;
import com.google.api.core.ApiFuture;
import com.google.cloud.Timestamp;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.ExecutionException;

@Service
public class StudentProgressService {

    private final Firestore firestore;

    public StudentProgressService() {
        this.firestore = FirestoreClient.getFirestore();
    }

    public StudentProgress getProgressByUserId(String userId) throws ExecutionException, InterruptedException {
        ApiFuture<DocumentSnapshot> future = firestore.collection("StudentProgress").document(userId).get();
        DocumentSnapshot document = future.get();
        if (document.exists()) {
            return document.toObject(StudentProgress.class);
        }
        return null;
    }

    public void saveOrUpdateProgress(StudentProgress progress) throws ExecutionException, InterruptedException {
        ApiFuture<WriteResult> future = firestore.collection("StudentProgress")
                .document(progress.getUserId())
                .set(progress);
        future.get();
    }

    public void addInstructorNote(String userId, String note, int progress) throws ExecutionException, InterruptedException {
        DocumentReference docRef = firestore.collection("StudentProgress").document(userId);
        try {
            docRef.update("instructorNotes", FieldValue.arrayUnion(note)).get();
        } catch (Exception e) {
            Map<String, Object> data = new HashMap<>();
            data.put("userId", userId);
            data.put("progress", progress);
            data.put("instructorNotes", Collections.singletonList(note));
            docRef.set(data).get();
        }
    }

    public Map<String, Object> getProgressSummary(String userId) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> future = db.collection("responses")
                .whereEqualTo("userId", userId)
                .get();
        List<Map<String, Object>> exams = new ArrayList<>();
        for (QueryDocumentSnapshot doc : future.get().getDocuments()) {
            Map<String, Object> data = doc.getData();
            String examId = (String) data.get("examId");
            Long score = (Long) data.get("score");
            Timestamp timestamp = (Timestamp) data.get("timestamp");
            if (examId == null || score == null || timestamp == null) {
                continue;
            }
            String date = new SimpleDateFormat("yyyy-MM-dd").format(timestamp.toDate());
            DocumentSnapshot examDoc = db.collection("exams").document(examId).get().get();
            String title = examDoc.exists() ? examDoc.getString("title") : "Unknown title";
            String status = (score >= 70) ? "Passed" : "Failed";
            Map<String, Object> summary = new HashMap<>();
            summary.put("title", title);
            summary.put("date", date);
            summary.put("score", score);
            summary.put("status", status);
            exams.add(summary);
        }
        Map<String, Object> result = new HashMap<>();
        result.put("exams", exams);
        return result;
    }

    public void updateCompletedLessons(String userId, List<Integer> completedLessons) throws ExecutionException, InterruptedException {
        DocumentReference docRef = firestore.collection("StudentProgress").document(userId);
        try {
            docRef.update("completedLessons", completedLessons).get();
        } catch (Exception e) {
            Map<String, Object> data = new HashMap<>();
            data.put("userId", userId);
            data.put("completedLessons", completedLessons);
            docRef.set(data).get();
        }
    }
}
