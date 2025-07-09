//package com.backend3.project3.RoadReady3.service;
//
//import com.google.api.core.ApiFuture;
//import com.google.cloud.firestore.DocumentReference;
//import com.google.cloud.firestore.Firestore;
//import com.google.firebase.cloud.FirestoreClient;
//import org.springframework.stereotype.Service;
//import com.google.cloud.Timestamp;
//import java.util.HashMap;
//import java.util.Map;
//import java.util.concurrent.ExecutionException;
//
//@Service
//
//public class InstructorNotesService {
//    private static final String COLLECTION_NAME = "InstructorNotes";
//    private final Firestore db = FirestoreClient.getFirestore();
//
//    public String sendNoteToStudent(String instructorId, String studentId, String message) {
//        Map<String, Object> note = new HashMap<>();
//        note.put("instructorId", instructorId);
//        note.put("studentId", studentId);
//        note.put("message", message);
//        note.put("timestamp", Timestamp.now());
//
//        DocumentReference docRef = db.collection(COLLECTION_NAME).document();
//        ApiFuture<com.google.cloud.firestore.WriteResult> result = docRef.set(note);
//
//        return docRef.getId();
//    }
//}
