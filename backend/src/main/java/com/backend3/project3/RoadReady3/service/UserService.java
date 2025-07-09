package com.backend3.project3.RoadReady3.service;

import com.backend3.project3.RoadReady3.dto.UserUpdateDTO;
import com.backend3.project3.RoadReady3.dto.SchoolHierarchyResponse.InstructorWithStudents;
import com.backend3.project3.RoadReady3.dto.SchoolHierarchyResponse.SchoolWithInstructors;
import com.backend3.project3.RoadReady3.model.StudentProgress;
import com.backend3.project3.RoadReady3.model.User;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class UserService {

    private static final String COLLECTION_NAME = "users";
    private final Firestore db = FirestoreClient.getFirestore();

    public List<User> getAllUsers() {
        List<User> userList = new ArrayList<>();
        try {
            ApiFuture<QuerySnapshot> future = db.collection(COLLECTION_NAME).get();
            List<QueryDocumentSnapshot> documents = future.get().getDocuments();
            for (QueryDocumentSnapshot document : documents) {
                User user = document.toObject(User.class);
                user.setUserId(document.getId());
                userList.add(user);
            }
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }
        return userList;
    }

    public List<User> getAllByRole(String role) {
        List<User> userList = new ArrayList<>();
        try {
            ApiFuture<QuerySnapshot> future = db.collection(COLLECTION_NAME)
                    .whereEqualTo("role", role)
                    .get();
            List<QueryDocumentSnapshot> documents = future.get().getDocuments();
            for (QueryDocumentSnapshot document : documents) {
                User user = document.toObject(User.class);
                user.setUserId(document.getId());
                userList.add(user);
            }
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }
        return userList;
    }

    public User getUserById(String userId) throws ExecutionException, InterruptedException {
        DocumentReference docRef = db.collection(COLLECTION_NAME).document(userId);
        DocumentSnapshot snapshot = docRef.get().get();
        if (snapshot.exists()) {
            User user = snapshot.toObject(User.class);
            user.setUserId(snapshot.getId());
            return user;
        }
        return null;
    }

    public String createUser(User user) throws ExecutionException, InterruptedException {
        DocumentReference docRef = db.collection(COLLECTION_NAME).document();
        user.setUserId(docRef.getId());
        ApiFuture<WriteResult> result = docRef.set(user);
        result.get();
        return docRef.getId();
    }

    public String updateUser(String userId, UserUpdateDTO dto) throws ExecutionException, InterruptedException {
        DocumentReference docRef = db.collection(COLLECTION_NAME).document(userId);
        DocumentSnapshot snapshot = docRef.get().get();
        if (!snapshot.exists()) {
            throw new RuntimeException("User not found");
        }
        User existingUser = snapshot.toObject(User.class);
        if (dto.getFirstName() != null) existingUser.setFirstName(dto.getFirstName());
        if (dto.getLastName() != null) existingUser.setLastName(dto.getLastName());
        if (dto.getEmail() != null) existingUser.setEmailAddress(dto.getEmail());
        if (dto.getPhoneNumber() != null) existingUser.setPhoneNumber(dto.getPhoneNumber());
        if (dto.getLocation() != null) existingUser.setLocation(dto.getLocation());
        if (dto.getDescription() != null) existingUser.setDescription(dto.getDescription());
        if (dto.getStatus() != null) existingUser.setStatus(dto.getStatus());
        if (dto.getAssignedTo() != null) existingUser.setAssignedTo(dto.getAssignedTo());
        ApiFuture<WriteResult> writeResult = docRef.set(existingUser);
        writeResult.get();
        return "User updated with ID: " + userId;
    }

    public String deleteUser(String userId) throws ExecutionException, InterruptedException {
        ApiFuture<WriteResult> writeResult = db.collection(COLLECTION_NAME).document(userId).delete();
        writeResult.get();
        return "User deleted with ID: " + userId;
    }

    public List<User> getAllSchools() throws ExecutionException, InterruptedException {
        ApiFuture<QuerySnapshot> query = db.collection(COLLECTION_NAME)
                .whereEqualTo("role", "SCHOOL")
                .get();

        List<QueryDocumentSnapshot> documents = query.get().getDocuments();
        List<User> schools = new ArrayList<>();
        for (QueryDocumentSnapshot doc : documents) {
            User user = doc.toObject(User.class);
            user.setUserId(doc.getId());
            schools.add(user);
        }
        return schools;
    }

    public List<User> getInstructorsBySchoolId(String schoolId) throws ExecutionException, InterruptedException {
        ApiFuture<QuerySnapshot> query = db.collection(COLLECTION_NAME)
                .whereEqualTo("role", "INSTRUCTOR")
                .whereEqualTo("assignedTo", schoolId)
                .get();

        List<QueryDocumentSnapshot> documents = query.get().getDocuments();
        List<User> instructors = new ArrayList<>();
        for (QueryDocumentSnapshot doc : documents) {
            User user = doc.toObject(User.class);
            user.setUserId(doc.getId());
            instructors.add(user);
        }
        return instructors;
    }

    public List<StudentProgress> getStudentsByInstructorId(String instructorId) throws ExecutionException, InterruptedException {
        List<StudentProgress> students = new ArrayList<>();

        ApiFuture<QuerySnapshot> query = db.collection("studentProgress")
                .whereEqualTo("instructorId", instructorId)
                .get();

        List<QueryDocumentSnapshot> documents = query.get().getDocuments();
        for (QueryDocumentSnapshot doc : documents) {
            StudentProgress studentProgress = doc.toObject(StudentProgress.class);
            students.add(studentProgress);
        }

        return students;
    }

    public List<SchoolWithInstructors> getSchoolHierarchy() throws ExecutionException, InterruptedException {
        List<SchoolWithInstructors> result = new ArrayList<>();
        List<User> schools = getAllSchools();
        for (User school : schools) {
            SchoolWithInstructors schoolWithInstructors = new SchoolWithInstructors();
            schoolWithInstructors.setSchool(school);

            List<User> instructors = getInstructorsBySchoolId(school.getUserId());
            List<InstructorWithStudents> instructorWithStudentsList = new ArrayList<>();
            for (User instructor : instructors) {
                InstructorWithStudents instructorWithStudents = new InstructorWithStudents();
                instructorWithStudents.setInstructor(instructor);
                List<StudentProgress> students = getStudentsByInstructorId(instructor.getUserId());
                instructorWithStudentsList.add(instructorWithStudents);
            }
            schoolWithInstructors.setInstructors(instructorWithStudentsList);
            result.add(schoolWithInstructors);
        }
        return result;
    }

    public List<User> getPendingRequestsForInstructor(String instructorId) throws ExecutionException, InterruptedException {
        ApiFuture<QuerySnapshot> future = db.collection("users")
                .whereEqualTo("role", "STUDENT")
                .whereEqualTo("assignedTo", instructorId)
                .whereEqualTo("status", "PENDING")
                .get();
        List<User> pendingStudents = new ArrayList<>();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        for (QueryDocumentSnapshot doc : documents) {
            User user = doc.toObject(User.class);
            user.setUserId(doc.getId());
            pendingStudents.add(user);
        }
        return pendingStudents;
    }

}
