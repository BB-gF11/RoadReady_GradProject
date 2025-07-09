package com.backend3.project3.RoadReady3.service;

import com.backend3.project3.RoadReady3.model.Message;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class MessageService {

    private static final String COLLECTION_NAME = "messages";
    private final Firestore db = FirestoreClient.getFirestore();

    public String createMessage(Message message) throws ExecutionException, InterruptedException {
        DocumentReference docRef = db.collection(COLLECTION_NAME).document();
        message.setMessageId(docRef.getId());
        message.setTimestamp(new Date());
        ApiFuture<WriteResult> result = docRef.set(message);
        result.get();
        return docRef.getId();
    }

    public List<Message> getMessagesBetweenUsers(String userId1, String userId2) throws ExecutionException, InterruptedException {
        List<Message> messages = new ArrayList<>();
        String chatId = userId1 + "_" + userId2;
        ApiFuture<QuerySnapshot> query1 = db.collection(COLLECTION_NAME)
                .whereEqualTo("chatId", chatId)
                .get();        //        ApiFuture<QuerySnapshot> query1 = db.collection(COLLECTION_NAME)
//                .whereEqualTo("senderId", userId1)
//                .whereEqualTo("receiverId", userId2)
//                .get();
//        ApiFuture<QuerySnapshot> query2 = db.collection(COLLECTION_NAME)
//                .whereEqualTo("senderId", userId2)
//                .whereEqualTo("receiverId", userId1)
//                .get();

        List<QueryDocumentSnapshot> docs1 = query1.get().getDocuments();
//        List<QueryDocumentSnapshot> docs2 = query2.get().getDocuments();
        for (QueryDocumentSnapshot doc : docs1) {
            Message message = doc.toObject(Message.class);
            message.setMessageId(doc.getId());
            messages.add(message);
        }
//        for (QueryDocumentSnapshot doc : docs2) {
//            Message message = doc.toObject(Message.class);
//            message.setMessageId(doc.getId());
//            messages.add(message);
//        }
        messages.sort((m1, m2) -> m1.getTimestamp().compareTo(m2.getTimestamp()));
        return messages;
    }

    public String deleteMessage(String messageId) throws ExecutionException, InterruptedException {
        ApiFuture<WriteResult> writeResult = db.collection(COLLECTION_NAME).document(messageId).delete();
        writeResult.get();
        return "Message deleted with ID: " + messageId;
    }

    public void updateMessageContent(String messageId, String newContent) throws ExecutionException, InterruptedException {
        DocumentReference docRef = db.collection(COLLECTION_NAME).document(messageId);
        ApiFuture<WriteResult> future = docRef.update("content", newContent);
        future.get();
    }

    public void markMessageAsRead(String messageId, boolean readStatus) throws ExecutionException, InterruptedException {
        DocumentReference docRef = db.collection(COLLECTION_NAME).document(messageId);
        ApiFuture<WriteResult> future = docRef.update("read", readStatus);
        future.get();
    }

}
