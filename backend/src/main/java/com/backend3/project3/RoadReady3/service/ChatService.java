package com.backend3.project3.RoadReady3.service;

import com.backend3.project3.RoadReady3.model.Chat;
import com.google.api.core.ApiFuture;
import com.google.cloud.Timestamp;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class ChatService {

    private static final String COLLECTION_NAME = "chats";
    private static final String CHAT_HISTORY_SUBCOLLECTION = "Chat_History";

    private Firestore getFirestore() {
        return FirestoreClient.getFirestore();
    }

    public List<Chat> getChatsByUser(String userId) throws InterruptedException, ExecutionException {
        Firestore db = getFirestore();
        List<Chat> allMessages = new ArrayList<>();

        ApiFuture<QuerySnapshot> chatsFuture = db.collection(COLLECTION_NAME).get();
        List<QueryDocumentSnapshot> chatDocs = chatsFuture.get().getDocuments();

        for (QueryDocumentSnapshot chatDoc : chatDocs) {
            String chatId = chatDoc.getId();
            CollectionReference chatHistoryRef = db.collection(COLLECTION_NAME)
                    .document(chatId)
                    .collection(CHAT_HISTORY_SUBCOLLECTION);

            ApiFuture<QuerySnapshot> messagesFuture = chatHistoryRef
                    .whereIn("senderId", List.of(userId))
                    .get();

            List<QueryDocumentSnapshot> senderMessages = messagesFuture.get().getDocuments();

            ApiFuture<QuerySnapshot> receiverMessagesFuture = chatHistoryRef
                    .whereIn("receiverId", List.of(userId))
                    .get();

            List<QueryDocumentSnapshot> receiverMessages = receiverMessagesFuture.get().getDocuments();

            for (QueryDocumentSnapshot messageDoc : senderMessages) {
                Chat chat = messageDoc.toObject(Chat.class);
                chat.setId(messageDoc.getId());
                allMessages.add(chat);
            }

            for (QueryDocumentSnapshot messageDoc : receiverMessages) {
                Chat chat = messageDoc.toObject(Chat.class);
                chat.setId(messageDoc.getId());
                allMessages.add(chat);
            }
        }
        allMessages.sort(Comparator.comparing(Chat::getTimestamp));

        return allMessages;
    }

    public List<Chat> getChatMessagesByChatId(String chatId) throws InterruptedException, ExecutionException {
        Firestore db = getFirestore();

        CollectionReference chatHistoryRef = db.collection(COLLECTION_NAME)
                .document(chatId)
                .collection(CHAT_HISTORY_SUBCOLLECTION);

        ApiFuture<QuerySnapshot> future = chatHistoryRef.get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();

        List<Chat> chatMessages = new ArrayList<>();
        for (QueryDocumentSnapshot doc : documents) {
            Chat chat = doc.toObject(Chat.class);
            chat.setId(doc.getId());
            chatMessages.add(chat);
        }
        return chatMessages;
    }

    public Chat getChatById(String chatId) throws InterruptedException, ExecutionException {
        Firestore db = getFirestore();

        DocumentReference chatDocRef = db.collection(COLLECTION_NAME).document(chatId);
        ApiFuture<DocumentSnapshot> future = chatDocRef.get();
        DocumentSnapshot document = future.get();

        if (document.exists()) {
            return document.toObject(Chat.class);
        }
        return null;
    }

    public Chat createChat(String chatId, String senderId, String receiverId) throws InterruptedException, ExecutionException {
        Firestore db = getFirestore();

        Chat newChat = new Chat();
        newChat.setChatId(chatId);
        db.collection(COLLECTION_NAME).document(chatId).set(newChat).get();

        Chat emptyMessage = new Chat();
        emptyMessage.setChatId(chatId);
        emptyMessage.setSenderId(senderId);
        emptyMessage.setReceiverId(receiverId);
        emptyMessage.setMessage("");
        emptyMessage.setIncoming(true);
        emptyMessage.setOutgoing(false);
        emptyMessage.setOnline(true);
        emptyMessage.setPinned(false);
        emptyMessage.setType("msg");
        emptyMessage.setSubtype("msg");
        emptyMessage.setTimestamp(Timestamp.now());
        emptyMessage.setTime("Auto Init");

        db.collection(COLLECTION_NAME)
                .document(chatId)
                .collection(CHAT_HISTORY_SUBCOLLECTION)
                .add(emptyMessage)
                .get();

        return newChat;
    }

    public Chat createMessage(String chatId, Chat chat) throws InterruptedException, ExecutionException {
        Firestore db = getFirestore();

        Timestamp now = Timestamp.now();
        chat.setTimestamp(now);

        java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat("HH:mm");
        String formattedTime = sdf.format(now.toDate());
        chat.setTime(formattedTime);

        CollectionReference chatHistoryRef = db.collection(COLLECTION_NAME)
                .document(chatId)
                .collection(CHAT_HISTORY_SUBCOLLECTION);

        ApiFuture<DocumentReference> newMessageRef = chatHistoryRef.add(chat);
        chat.setId(newMessageRef.get().getId());

        return chat;
    }

}
