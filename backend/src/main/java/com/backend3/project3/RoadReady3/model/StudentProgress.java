package com.backend3.project3.RoadReady3.model;

import java.util.List;

public class StudentProgress {

    private String userId;
    private int progress;
    private List<String> instructorNotes;
    private List<Integer> completedLessons;

    public StudentProgress() {
    }

    public StudentProgress(String userId, int progress, List<String> instructorNotes) {
        this.userId = userId;
        this.progress = progress;
        this.instructorNotes = instructorNotes;
    }

    public String getUserId() {
        return userId;
    }

    public List<Integer> getCompletedLessons() {
        return completedLessons;
    }

    public void setCompletedLessons(List<Integer> completedLessons) {
        this.completedLessons = completedLessons;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public int getProgress() {
        return progress;
    }

    public void setProgress(int progress) {
        this.progress = progress;
    }

    public List<String> getInstructorNotes() {
        return instructorNotes;
    }

    public void setInstructorNotes(List<String> instructorNotes) {
        this.instructorNotes = instructorNotes;
    }
}
