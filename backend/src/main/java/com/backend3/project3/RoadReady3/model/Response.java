package com.backend3.project3.RoadReady3.model;

import java.util.List;

public class Response {
    private String userId;
    private String examId;
    private List<Answer> responses;
    private int score;

    public Response() {
    }

    public Response(String userId, String examId, List<Answer> responses, int score) {
        this.userId = userId;
        this.examId = examId;
        this.responses = responses;
        this.score = score;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getExamId() {
        return examId;
    }

    public void setExamId(String examId) {
        this.examId = examId;
    }

    public List<Answer> getResponses() {
        return responses;
    }

    public void setResponses(List<Answer> responses) {
        this.responses = responses;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }
}
