package com.backend3.project3.RoadReady3.service;

import com.backend3.project3.RoadReady3.model.Instructor;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import com.google.cloud.firestore.QuerySnapshot;

import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

@Service
public class InstructorService {

    private static final String COLLECTION_NAME = "Instructors";
    private final Firestore db = FirestoreClient.getFirestore();

    public String saveInstructor(Instructor instructor) throws ExecutionException, InterruptedException {
        ApiFuture<WriteResult> future = db.collection("Instructors").document(instructor.getInstructorId()).set(instructor);
        return future.get().getUpdateTime().toString();
    }

    public Instructor getInstructor(String instructorId) throws ExecutionException, InterruptedException {
        DocumentSnapshot doc = db.collection("Instructors").document(instructorId).get().get();
        return doc.exists() ? doc.toObject(Instructor.class) : null;
    }

    public List<Instructor> getAllInstructors() throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();

        ApiFuture<QuerySnapshot> future = db.collection("Instructors").get();
        QuerySnapshot querySnapshot = future.get();

        return querySnapshot.getDocuments()
                .stream()
                .map(doc -> doc.toObject(Instructor.class))
                .collect(Collectors.toList());
    }

    public String updateInstructor(String id, Instructor updatedInstructor) throws ExecutionException, InterruptedException {
        DocumentReference docRef = db.collection(COLLECTION_NAME).document(id);
        ApiFuture<WriteResult> future = docRef.set(updatedInstructor);
        return "Instructor updated at: " + future.get().getUpdateTime();
    }

    public String deleteInstructor(String id) throws ExecutionException, InterruptedException {
        ApiFuture<WriteResult> writeResult = db.collection(COLLECTION_NAME).document(id).delete();
        return "Instructor deleted at: " + writeResult.get().getUpdateTime();
    }

    public List<Instructor> getInstructorsBySchoolId(String schoolId) throws ExecutionException, InterruptedException {
        List<Instructor> result = new ArrayList<>();
        ApiFuture<QuerySnapshot> future = db.collection("Instructors")
                .whereEqualTo("schoolId", schoolId)
                .get();

        for (DocumentSnapshot doc : future.get().getDocuments()) {
            result.add(doc.toObject(Instructor.class));
        }
        return result;


    }

    public long countInstructorsBySchoolId(String schoolId) throws ExecutionException, InterruptedException {
        CollectionReference instructorsRef = db.collection("Instructors");
        QuerySnapshot snapshot = instructorsRef.whereEqualTo("schoolId", schoolId).get().get();
        return snapshot.size();
    }


}
