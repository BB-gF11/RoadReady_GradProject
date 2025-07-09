package com.backend3.project3.RoadReady3.service;

import com.backend3.project3.RoadReady3.model.User;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class SchoolService {

    private final Firestore db = FirestoreClient.getFirestore();

    public List<User> getAllSchools() throws ExecutionException, InterruptedException {
        ApiFuture<QuerySnapshot> query = db.collection("users")
                .whereEqualTo("role", "SCHOOL")
                .get();
        List<QueryDocumentSnapshot> documents = query.get().getDocuments();
        List<User> schools = new ArrayList<>();
        for (QueryDocumentSnapshot doc : documents) {
            schools.add(doc.toObject(User.class));
        }
        return schools;
    }

    public User getSchoolById(String id) throws ExecutionException, InterruptedException {
        DocumentReference docRef = db.collection("users").document(id);
        ApiFuture<DocumentSnapshot> future = docRef.get();
        DocumentSnapshot document = future.get();
        if (document.exists()) {
            User user = document.toObject(User.class);
            if ("SCHOOL".equals(user.getRole())) {
                return user;
            }
        }
        return null;
    }

    public String createSchool(User school) throws ExecutionException, InterruptedException {
        if (!"SCHOOL".equals(school.getRole())) {
            throw new IllegalArgumentException("User role must be SCHOOL");
        }
        DocumentReference docRef = db.collection("users").document();
        ApiFuture<WriteResult> writeResult = docRef.set(school);
        writeResult.get();
        return "School created successfully with ID: " + docRef.getId();
    }

    public String updateSchool(String id, User updatedSchool) throws ExecutionException, InterruptedException {
        DocumentReference docRef = db.collection("users").document(id);
        ApiFuture<DocumentSnapshot> future = docRef.get();
        DocumentSnapshot document = future.get();

        if (document.exists()) {
            User existingUser = document.toObject(User.class);
            if (!"SCHOOL".equals(existingUser.getRole())) {
                return "User with ID " + id + " is not a school";
            }
            ApiFuture<WriteResult> writeResult = docRef.set(updatedSchool);
            writeResult.get();
            return "School updated successfully";
        } else {
            return "School not found";
        }
    }

    public String deleteSchool(String id) throws ExecutionException, InterruptedException {
        DocumentReference docRef = db.collection("users").document(id);
        ApiFuture<WriteResult> writeResult = docRef.delete();
        writeResult.get();
        return "School deleted successfully";
    }
}
