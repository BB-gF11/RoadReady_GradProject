//package com.backend3.project3.RoadReady3.service;
//
//import com.backend3.project3.RoadReady3.model.ContactMessage;
//import com.google.api.core.ApiFuture;
//import com.google.cloud.firestore.DocumentReference;
//import com.google.cloud.firestore.Firestore;
//import com.google.cloud.firestore.QueryDocumentSnapshot;
//import com.google.cloud.firestore.QuerySnapshot;
//import com.google.firebase.cloud.FirestoreClient;
//import org.springframework.stereotype.Service;
//
//import java.util.ArrayList;
//import java.util.List;
//import java.util.concurrent.ExecutionException;
//
//@Service
//public class ContactMessageService {
//
//    private static final String COLLECTION_NAME = "ContactMessages";
//    private final Firestore db = FirestoreClient.getFirestore();
//
//    public String saveMessage(ContactMessage message) throws ExecutionException, InterruptedException {
//        ApiFuture<DocumentReference> future = db.collection(COLLECTION_NAME).add(message);
//        return future.get().getId();
//    }
//    public List<ContactMessage> getAllMessages() throws ExecutionException, InterruptedException {
//        List<ContactMessage> messages = new ArrayList<>();
//        ApiFuture<QuerySnapshot> future = db.collection(COLLECTION_NAME).get();
//        for (QueryDocumentSnapshot doc : future.get()) {
//            messages.add(doc.toObject(ContactMessage.class));
//        }
//        return messages;
//    }
//
//
//}
