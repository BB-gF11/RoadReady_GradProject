package com.backend3.project3.RoadReady3.model;

import java.util.Date;

public class Exam {
    private int examId;
    private String examTitle;
    private Date examDate;
    private Date startDate;
    private int passingScore;
    private String userId;

    public Exam() {
    }

    public Exam(int examId, String examTitle, Date examDate, Date startDate, int passingScore, String userId) {
        this.examId = examId;
        this.examTitle = examTitle;
        this.examDate = examDate;
        this.startDate = startDate;
        this.passingScore = passingScore;
        this.userId = userId;
    }

    public String getuserId() {
        return userId;
    }

    public void setuserId(String userId) {
        this.userId = userId;
    }

    public int getExamId() {
        return examId;
    }

    public void setExamId(int examId) {
        this.examId = examId;
    }

    public String getExamTitle() {
        return examTitle;
    }

    public void setExamTitle(String examTitle) {
        this.examTitle = examTitle;
    }

    public Date getExamDate() {
        return examDate;
    }

    public void setExamDate(Date examDate) {
        this.examDate = examDate;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public int getPassingScore() {
        return passingScore;
    }

    public void setPassingScore(int passingScore) {
        this.passingScore = passingScore;
    }
}
