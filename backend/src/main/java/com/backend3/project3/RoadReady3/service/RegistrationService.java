package com.backend3.project3.RoadReady3.service;

import com.backend3.project3.RoadReady3.dto.RegistrationDTO;
import com.backend3.project3.RoadReady3.model.Registration;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;

@Service
public class RegistrationService {

    private static final String COLLECTION_NAME = "Registrations";

    public String saveRegistration(Registration registration) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> future = db.collection(COLLECTION_NAME)
                .document(registration.getRegistrationId()).set(registration);
        return future.get().getUpdateTime().toString();
    }

    public Registration getRegistration(String id) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        DocumentSnapshot doc = db.collection(COLLECTION_NAME).document(id).get().get();
        return doc.exists() ? doc.toObject(Registration.class) : null;
    }

    public String registerStudent(RegistrationDTO dto) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        Registration registration = new Registration(dto.getStudentId(), dto.getInstructorLicenseId());
        ApiFuture<WriteResult> future = db.collection("Registration").document().set(registration);
        return future.get().getUpdateTime().toString();
    }

}
