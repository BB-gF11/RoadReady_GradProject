package com.backend3.project3.RoadReady3.service;

import com.backend3.project3.RoadReady3.model.User;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;
import com.google.firebase.cloud.FirestoreClient;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Service
public class AuthService {

    private final Firestore db = FirestoreClient.getFirestore();

    public String createCustomToken(String uid) throws FirebaseAuthException {
        return FirebaseAuth.getInstance().createCustomToken(uid);
    }

    public String createUser(User user) throws ExecutionException, InterruptedException {
        if (user == null || user.getEmailAddress() == null || user.getEmailAddress().isEmpty()) {
            throw new IllegalArgumentException("User or Email cannot be null or empty");
        }
        CollectionReference usersRef = db.collection("users");
        ApiFuture<QuerySnapshot> queryFuture = usersRef
                .whereEqualTo("emailAddress", user.getEmailAddress())
                .get();
        if (!queryFuture.get().isEmpty()) {
            throw new IllegalArgumentException("A user with this email already exists");
        }
        UserRecord.CreateRequest request = new UserRecord.CreateRequest()
                .setEmail(user.getEmailAddress())
                .setPassword(user.getPassword());

        UserRecord userRecord;
        try {
            userRecord = FirebaseAuth.getInstance().createUser(request);
        } catch (FirebaseAuthException e) {
            throw new IllegalArgumentException("Failed to create Firebase Auth user: " + e.getMessage());
        }
        user.setFirebaseUid(userRecord.getUid());
        String userDocId = user.getUserId();
        ApiFuture<WriteResult> writeResult = usersRef.document(userDocId).set(user);
        writeResult.get();

        return userDocId;
    }


    public User login(String email, String password) throws IOException, ExecutionException, InterruptedException {
        HttpURLConnection conn = getConnection(email, password);

        int code = conn.getResponseCode();

        BufferedReader reader = new BufferedReader(new InputStreamReader(
                code >= 200 && code < 300 ? conn.getInputStream() : conn.getErrorStream(), "utf-8"));
        StringBuilder response = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            response.append(line.trim());
        }

        if (code != 200) {
            return null;
        }

        JSONObject json = new JSONObject(response.toString());
        String idToken = json.getString("idToken");

        CollectionReference usersRef = db.collection("users");
        ApiFuture<QuerySnapshot> future = usersRef.whereEqualTo("emailAddress", email).limit(1).get();
        QuerySnapshot querySnapshot = future.get();

        if (querySnapshot.isEmpty()) {
            return null;
        }

        DocumentSnapshot document = querySnapshot.getDocuments().get(0);
        Map<String, Object> data = document.getData();

        User user = new User();
        user.setUserId(document.getId());
        user.setEmailAddress(email);
        user.setFirstName((String) data.getOrDefault("firstName", ""));
        user.setLastName((String) data.getOrDefault("lastName", ""));
        user.setUsername((String) data.getOrDefault("username", ""));
        user.setRole((String) data.getOrDefault("role", ""));
        user.setAssignedTo((String) data.getOrDefault("assignedTo", ""));
        user.setRating(data.get("rating") == null ? 0 : ((Number) data.get("rating")).doubleValue());
        user.setLocation((String) data.getOrDefault("location", ""));
        user.setImg((String) data.getOrDefault("img", ""));
        user.setPhoneNumber((String) data.getOrDefault("phoneNumber", ""));
        user.setDescription((String) data.getOrDefault("description", ""));
        user.setToken(idToken);

        return user;
    }

    private static HttpURLConnection getConnection(String email, String password) throws IOException {
        if (email == null || password == null) {
            throw new IllegalArgumentException("Email and password cannot be null");
        }

        String endpoint = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyByjQpnACzj22Sdz-YBJjMihWSyLoK-ue4";
        URL url = new URL(endpoint);
        HttpURLConnection conn = getHttpURLConnection(email, password, url);
        return conn;
    }

    private static HttpURLConnection getHttpURLConnection(String email, String password, URL url) throws IOException {
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Content-Type", "application/json");
        conn.setDoOutput(true);

        String payload = String.format("{\"email\":\"%s\",\"password\":\"%s\",\"returnSecureToken\":true}", email, password);

        try (OutputStream os = conn.getOutputStream()) {
            byte[] input = payload.getBytes("utf-8");
            os.write(input, 0, input.length);
        }
        return conn;
    }
}